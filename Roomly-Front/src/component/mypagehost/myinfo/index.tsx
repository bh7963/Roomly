import { ChangeEvent, useEffect, useState } from 'react'
import './style.css'
import MypageInputBox from 'src/component/input/mypageinput';
import axios from 'axios';
import { SignInHost, SignInUser } from 'src/stores';
import GuestPwChangeRequestDto from 'src/apis/login/dto/request/guest/guestpwchange.request.dto';
import { ChangeGuestPwRequest, ChangeHostPwRequest } from 'src/apis/login';

import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { ResponseDto } from 'src/apis/guestmypage';
import { GUEST_ACCESS_TOKEN, HOST_ACCESS_TOKEN } from 'src/constants';
import { patchHostTelNumerRequest } from 'src/apis';
import PatchHostTelNumberRequestDto from 'src/apis/dto/request/host/patch-host-telnumber.request.dto';
import { TelAuthRequestDto } from 'src/apis/signUp/dto/request';
import { telAuthRequest } from 'src/apis/signUp';
import HostPwChangeRequestDto from 'src/apis/login/dto/request/host/hostpwchange.request.dto';
import { sign } from 'crypto';

interface Props {
    titletext: string;
    username: string;
    activite: boolean;
}

export default function Information({ titletext, username, activite }: Props) {

    // state: 정보 상태 관리 //
    const { signInHost } = SignInHost();

    const [hostName, setGuestName] = useState<string>('');
    const [hostId, setGuestId] = useState<string>('');
    const [currentPassword, setCurrentPassword] = useState<string>(''); // 현재 비밀번호 추가
    const [hostPassword, setGuestPassword] = useState<string>('');
    const [hostPasswordCheck, setGuestPasswordCheck] = useState<string>('');
    const [changePasswordbutton, setChangePasswordbutton] = useState<boolean>(false);
    const [passwordMessage, setPasswordMessage] = useState<string>('');
    const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');
    const [passwordMessageError, setPasswordMessageError] = useState<boolean>(false);
    const [passwordCheckMessageError, setPasswordCheckMessageError] = useState<boolean>(false);
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);
    const [isCurrentPasswordVerified, setIsCurrentPasswordVerified] = useState(false); // 현재 비밀번호 검증 상태
    const [telNumber, setTelNumber] = useState<string>('');
    const [changeTelNumber, setChangeTelNumber] = useState<string>('');
    const [authNumber, setAuthNumber] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);
    const [authNumberMessage,setAuthNumberMessage] = useState<string>('');
    const [checkedAuthNumber,setCheckedAuthNumber] = useState<boolean>(false);
    const [passwordvisible, setPasswordVisible] = useState<boolean>(false);


    const [pwButtonBoolean, setPwButtonBoolean] = useState<boolean>(false);

    const navigator = useNavigate();
    const [cookies , setCookies, removeCookies] = useCookies();


    // event handler: 현재 비밀번호 입력 이벤트 핸들러 //
    const onCurrentPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setCurrentPassword(value);

        // 비밀번호 패턴 검사
        const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,13}$/;
        const isMatched = pattern.test(value);

        if (!isMatched) {
            setPwButtonBoolean(false);
            return;
        };
        setPwButtonBoolean(true);
    };

    const onPasswordChangeClickHandler = () => {
        setPasswordVisible(!passwordvisible);
    }

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
        const isGuestPasswordMatch = hostPassword && hostPassword === value;

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

    const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        setChangeTelNumber(e.target.value);
    };

    const onGuestPasswordChangeHandler = async () => {
        const hostAccessToken = cookies[HOST_ACCESS_TOKEN];
        
            const requestBody: GuestPwChangeRequestDto = {
                currentGuestPw: currentPassword,
                changeGuestPw: hostPassword
            };

            ChangeGuestPwRequest(hostId, requestBody, hostAccessToken).then(passwordChangeResponse);
        }
        const onHostPasswordChangeHandler = async () => {
            const hostAccessToken = cookies[HOST_ACCESS_TOKEN];
            if (!signInHost?.hostId || !hostAccessToken) return;

                const requestBody: HostPwChangeRequestDto = {
                    currentHostPw: currentPassword,
                    changeHostPw: hostPassword
                };
    
                ChangeHostPwRequest(requestBody, signInHost?.hostId, hostAccessToken).then(passwordChangeResponse);
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
                alert(message)
                return;
            }
            navigator('/main')
            removeCookies('accessToken')
        };

        // event handler: 인증번호 변경 이벤트 처리 //
        const   onAuthNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            setAuthNumber(value);
            setCheckedAuthNumber(!checkedAuthNumber);
        };
        // function: patch Host Tel Numer Response 처리 함수 //
        const patchHostTelNumerResponse = (responseBody:ResponseDto | null)=> {
            const message = !responseBody ? '서버에 문제가 있습니다. ':
                responseBody.code === 'AF' ? '잘못된 접근입니다. ':
                responseBody.code === 'DBE' ? '서버에 문제가 있습니다. ':
                responseBody.code === 'DT' ? '중복된 전화번호 입니다. ': ''
            const isSuccessed = responseBody !== null && responseBody.code === 'SU';
            if (!isSuccessed) {
                alert(message);
                return;
            }
            setVisible(!visible);
        }
    // function: 전화번호 인증 Response 처리 함수 //
    const telAuthResponse = (responseBody: ResponseDto | null) => {

        const message =

            !responseBody ? '서버에 문제가 있습니다.' :
                responseBody.code === 'VF' ? '숫자 11자 입력해주세요.' :
                    responseBody.code === 'DT' ? '중복된 전화번호 입니다.' :
                        responseBody.code === 'TF' ? '서버에 문제가 있습니다.' :
                            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
                                responseBody.code === 'SU' ? '인증번호가 전송되었습니다.' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed){
            alert(message);
            return;
        }
    };
        // event handler: 전화번호 인증 버튼 클릭 이벤트 처리 //
        const onTelAuthClickHandler = () => {
            if(!changeTelNumber) return;
            const requestBody: TelAuthRequestDto = {
                guestTelNumber: changeTelNumber 
            }
            telAuthRequest(requestBody).then(telAuthResponse);
        }

        // event handler: 전화번호 변경 인풋창 상태 변경 이벤트 처리 //
        const onTelNumberInPutStateChangeHandler = () => {
            setVisible(!visible);
        }

        // event handler: 전화번호 변경 버튼 클릭 이벤트 처리 //
        const onTelNumberChangeButtonHandler = () => {
            const accessToken = cookies[HOST_ACCESS_TOKEN];
            if (!accessToken||!signInHost?.hostId) return;
            const requestBody:PatchHostTelNumberRequestDto = {telNumber:changeTelNumber,authNumber:authNumber}
            patchHostTelNumerRequest(requestBody,signInHost?.hostId,accessToken).then(patchHostTelNumerResponse);
        }



    // 호스트 정보 불러오기
    useEffect(() => {
        if (!signInHost) return;
        setGuestName(signInHost.hostName)
        setGuestId(signInHost.hostId)
        setTelNumber(signInHost.hostTelNumber);
        setVisible(!visible)
    }, [SignInHost])

    // 비밀번호 변경 버튼 변경 활성화 처리 //
    useEffect(() => {
        if(currentPassword && hostPassword && hostPasswordCheck) {
            setPwButtonBoolean(!pwButtonBoolean)
        } else {
            setPwButtonBoolean(pwButtonBoolean)
        }
    }, [
        currentPassword,
        hostPassword,
        hostPasswordCheck
    ])

    return (

        <>
            {activite && <div id='information-warpper'>
                <div className='information-title'>
                    <div className='information-title-text'>{titletext}</div>
                    <div className='information-title-box'>
                        <div className='information-title-ditail-username'>'{hostName}'</div>
                        <div className='information-title-ditail'>님 반갑습니다.</div>
                    </div>
                </div>
                <div className='information-main'>
                    {/* <div className='information-title'>나의 정보</div> */}
                    <MypageInputBox activation={false} title='아이디' type='text' value={hostId} placeholder='' />
                    <MypageInputBox activation={false} title='이름' type='text' value={hostName} placeholder='' />
                    <MypageInputBox
                        activation={true}
                        title='현재 비밀번호'
                        type='password'
                        value={currentPassword}
                        placeholder='현재 비밀번호를 입력해 주세요.'
                        onChange={onCurrentPasswordChangeHandler}
                        activboolean={pwButtonBoolean}
                        buttonName='변경하기'
                        onButtonClick={onPasswordChangeClickHandler}
                    />
                    {passwordvisible && 
                    <div>    
                    <MypageInputBox
                        activation={true}
                        title='비밀번호'
                        type='password'
                        value={hostPassword}
                        placeholder='변경할 비밀번호를 입력해 주세요.'
                        messageError={passwordMessageError ? passwordMessage : ''}
                        onChange={onPasswordChangeHandler}
                    />
                    <MypageInputBox
                        activation={true}
                        title='비밀번호 확인'
                        type='password'
                        value={hostPasswordCheck}
                        placeholder='비밀번호를 다시 입력해 주세요.'
                        messageError={passwordCheckMessageError ? passwordCheckMessage : ''}
                        onChange={onPasswordCheckChangeHandler}
                        buttonName='변경'
                        activboolean={pwButtonBoolean}
                        onButtonClick={onHostPasswordChangeHandler}
                    />
                    </div>}
                    {visible ? 
                    <div>
                    <MypageInputBox
                        activation={false}
                        title="전화번호"
                        type="text"
                        value={telNumber}
                        placeholder="-를 빼고 입력해 주세요."
                        onButtonClick={onTelNumberInPutStateChangeHandler}
                        buttonName="변경" 
                    />
                    </div>:
                    <div>
                    <MypageInputBox
                        activation={!visible}
                        title="전화번호"
                        type="text"
                        value={changeTelNumber}
                        placeholder="전화번호를입력해주세요."
                        onChange={handlePhoneNumberChange}
                        onButtonClick={onTelAuthClickHandler}
                        buttonName="인증번호전송" 
                    />
                    <MypageInputBox
                        activation={true}
                        title='인증번호'
                        type='password'
                        value={authNumber}
                        placeholder='인증번호를 입력하세요.'
                        messageError={passwordMessageError ? passwordMessage : ''}
                        onChange={onAuthNumberChangeHandler}
                        buttonName='인증확인'
                        onButtonClick={onTelNumberChangeButtonHandler}
                    />
                    </div>
                    }
                    
                </div>
            </div>}
        </>
    )
}