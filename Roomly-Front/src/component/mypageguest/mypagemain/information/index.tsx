import { ChangeEvent, useEffect, useState } from 'react'
import './style.css'
import MypageInputBox from 'src/component/input/mypageinput';
import axios from 'axios';
import { SignInUser } from 'src/stores';
import GuestPwChangeRequestDto from 'src/apis/login/dto/request/guest/guestpwchange.request.dto';
import { ChangeGuestPwRequest } from 'src/apis/login';

import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { ResponseDto } from 'src/apis/guestmypage';
import { GUEST_ACCESS_TOKEN } from 'src/constants';
import { TelAuthRequestDto } from 'src/apis/signUp/dto/request';
import { telAuthRequest } from 'src/apis/signUp';

interface Props {
    titletext: string;
    username: string;
    activite: boolean;
}

export default function Information({ titletext, username, activite }: Props) {

    // 게스트 이름 불러오기
    const { signInUser } = SignInUser();

    const [guestName, setGuestName] = useState<string>('');
    const [guestId, setGuestId] = useState<string>('');
    const [idmessage, setIdMessage] = useState<string>('qwer1234');
    const [currentPassword, setCurrentPassword] = useState<string>(''); // 현재 비밀번호 추가
    const [guestPassword, setGuestPassword] = useState<string>('');
    const [guestPasswordCheck, setGuestPasswordCheck] = useState<string>('');
    const [changePasswordbutton, setChangePasswordbutton] = useState<boolean>(false);
    const [passwordMessage, setPasswordMessage] = useState<string>('');
    const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');
    const [passwordMessageError, setPasswordMessageError] = useState<boolean>(false);
    const [passwordCheckMessageError, setPasswordCheckMessageError] = useState<boolean>(false);
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);
    const [isCurrentPasswordVerified, setIsCurrentPasswordVerified] = useState(false); // 현재 비밀번호 검증 상태
    const [telNumber, setTelNumber] = useState<string>('');
    const [message, setMessage] = useState<string>('');


    // 내가 새로 넣은 변수들 //
    const [pwButtonBoolean, setPwButtonBoolean] = useState<boolean>(false);
    const [tnButtonBoolean, setTnButtonBoolean] = useState<boolean>(true);
    const [telNumberInputActive, setTelNumberInputActive] = useState<boolean>(true);
    const [telNumberMessage, setTelNumberMessage] = useState<string>('')
    const [telNumberAuth, setTelNumberAuth] = useState<boolean>(false);

    const navigator = useNavigate();
    const [cookies , setCookies, removeCookies] = useCookies();


    // event handler: 현재 비밀번호 입력 이벤트 핸들러 //
    const onCurrentPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrentPassword(event.target.value);
    };

    // event handler: 현재 비밀번호 확인 핸들러 //
    const verifyCurrentPasswordHandler = async () => {
        try {
            const response = await axios.post('/api/verify-password', {
                guestId,
                guestPassword
            });

            if (response.status === 200 && response.data.verified) {
                setIsCurrentPasswordVerified(true);
                alert('현재 비밀번호가 확인되었습니다.');
            } else {
                alert('현재 비밀번호가 일치하지 않습니다.');
                setIsCurrentPasswordVerified(false);
            }
        } catch (error) {
            console.error('비밀번호 확인 오류:', error);
            alert('비밀번호 확인 중 문제가 발생했습니다. 다시 시도해주세요.');
        }
    };



    // event handler: 비밀번호 변경 이벤트 처리 //
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setGuestPassword(value);

        // 비밀번호 패턴 검사
        const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,13}$/;
        const isMatched = pattern.test(value);

        // 비밀번호가 8자 이상일 때만 메시지를 설정
        if (value.length >= 8) {
            const message = isMatched ? '' : '영문, 숫자를 혼용하여 8 ~ 13자를 입력해주세요';
            setPasswordMessage(message);
            setPasswordMessageError(!isMatched);
        } else {
            setPasswordMessage(''); // 비밀번호가 8자 미만일 때 메시지 초기화
            setPasswordMessageError(false);
        }

    }

    //event handler: 비밀번호 변경 확인 이벤트 처리 //
    const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        // Guest와 Host의 비밀번호 확인 값을 모두 업데이트
        setGuestPasswordCheck(value);

        // 입력된 값이 있는지 확인하고 비밀번호와 일치 여부를 체크
        const isGuestPasswordMatch = guestPassword && guestPassword === value;

        if (isGuestPasswordMatch) {
            // 비밀번호가 일치할 때
            setPasswordCheckMessage(''); // 메시지 초기화
            setPasswordCheckMessageError(false); // 에러 상태 초기화
            setIsPasswordMatch(true); // 버튼 활성화
        } else if (value.length > 0) {
            // 비밀번호가 일치하지 않을 때
            setPasswordCheckMessage('비밀번호가 일치하지 않습니다.');
            setPasswordCheckMessageError(true);
            setIsPasswordMatch(false);
        } else {
            // 비밀번호 확인 값이 없을 때 메시지 초기화
            setPasswordCheckMessage('');
            setPasswordCheckMessageError(false);
            setIsPasswordMatch(false);
        }
    };

    const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setTelNumber(value)
    };

    // const handleUpdatePhoneNumber = async () => {
    //     try {
    //         const requestBody: PatchGuestAuthRequestDto = {
    //             telnumber: telNumber.replace(/-/g, ''), // "-" 제거
    //         };

    //         const response = await axios.post(
    //             `/auth-number/${guestId}`,
    //             requestBody,
    //             { headers: { 'Content-Type': 'application/json' } }
    //         );

    //         if (response.status === 200) {
    //             setMessage('전화번호가 성공적으로 변경되었습니다.');
    //         } else {
    //             setMessage('전화번호 변경에 실패했습니다.');
    //         }
    //     } catch (error) {
    //         setMessage('오류가 발생했습니다. 다시 시도해주세요.');
    //         console.error('전화번호 변경 실패:', error);
    //     }
    // };


    const onTelNumberSendClickHandler = () => {
        if (!telNumber) return;
    
        const pattern = /^[0-9]{11}$/;
        const isMatched = pattern.test(telNumber);
    
        if (!isMatched) {
          setTelNumberMessage('숫자 11자를 입력 해주세요');
          return;
        }}

    const onGuestPasswordChangeHandler = async () => {
            const guestAccessToken = cookies[GUEST_ACCESS_TOKEN];
    
            const requestBody: GuestPwChangeRequestDto = {
                currentGuestPw: currentPassword,
                changeGuestPw: guestPassword
            };

            ChangeGuestPwRequest(guestId, requestBody, guestAccessToken).then(passwordChangeResponse);
        }

        const passwordChangeResponse = (responseBody: ResponseDto | null) => {
            const message = 
                !responseBody ? '서버에 문제가 있습니다.' :
                responseBody.code === 'VF' ? '비밀번호를 모두 입력하세요.' :
                responseBody.code === 'SF' ? '로그인 정보가 일치하지 않습니다.' : 
                responseBody.code === 'TCF' ? '서버에 문제가 있습니다.' :
                responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
            
            const isSuccessed = responseBody !== null && responseBody.code === 'SU';
            if (!isSuccessed) {
                return;
            }
            navigator('/main')
            removeCookies('guestAccessToken')
        };
    

        const onGuestTelNumberChangeHandler = () => {
            setTelNumberInputActive(false)
            setTelNumber('')
        }

        const [telAuthActivite, setTelAuthActivite] = useState<boolean>(false)
        const [authNumber, setAuthNumber] = useState<string>('')

        const telAuthResponse = (responseBody: ResponseDto | null) => {

            const message =
    
                !responseBody ? '서버에 문제가 있습니다.' :
                    responseBody.code === 'VF' ? '숫자 11자 입력해주세요.' :
                        responseBody.code === 'DT' ? '중복된 전화번호 입니다.' :
                            responseBody.code === 'TF' ? '서버에 문제가 있습니다.' :
                                responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
                                    responseBody.code === 'SU' ? '인증번호가 전송되었습니다.' : '';
    
            const isSuccessed = responseBody !== null && responseBody.code === 'SU';
            setTelNumberMessage(message);
        };

        const onClickTelnumberAuthHandler = () => {
            if (!telNumber) return;    
            const pattern = /^[0-9]{11}$/;
            const isMatched = pattern.test(telNumber);        
            if (!isMatched) {
                setTelNumberMessage('숫자 11자를 입력 해주세요');
                return;}            
            setTelAuthActivite(true)

            const requestBody: TelAuthRequestDto = {
                guestTelNumber: telNumber // 속성의 이름과 담을 변수의 이름이 동일한 경우 하나로 작성
            }
            telAuthRequest(requestBody).then(telAuthResponse);

        }

        useEffect (() => { 
            setTelNumberMessage('')
        }, [telNumber])

    // 게스트 이름 불러오기
    useEffect(() => {
        if (!signInUser) return;
        setGuestName(signInUser.guestName)
        setGuestId(signInUser.guestId)
        setTelNumber(signInUser.guestTelNumber)
    }, [signInUser])

    // 비밀번호 변경 버튼 변경 활성화 처리 //
    useEffect(() => {
        if(currentPassword && guestPassword && guestPasswordCheck && !passwordCheckMessageError) {
            setPwButtonBoolean(true)
        } else {
            setPwButtonBoolean(false)
        }
    }, [
        currentPassword,
        guestPassword,
        guestPasswordCheck
    ])

    return (

        <>
            {activite && <div id='information-warpper'>
                <div className='information-title'>
                    <div className='information-title-text'>{titletext}</div>
                    <div className='information-title-box'>
                        <div className='information-title-ditail-username'>'{guestName}'</div>
                        <div className='information-title-ditail'>님 반갑습니다.</div>
                    </div>
                </div>
                <div className='information-main'>
                    {/* <div className='information-title'>나의 정보</div> */}
                    <MypageInputBox activation={false} title='아이디' type='text' value={guestId} placeholder='' />
                    <MypageInputBox activation={false} title='이름' type='text' value={guestName} placeholder='' />
                    <MypageInputBox
                        activation={true}
                        title='현재 비밀번호'
                        type='password'
                        value={currentPassword}
                        placeholder='현재 비밀번호를 입력해 주세요.'
                        onChange={onCurrentPasswordChangeHandler}
                    />
                    <MypageInputBox
                        activation={true}
                        title='비밀번호'
                        type='password'
                        value={guestPassword}
                        placeholder='비밀번호를 입력해 주세요.'
                        messageError={passwordMessageError ? passwordMessage : ''}
                        onChange={onPasswordChangeHandler}
                    />
                    <MypageInputBox
                        activation={true}
                        title='비밀번호 확인'
                        type='password'
                        value={guestPasswordCheck}
                        placeholder='비밀번호를 다시 입력해 주세요.'
                        messageError={passwordCheckMessageError ? passwordCheckMessage : ''}
                        onChange={onPasswordCheckChangeHandler}
                        buttonName='변경'
                        activboolean={pwButtonBoolean}
                        onButtonClick={onGuestPasswordChangeHandler}
                    />
                        {telNumberInputActive && <MypageInputBox
                        activation={false}
                        title="전화번호"
                        type="text"
                        value={telNumber}
                        placeholder=""
                        buttonName='변경'
                        activboolean={tnButtonBoolean}
                        onButtonClick={onGuestTelNumberChangeHandler} />}

                        {!telNumberInputActive && <MypageInputBox
                        activation={true}
                        title="전화번호"
                        type="text"
                        value={telNumber}
                        placeholder="-를 빼고 입력해 주세요."
                        onChange={handlePhoneNumberChange}
                        messageError={telNumberMessage}
                        buttonName={"인증하기"}
                        activboolean={tnButtonBoolean}
                        onButtonClick={onClickTelnumberAuthHandler} />}

                        {telAuthActivite && <MypageInputBox
                        activation={true}
                        title="인증번호"
                        type="text"
                        value={authNumber}
                        placeholder="-를 빼고 입력해 주세요."
                        onChange={handlePhoneNumberChange}
                        messageError={passwordCheckMessageError ? passwordCheckMessage : ''}
                        buttonName="변경하기"
                        activboolean={tnButtonBoolean && tnButtonBoolean}
                        onButtonClick={onGuestTelNumberChangeHandler} />}

                        
                </div>
            </div>}

        </>
    )
}