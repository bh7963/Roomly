import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router';

// import { LogInResponseDto } from 'src/apis/login/response';
// import { ResponseDto } from 'src/apis/dto/response';
import { useCookies } from 'react-cookie';
import { useSearchParams } from 'react-router-dom';
import { GuestLogInRequest, HostLogInRequest } from 'src/apis/login';
import GuestLogInRequestDto from 'src/apis/login/dto/request/guest/login.request.dto';

// import LogInResponseDto from 'src/apis/login/dto/response/host.login.respons.dto';

import InputBox from '../input/login';
import HostLogInRequestDto from 'src/apis/login/dto/request/host/login.request.dto';



import { ResponseDto } from 'src/apis/guestmypage';
import GuestSignInResponseDto from 'src/apis/login/dto/response/guest-sign-in.response.dto';
import HostSignInResponseDto from 'src/apis/login/dto/response/host-sign-in.response.dto';

// 컴포넌트: 메인페이지 화면 컴포넌트 //
type group = 'guest' | 'host';

export default function Topbar() {
    // 쿠키 상태 초기화
    const [hostCookies, setHostCookie, removeHostCookies] = useCookies(['hostAccessToken']);
    const [guestCookies, setGuestCookie, removeGuestCookies] = useCookies(['guestAccessToken']);


    // state: 모달창 상태 //
    const [modalOpen, setModalOpen] = useState(false);

    // state: 로그인 모드 전환 상태 //
    const [mode, setMode] = useState<group>('guest')

    // state: 게스트 로그인 입력 정보 상태 //
    const [gusetId, setGuestId] = useState<string>('');
    const [gusetPassword, setGuestPassword] = useState<string>('');
    // state: 호스트 로그인 입력 정보 상태 //
    const [hostId, setHostId] = useState<string>('');
    const [hostPassword, setHostPassword] = useState<string>('');

    // state: 메세지 출력 정보 상태 //
    const [message, setMessage] = useState<string>('');
    const [idmessage, setIdMessage] = useState<string>('');
    const [pwmessage, setPwMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<boolean>(false);

    // state: url 값 저장 //
    const [searchParams, setSearchParams] = useSearchParams('');
    const [searchBar, setSearchBar] = useState<boolean>(false);

    // function: 네비게이터 함수 //
    const navigator = useNavigate();



    // function: 호스트 로그인 응답 처리 함수 //
    const hostLogInResponse = (responseBody: HostSignInResponseDto | ResponseDto | null) => {
        const message =
            !responseBody ? '서버에 문제가 있습니다.' :
                responseBody.code === 'VF' ? '아이디와 비밀번호를 모두 입력하세요.' :
                    responseBody.code === 'SF' ? '로그인 정보가 일치하지 않습니다.' :
                        responseBody.code === 'TCF' ? '서버에 문제가 있습니다.' :
                            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            setPwMessage(message);
            return;
        }
        const { hostAccessToken, expiration } = responseBody as HostSignInResponseDto;
        const expires = new Date(Date.now() + (expiration * 1000));
        setHostCookie('hostAccessToken', hostAccessToken, { path: '/', expires });
        setModalOpen(false)

        navigator('/main')

    };

    // function: 게스트 로그인 응답 처리 함수 //
    const guestLogInResponse = (responseBody: GuestSignInResponseDto | ResponseDto | null) => {
        const message =
            !responseBody ? '서버에 문제가 있습니다.' :
                responseBody.code === 'VF' ? '아이디와 비밀번호를 모두 입력하세요.' :
                    responseBody.code === 'SF' ? '로그인 정보가 일치하지 않습니다.' :
                        responseBody.code === 'TCF' ? '서버에 문제가 있습니다.' :
                            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            setPwMessage(message);
            return;
        }
        const { guestAccessToken, expiration } = responseBody as GuestSignInResponseDto;
        const expires = new Date(Date.now() + (expiration * 1000));
        setGuestCookie('guestAccessToken', guestAccessToken, { path: '/', expires });
        setModalOpen(false)

        navigator('/main')

    };

    // event handler: 게스트 아이디 변경 이벤트 처리 //
    const onGuestIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setGuestId(value);
    }

    // event handler: 게스트 비밀번호 변경 이벤트 처리 //
    const onGuestPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setGuestPassword(value);
    }

    // event handler: 호스트 아이디 변경 이벤트 처리 //
    const onHostIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setHostId(value);
    }

    // event handler: 호스트 비밀번호 변경 이벤트 처리 //
    const onHostPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setHostPassword(value);
    }

    /** 
     * function: 로그인 버튼을 클릭 했을 경우 일어나는 이벤트 처리 */
    const onGuestLoginButtonClickHandler = async () => {
        if (!gusetId) {
            setIdMessage('아이디를 입력해 주세요!');
            setErrorMessage(true);
            return;
        }
        if (!gusetPassword) {
            setPwMessage('비밀번호를 입력해 주세요!');
            setErrorMessage(true);
            return;
        }
        if (!gusetId || !gusetPassword) return;

        const requestBody: GuestLogInRequestDto = {
            guestId: gusetId,
            guestPw: gusetPassword
        };
        GuestLogInRequest(requestBody).then(guestLogInResponse);
    }
    // effect: 아이디 및 비밀번호 변경시 실행할 함수 //
    useEffect(() => {
        setMessage('');
    }, [gusetId, gusetPassword]);

    /**
    * function: 로그인 버튼을 클릭 했을 경우 일어나는 이벤트 처리 */
    const onHostLoginButtonClickHandler = async () => {
        if (!hostId) {
            setIdMessage('아이디를 입력해 주세요!');
            setErrorMessage(true);
            return;
        }
        if (!hostPassword) {
            setPwMessage('비밀번호를 입력해 주세요!');
            setErrorMessage(true);
            return;
        }
        if (!hostId || !hostPassword) return;

        const requestBody: HostLogInRequestDto = {
            hostId: hostId,
            hostPw: hostPassword
        };
        HostLogInRequest(requestBody).then(hostLogInResponse);
    }
    // effect: 아이디 및 비밀번호 변경시 실행할 함수 //
    useEffect(() => {
        setMessage('');
    }, [hostId, hostPassword]);


    // function: url 값 가져오기 //
    const urlRegion = searchParams.get('Region')
    const urlStart = searchParams.get('start')
    const urlEnd = searchParams.get('end')
    const urlCount = searchParams.get('count')



    // effect: 검색값이 있을 경우 실행할 함수 //
    useEffect(() => {
        // eslint-disable-next-line no-restricted-globals
        if (urlRegion && urlStart && urlEnd && urlCount && (location.pathname !== '/main')) {
            setSearchBar(true);
            return;
        };
        setSearchBar(false);
    }, [searchParams])

    // effect: 아이디 및 비밀번호 변경시 실행할 함수 //
    useEffect(() => {
        setIdMessage('');
    }, [gusetId]);

    // effect: 비밀번호 변경시 실행할 함수 //
    useEffect(() => {
        setPwMessage('');
    }, [gusetPassword]);

    // effect: 토큰값 있을 경우 실행할 함수 //
    useEffect(() => {
        if (!modalOpen) {
            setModalOpen(false);
        }
    }, [guestCookies, hostCookies]);

    const pressKeyEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onGuestLoginButtonClickHandler();
        }
    }

    // event handler: 로그아웃(호스트) 버튼 클릭 이벤트 처리 //
    const onHostLogoutButtonClickHandler = () => {
        if (hostCookies) removeHostCookies("hostAccessToken");
        navigator('main')
        };
    // event handler: 로그아웃(게스트) 버튼 클릭 이벤트 처리 //
    const onGuestLogoutButtonClickHandler = () => {
        if (guestCookies)  removeGuestCookies("guestAccessToken");
        navigator('main')
    };

    // event handler: 회원가입 버튼 클릭 이벤트 처리 //
    const onSignupButtonClickHandler = () => {
        navigator('/sign-up');
    };

    // event handler: 아이디/비밀번호 찾기 버튼 클릭 이벤트 처리 //
    const onFindIdPwButtonClickHandler = () => {
        navigator('/find');
    };

    // event handler: 호스트 마이페이지 버튼 클릭 이벤트 처리 //
    const onHostMyPageClickHandler = () => {
        navigator('/mypageHost');
    };

    // event handler: 게스트 마이페이지 버튼 클릭 이벤트 처리 //
    const onGuestMyPageClickHandler = () => {
        navigator('/mypageGuest');
    };

    // event handler: 아이콘 및 로고 클릭 이벤트 처리 //
    const onIconClickHandler = () => {
        navigator('/main');
    };

    // event handler: 로그인 버튼 클릭 이벤트 처리 //
    const onContainerClickHandler = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
            setModalOpen(false);
        }
    };

    const onModalContentClickHandler = (event: React.MouseEvent) => {
        event.stopPropagation()
    };

    const backGroundClickModalClose = (event: React.MouseEvent) => {
        setModalOpen(true)
    };

    const titleGuestModeChangeClickHandler = () => {
        setMode('guest')
        setHostId('')
        setHostPassword('')
    };

    const titleHostModeChangeClickHandler = () => {
        setMode('host')
        setGuestId('')
        setGuestPassword('')
    };



    return (
        <>
            <div id="wrapper-head">
                <div className='top-bar'>
                    <div className='logo'>
                        <div className='logo-icon' onClick={onIconClickHandler}></div>
                        <div className='logo-name' onClick={onIconClickHandler}>Roomly</div>
                    </div>
                    {searchBar && <div className='top-search-bar-container'>
                        <div className='top-search-bar-Region'>{urlRegion}</div>
                        <div className='top-search-bar-solid'></div>
                        <div className='top-search-bar-start'>{urlStart}</div>
                        <div className='top-search-bar-solid'></div>
                        <div className='top-search-bar-end'>{urlEnd}</div>
                        <div className='top-search-bar-solid'></div>
                        <div className='top-search-bar-count'>인원 {urlCount}</div>
                    </div>}
                    {hostCookies.hostAccessToken && <div className='nowlogin'>
                        <div className='my-page' onClick={onHostMyPageClickHandler}>호스트마이페이지</div>
                        <div className='log-out' onClick={onHostLogoutButtonClickHandler}>로그아웃</div>
                    </div>}
                    {guestCookies.guestAccessToken && <div className='nowlogin'>
                        <div className='my-page' onClick={onGuestMyPageClickHandler}>게스트마이페이지</div>
                        <div className='log-out' onClick={onGuestLogoutButtonClickHandler}>로그아웃</div>
                    </div>}
                    {!hostCookies.hostAccessToken && !guestCookies.guestAccessToken && <div className='sign'>
                        <div className='sign-in' onClick={() => setModalOpen(true)}>Login</div>
                        <div className='sign-up-button' onClick={onSignupButtonClickHandler}>SignUp</div>
                    </div>}
                </div>
            </div>
            {modalOpen &&
                <div className='modal-container' onMouseDown={onContainerClickHandler}
                    onMouseUp={backGroundClickModalClose}  >
                    <div
                        className='modal-content'
                        onClick={onModalContentClickHandler}
                    >
                        <div className='log-in'>
                            <div className='log-in-word'>Log In</div>
                            <div className='log-in-box'>
                                <div className='log-in-mode-select-button'>
                                    <div className={`log-in-mode-guest-${mode === 'guest' ? 'active' : 'disable'}`} onClick={titleGuestModeChangeClickHandler}>Guest</div>
                                    <div className={`log-in-mode-host-${mode === 'host' ? 'active' : 'disable'}`} onClick={titleHostModeChangeClickHandler}>Host</div>
                                </div>
                                <div className='log-in-close' onClick={() => setModalOpen(false)}></div>
                            </div>

                        </div>

                        {mode === 'guest' && <div className='input-log-box'>
                            <div className='input-log'>
                                <div className='log-in-id-icon'></div>
                                <InputBox
                                    type='text'
                                    placeholder='아이디를 입력해 주세요.'
                                    value={gusetId}
                                    message={idmessage}
                                    messageError={errorMessage}
                                    onChange={onGuestIdChangeHandler}
                                    onKey={pressKeyEnter}
                                />
                            </div>
                            <div className='input-log'>
                                <div className='log-in-pw-icon'></div>
                                <InputBox
                                    type='password'
                                    placeholder='비밀번호를 입력해 주세요.'
                                    value={gusetPassword}
                                    message={pwmessage}
                                    messageError={errorMessage}
                                    onChange={onGuestPasswordChangeHandler}
                                    onKey={pressKeyEnter}
                                />
                            </div>
                        </div>}
                        {mode === 'host' && <div className='input-log-box'>
                            <div className='input-log'>
                                <div className='log-in-id-icon'></div>
                                <InputBox
                                    type='text'
                                    placeholder='아이디를 입력해 주세요.'
                                    value={hostId}
                                    message={idmessage}
                                    messageError={errorMessage}
                                    onChange={onHostIdChangeHandler}
                                    onKey={pressKeyEnter}
                                />
                            </div>
                            <div className='input-log'>
                                <div className='log-in-pw-icon'></div>
                                <InputBox
                                    type='password'
                                    placeholder='비밀번호를 입력해 주세요.'
                                    value={hostPassword}
                                    message={pwmessage}
                                    messageError={errorMessage}
                                    onChange={onHostPasswordChangeHandler}
                                    onKey={pressKeyEnter}
                                />
                            </div>
                        </div>}
                        {mode === 'guest' && <div className='log-in-button' onClick={onGuestLoginButtonClickHandler}>로그인</div>}
                        {mode === 'host' && <div className='log-in-button' onClick={onHostLoginButtonClickHandler}>로그인</div>}
                        <div className='find'>
                            <div className='find-id' onClick={onFindIdPwButtonClickHandler}>아이디/비밀번호 찾기</div>
                            <div className='sign-up-text-button' onClick={onSignupButtonClickHandler}>회원가입</div>
                        </div>
                        <div className='sign-up'>
                            {/* <div className='sign-up-text'>계정이 없으신가요?</div> */}
                        </div>
                    </div>
                </div>
            }
        </>
    );
}