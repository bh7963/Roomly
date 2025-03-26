
import './guest-style.css';
import './host-style.css';
import { ChangeEvent, useEffect, useState } from "react";
import InputBox from 'src/component/input/logup/guest';
import InputBox2 from 'src/component/input/logup/host';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ResponseDto from 'src/apis/signUp/dto/response/response.dto';
import GuestIdCheckRequestDto from 'src/apis/signUp/dto/request/guest/g-id-check.requst.dto';
import HostIdCheckRequestDto from 'src/apis/signUp/dto/request/host/h-id-check.requst.dto';
import { businessNumberCheckRequest, guestIdCheckRequest, guestSignUpRequest, hostIdCheckRequest, hostSignUpRequest, hostTelAuthRequest, telAuthCheckRequest, telAuthRequest } from 'src/apis/signUp';
import TelAuthRequestDto from 'src/apis/signUp/dto/request/common/tel-auth.request.dto';
import TelAuthCheckRequestDto from 'src/apis/signUp/dto/request/common/tel-auth-check.request.dto';
import GuestSignUpRequestDto from 'src/apis/signUp/dto/request/guest/g-sign-up.request.dto';
import HostSignUpRequestDto from 'src/apis/signUp/dto/request/host/h-sign-up.request.dto';
import React from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale'; // 한국어 지원
import BusinessNumberCheckRequestDto from 'src/apis/signUp/dto/request/host/h-business-number-check.request.dto';
import GuestTelAuthCheckRequestDto from 'src/apis/signUp/dto/request/common/guest-tel-auth-check-request.dto';

type AuthPath = '회원가입' | '로그인';
type CurrentView = 'host' | 'guest';

interface SnsContainnerProps {
  type: AuthPath;
}

// component : SNS 로그인 회원가입  컴포넌트  //
function SnsContainer({ type }: SnsContainnerProps) {

  // event handler: SNS 버튼 클릭 이벤트 처리 //
  const onSnsButtonClickHandler = (sns: 'kakao' | 'google') => {
    window.location.href = ``;
  };

  // render : SNS 로그인 회원가입 컴포넌트 렌더링 //
  return (
    <div className="sns-container">
      <div className="snsMessage">SNS계정으로 {type}</div>
      <div className="sns-button-container">
        <div className={`sns-button ${type === '회원가입' ? 'md ' : ''}kakao`} onClick={() => onSnsButtonClickHandler('kakao')}></div>
        <div className={`sns-button ${type === '회원가입' ? 'md ' : ''} google`} onClick={() => onSnsButtonClickHandler('google')}></div>
      </div>
    </div>
  )
}

// component: 회원가입 화면 컴포넌트 //
export default function SignUp() {

  // state: 현재 화면 상태 관리
  const [currentView, setCurrentView] = useState<CurrentView>('guest');

  // state: 최종 입력 상태 확인 //
  const [isAgreed, setIsAgreed] = useState<boolean>(false);

  // state: Query Parameter 상태 //
  const [queryParam] = useSearchParams();
  const snsId = queryParam.get('snsId');
  const joinPath = queryParam.get('joinPath');

  // state: 공통 입력 정보 상태 //
  const [telNumber, setTelNumber] = useState<string>('');
  const [authNumber, setAuthNumber] = useState<string>('');

  // state:  guest 입력 정보 상태 //
  const [guestName, setGuestName] = useState<string>('');
  const [guestId, setGuestId] = useState<string>('');
  const [guestPassword, setGuestPassword] = useState<string>('');
  const [guestPasswordCheck, setGuestPasswordCheck] = useState<string>('');

  // state:  host 입력 정보 상태 // 
  const [hostName, setHostName] = useState<string>('');
  const [hostId, setHostId] = useState<string>('');
  const [hostPassword, setHostPassword] = useState<string>('');
  const [hostPasswordCheck, setHostPasswordCheck] = useState<string>('');
  const [businessName, setBusinessName] = useState<string>('');
  const [businessNumber, setBusinessNumber] = useState<string>('');
  const [businessStartDay, setBusinessStartDay] = useState<Date | null>(null);
  const [businessType, setBusinessType] = useState<string>('');
  const [startStringDay, setStartStringDay] = useState<string>('');

  const [businessImage, setBusinessImage] = useState<string>('');
  const [formattedBusinessStartDay, setFormattedBusinessStartDay] = useState<string>('');


  // state: 입력값 검증 상태 //
  const [isCheckedId, setCheckedId] = useState<boolean>(false);
  const [isMatchedPassword, setMatchedPassword] = useState<boolean>(false);
  const [isCheckedPassword, setCheckedPassword] = useState<boolean>(false);
  const [isSend, setSend] = useState<boolean>(false);
  const [isCheckedAuthNumber, setCheckedAuthNumber] = useState<boolean>(false);

  // state: 입력 메세지 상태 //
  const [nameMessage, setNameMessage] = useState<string>('');
  const [idMessage, setIdMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');
  const [telNumberMessage, setTelNumberMessage] = useState<string>('');
  const [authNumberMessage, setAuthNumberMessage] = useState<string>('');
  const [businessNameCheckMessage, setBusinessNameCheckMessage] = useState<string>('');
  const [businessNumberCheckMessage, setBusinessNumberCheckMessage] = useState<string>('');
  const [businessStartDayCheckMessage, setBusinessStartDayCheckMessage] = useState<string>('');



  // state: 정보 메세지 에러 상태 //
  const [nameMessageError, setNameMessageError] = useState<boolean>(false);
  const [idMessageError, setIdMessageError] = useState<boolean>(false);
  const [passwordMessageError, setPasswordMessageError] = useState<boolean>(false);
  const [passwordCheckMessageError, setPasswordCheckMessageError] = useState<boolean>(false);
  const [telNumberMessageError, setTelNumberMessageError] = useState<boolean>(false);
  const [authNumberMessageError, setAuthNumberMessageError] = useState<boolean>(false);
  const [businessNameCheckMessageError, setBusinessNameCheckMessageError] = useState<boolean>(false);
  const [businessNumberCheckMessageError, setBusinessNumberCheckMessageError] = useState<boolean>(false);
  const [businessImageCheckMessageError, setBusinessImageCheckMessageError] = useState<boolean>(false);
  const [businessStartDayCheckMessageError, setBusinessStartDayCheckMessageError] = useState<boolean>(false);
  const [guestIsButtonEnabled, setGuestIsButtonEnabled] = useState(false);
  const [hostIsButtonEnabled, setHostIsButtonEnabled] = useState(false);


  const navigator = useNavigate();

  // 1. 회원가입 가능 여부 (게스트)
  useEffect(() => {
    // 모든 필드가 채워졌는지 확인
    const guestAllFieldsFilled =
      guestName !== '' &&
      guestId !== '' &&
      guestPassword !== '' &&
      guestPasswordCheck !== '' &&
      telNumber !== '' &&
      isAgreed &&
      isCheckedId &&  // 아이디 중복 체크 여부
      isMatchedPassword &&  // 비밀번호 확인 일치 여부
      isCheckedPassword &&  // 비밀번호 체크 여부
      isSend &&  // 인증 코드 전송 여부
      authNumber !== '' &&  // 인증 번호 입력 여부
      isCheckedAuthNumber;  // 인증 번호 체크 여부

    setGuestIsButtonEnabled(guestAllFieldsFilled);
  }, [
    guestName,
    guestId,
    guestPassword,
    guestPasswordCheck,
    telNumber,
    isAgreed,
    isCheckedId,
    isMatchedPassword,
    isCheckedPassword,
    isSend,
    authNumber,
    isCheckedAuthNumber
  ]);

  useEffect(() => {
    setCheckedId(false)
  }, [guestId, hostId])


  // 2. 회원가입 가능 여부 (호스트)
  useEffect(() => {
    // 모든 필드가 채워졌고 체크박스가 선택되었는지 확인
    const hostAllFieldsFilled =
      hostName !== '' &&
      hostId !== '' &&
      hostPassword !== '' &&
      hostPasswordCheck !== '' &&
      businessName !== '' &&
      businessNumber !== '' &&
      businessType !== '' &&
      formattedBusinessStartDay !== '' &&
      telNumber !== '' &&
      authNumber !== '' &&
      isAgreed &&  // 동의 여부
      isSend &&  // 인증 코드 전송 여부
      isCheckedId;  // 아이디 중복 체크 여

    setHostIsButtonEnabled(hostAllFieldsFilled);

  }, [isSend, isCheckedId, hostName, hostId, hostPassword, hostPasswordCheck, businessName, businessNumber, businessStartDay, businessImage, formattedBusinessStartDay, telNumber, authNumber, isAgreed]);

  // function: 아이디 중복확인 Response 처리 함수 //
  const IdCheckResponse = (responseBody: ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '올바른 데이터가 아닙니다.' :
          responseBody.code === 'DI' ? '이미 사용중인 아이디입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
              responseBody.code === 'SU' ? '사용가능한 아이디입니다.' : ''

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    setIdMessage(message);
    setIdMessageError(!isSuccessed); // 성공이 아닐때 에러가 떠야 하니까
    setCheckedId(isSuccessed); // 성공 된 경우
  };

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
    setTelNumberMessage(message);
    setTelNumberMessageError(!isSuccessed);
    setSend(isSuccessed);
  };

  // function: 전화번호 인증 확인 Response 처리 함수 //
  const telAuthCheckResponse = (responseBody: ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '올바른 데이터가 아닙니다.' :
          responseBody.code === 'TAF' ? '인증번호가 일치하지 않습니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
              responseBody.code === 'SU' ? '인증번호가 확인되었습니다.' : ''

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    setAuthNumberMessage(message);
    setAuthNumberMessageError(!isSuccessed);
    setCheckedAuthNumber(isSuccessed);
  };

  // function : guest 회원가입 Response 처리 함수 //
  const guestSignUpResponse = (responseBody: ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '올바른 데이터가 아닙니다.' :
          responseBody.code === 'DI' ? '중복된 아이디입니다.' :
            responseBody.code === 'DT' ? '중복된 전화번호입니다.' :
              responseBody.code === 'TAF' ? '인증번호가 일치하지 않습니다.' :
                responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }
  };

  // function : host 회원가입 Response 처리 함수 //
  const hostSignUpResponse = (responseBody: ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '올바른 데이터가 아닙니다.' :
          responseBody.code === 'DI' ? '중복된 아이디입니다.' :
            responseBody.code === 'DT' ? '중복된 전화번호입니다.' :
              responseBody.code === 'TAF' ? '인증번호가 일치하지 않습니다.' :
                responseBody.code === 'NB' ? '사업자번호 인증에 실패했습니다.' :
                  responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }
    if (isSuccessed) {
      navigator('/main')
    }
  };

  // function : 사업자 번호 전송 Response 처리 함수 //
  const businessNumberCheckResponse = (responseBody: ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '올바른 데이터가 아닙니다.' :
          responseBody.code === 'DI' ? '중복된 사업자등록번호입니다.' :
            responseBody.code === 'NB' ? '사업자번호 인증에 실패했습니다.' :
              responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
                responseBody.code === 'SU' ? '인증에 성공 했습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }

    alert(message);
  };

  // event handler: 이름 변경 이벤트 처리 //
  const onNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setGuestName(value);
    setHostName(value);
  };


  // event handler: guest 아이디 중복 확인 버튼 클릭 이벤트 처리 //
  const onGuestIdCheckClickHandler = () => {
    if (!guestId) return; // 중복되지 않은 아이디일 경우 바로 return 시켜준다.

    // 객체 생성
    const requestBody: GuestIdCheckRequestDto = {
      guestId: guestId
    }
    // Promise 타입이기때문에 기다리지 않고 다음 결과가 넘어가기 때문에 then을 사용한다.
    // then은 앞의 결과가 끝나고 바로 then을 수행하게끔 만들어 준다.
    guestIdCheckRequest(requestBody).then(IdCheckResponse);
  };

  // event handler: host 아이디 중복 확인 버튼 클릭 이벤트 처리 //
  const onHostIdCheckClickHandler = () => {
    if (!hostId) return;

    const requestBody: HostIdCheckRequestDto = {
      hostId: hostId
    }

    hostIdCheckRequest(requestBody).then(IdCheckResponse);
  };

  // event handler: 아이디 변경 이벤트 처리 //
  const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setGuestId(value);
    setHostId(value);
    setIdMessage('');
  };

  // event handler: 비밀번호 변경 이벤트 처리 //
  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setGuestPassword(value);
    setHostPassword(value);

    const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,13}$/;
    const isMatched = pattern.test(value);

    // 비밀번호가 8자 이상일 때만 메시지를 설정
    if (value.length >= 8) {
      const message = isMatched ? '' : '영문, 숫자를 혼용하여 8 ~ 13자를 입력해주세요';
      setPasswordMessage(message);
      setPasswordMessageError(!isMatched);
      setMatchedPassword(isMatched);
    } else {
      setPasswordMessage(''); // 비밀번호가 8자 미만일 때 메시지 초기화
      setPasswordMessageError(false);
    }
  };

  // event handler: 비밀번호 변경 확인 이벤트 처리 //
  const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setGuestPasswordCheck(value);
    setHostPasswordCheck(value);
  };

  // event handler: 사업자 등록이름 변경 이벤트 처리 // 
  const onBusinessNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setBusinessName(value);

    if (!value) {
      // 입력이 없을 경우 오류 메시지 설정
      setBusinessNameCheckMessage('사업자 등록이름을 입력해주세요');
      setBusinessNameCheckMessageError(true);
    } else {
      // 입력이 있을 경우 오류 메시지 초기화
      setBusinessNameCheckMessage('');
      setBusinessNameCheckMessageError(false);
    }
  };


  // event handler: 사업자 번호 변경 이벤트 처리 //
  const onBusinessNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target; // 입력된 값을 가져옴
    setBusinessNumber(value); // 상태 업데이트
  };

  
  // event handler: 사업자 번호 변경 이벤트 처리 //
  const onBusinessTypeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target; // 입력된 값을 가져옴
    setBusinessType(value); // 상태 업데이트
  };

  // event handler: 사업자 번호 버튼 클릭 이벤트 처리 //
  const onBusinessNumberCheckClickHandler = () => {
    if (!businessNumber) {
      setBusinessNumberCheckMessage('사업자 번호를 입력하세요.'); // 입력이 없을 경우 메시지 설정
      setBusinessNumberCheckMessageError(true);
      return;
    }

    const pattern = /^[0-9]{10}$/;
    const isMatched = pattern.test(businessNumber);

    if (!isMatched) {
      setBusinessNumberCheckMessage('숫자 10자를 입력 해주세요');
      setBusinessNumberCheckMessageError(true);
    } else {
      // 10자 숫자 형식이 맞으면 에러 메시지 초기화
      setBusinessNumberCheckMessageError(false);

      const requestBody: BusinessNumberCheckRequestDto = {
        b_no: businessNumber,
        start_dt: startStringDay,
        p_nm: businessName,
        b_sector: businessType
      };
      businessNumberCheckRequest(requestBody).then(businessNumberCheckResponse);
    }
  };

  // event handler: 개업일 등록 버튼 클릭 이벤트처리
  const onBusinessStartDayChangeHandler = (date: Date | null) => {
    setBusinessStartDay(date);

    if (!date) {
      setBusinessStartDayCheckMessage('개업일자를 선택해주세요.');
      setBusinessStartDayCheckMessageError(true);
      setStartStringDay('');
    } else {
      setBusinessStartDayCheckMessage('');
      setBusinessStartDayCheckMessageError(false);
      setStartStringDay(format(date, 'yyyyMMdd'));
    }
  };

  useEffect(() => {
    console.log(startStringDay)
  }, [
    startStringDay
  ])

  const onChangeStsratStringDay = (businessStartDay: Date) => {

  }

  // event handler: 전화번호 인증 버튼 클릭 이벤트 처리 //
  const onTelNumberSendClickHandler = () => {
    if (!telNumber) return;

    const pattern = /^[0-9]{11}$/;
    const isMatched = pattern.test(telNumber);

    if (!isMatched) {
      setTelNumberMessage('숫자 11자를 입력 해주세요');
      setTelNumberMessageError(true);
      return;
    }


    const requestBody: TelAuthRequestDto = {
      guestTelNumber: telNumber // 속성의 이름과 담을 변수의 이름이 동일한 경우 하나로 작성
    }
    telAuthRequest(requestBody).then(telAuthResponse);
  };

  // event handler: 게스트 인증 확인 버튼 클릭 이벤트 처리 //
  const onAuthNumberCheckClickHandler = () => {
    if (!authNumber) return;

    const requestBody: TelAuthCheckRequestDto = {
      telNumber: telNumber,
      authNumber: authNumber
    }
    telAuthCheckRequest(requestBody).then(telAuthCheckResponse);

  };

  // event handler: 호스트 인증 확인 버튼 클릭 이벤트 처리 //
  const onHostAuthNumberCheckClickHandler = () => {
    if (!authNumber) return;

    const requestBody: TelAuthCheckRequestDto = {
      telNumber: telNumber,
      authNumber: authNumber
    }
    hostTelAuthRequest(requestBody).then(telAuthCheckResponse);

  };

  // event handler: 개인정보 동의 버튼 클릭 이벤트 처리 //
  const onAgreeButtonClickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(event.target.checked);
  };

  // event handler: 상단 게스트 버튼 클릭 이벤트 처리
  const onGuestButtonClickHandler = () => {
    setCurrentView('guest'); // 게스트 화면으로 변경
  };

  // event handler: 상단 호스트 버튼 클릭 이벤트 처리
  const onHostButtonClickHandler = () => {
    setCurrentView('host'); // 호스트 화면으로 변경
  };

  // event handler: 메인페이지 이동 버튼(회원가입 버튼 하단) 클릭 이벤트 처리
  const onMainPageGoClickHandler = () => {
    window.location.href = '/main'; // 이동할 페이지 경로 설정
  };

  // event handler: 전화번호 변경 이벤트 처리 //
  const onTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTelNumber(value);
    setSend(false);
    setTelNumberMessage('');
  };

  // event handler: 인증번호 변경 이벤트 처리 //
  const onAuthNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAuthNumber(value);
    setCheckedAuthNumber(false);
    setAuthNumberMessage('');
  };

  // event handler: Guest 회원가입 버튼 클릭 이벤트 처리 //
  const onGuestSignUpButtonHandler = () => {
    if (!guestIsButtonEnabled) return;

    const requestBody: GuestSignUpRequestDto = {
      guestName: guestName, // guestName 변수를 사용
      guestId: guestId, // guestId 변수를 사용
      guestPw: guestPassword, // guestPassword 변수를 사용
      snsId: snsId, // guestSnsId 변수를 사용
      guestTelNumber: telNumber,
      guestAuthNumber: authNumber
    };

    guestSignUpRequest(requestBody).then(guestSignUpResponse);
    navigator('/main')

  };

  // Host 회원가입 버튼 클릭 이벤트 처리 //
  const onHostSignUpButtonHandler = () => {
    // if (!hostIsButtonEnabled) return;

    const requestBody: HostSignUpRequestDto = {
      hostId: hostId,
      hostPw: hostPassword,
      hostName,
      hostTelNumber: telNumber,
      hostAuthNumber: authNumber,
      hostBusinessNumber: businessNumber,
      businessName: businessName,
      businessStartDay: startStringDay,
      businessType: businessType
    };

    hostSignUpRequest(requestBody).then(hostSignUpResponse);
  };


  // effect : 비밀번호 및 비밀번호 확인 변경시 실행할 함수 //
  useEffect(() => {
    // Guest 비밀번호 체크
    if (!guestPassword || !guestPasswordCheck) {
      setPasswordCheckMessage(''); // 초기화
      setPasswordCheckMessageError(false);
      setCheckedPassword(false);
    } else {
      const isGuestPasswordEqual = guestPassword === guestPasswordCheck;
      const guestMessage = isGuestPasswordEqual ? '' : '비밀번호가 일치하지 않습니다.';

      setPasswordCheckMessage(guestMessage);
      setPasswordCheckMessageError(!isGuestPasswordEqual);
      setCheckedPassword(isGuestPasswordEqual);
    }

    // Host 비밀번호 체크
    if (!hostPassword || !hostPasswordCheck) {
      setPasswordCheckMessage(''); // 초기화
      setPasswordCheckMessageError(false);
      setCheckedPassword(false);
    } else {
      const isHostPasswordEqual = hostPassword === hostPasswordCheck;
      const hostMessage = isHostPasswordEqual ? '' : '비밀번호가 일치하지 않습니다.';

      setPasswordCheckMessage(hostMessage);
      setPasswordCheckMessageError(!isHostPasswordEqual);
      setCheckedPassword(isHostPasswordEqual);
    }
  }, [
    guestPassword,
    guestPasswordCheck,
    hostPassword,
    hostPasswordCheck
  ]);

  const InputComponent = currentView === 'guest' ? InputBox : InputBox2;

  // render: 회원가입 화면 컴포넌트 렌더링 //


  return (
    <div id={`${currentView}-signUp-wrapper`}>
      <div style={{ paddingTop: '50px' }}>
        <div className={`${currentView}-login-button`}>
          <a
            className={`${currentView === 'guest' ? 'GuestLogin-button-guest' : 'HostLogin-button-guest'}`}
            onClick={onGuestButtonClickHandler}
          >
            Guest
          </a>
          <a
            className={`${currentView === 'guest' ? 'GuestLogin-button-host' : 'HostLogin-button-host'}`}
            onClick={onHostButtonClickHandler}
          >
            Host
          </a>
        </div>
        <div className={`${currentView}-input-box-signup`}>
          <div className={`${currentView}-inputBox`}>
            <div className={`${currentView}-title`}>Sign up</div>
            <div className={`${currentView}-input-container3`}>
              {/* 이름 */}
              <InputComponent
                messageError={nameMessageError}
                message={nameMessage}
                value={currentView === 'guest' ? guestName : hostName}
                label="이름"
                type="text"
                placeholder="이름을 입력해주세요."
                onChange={onNameChangeHandler}
              />
              {/* 아이디 */}
              <InputComponent
                messageError={idMessageError}
                message={idMessage}
                value={currentView === 'guest' ? guestId : hostId}
                label="아이디"
                type="text"
                placeholder="아이디를 입력해주세요."
                buttonName="중복확인"
                onChange={onIdChangeHandler}
                onButtonClick={currentView === 'guest' ? onGuestIdCheckClickHandler : onHostIdCheckClickHandler}
              />
              {/* 비밀번호 */}
              <InputComponent
                messageError={passwordMessageError}
                message={passwordMessage}
                value={currentView === 'guest' ? guestPassword : hostPassword}
                label="비밀번호"
                type="password"
                placeholder="비밀번호"
                onChange={onPasswordChangeHandler}
              />
              {/* 비밀번호 확인 */}
              <InputComponent
                messageError={passwordCheckMessageError}
                message={passwordCheckMessage}
                value={currentView === 'guest' ? guestPasswordCheck : hostPasswordCheck}
                label="비밀번호 확인"
                type="password"
                placeholder="비밀번호 확인"
                onChange={onPasswordCheckChangeHandler}
              />
              {/* 전화번호 */}
              <InputComponent
                messageError={telNumberMessageError}
                message={telNumberMessage}
                value={telNumber}
                label="전화번호"
                type="text"
                placeholder="-빼고 입력해주세요."
                buttonName="전화번호 인증"
                onChange={onTelNumberChangeHandler}
                onButtonClick={onTelNumberSendClickHandler}
              />
              {/* 인증번호 */}
              <InputComponent
                messageError={authNumberMessageError}
                message={authNumberMessage}
                value={authNumber}
                label="인증번호"
                type="text"
                placeholder="인증번호 4자리를 입력해주세요."
                buttonName="인증확인"
                onChange={onAuthNumberChangeHandler}
                onButtonClick={currentView === 'guest' ? onAuthNumberCheckClickHandler: onHostAuthNumberCheckClickHandler}
              />
              {/* 사업자 등록 (호스트만) */}
              {currentView === 'host' && (
                <>
                  <InputComponent
                    messageError={businessNameCheckMessageError}
                    message={businessNameCheckMessage}
                    value={businessName}
                    label="사업자 등록이름"
                    type="text"
                    placeholder="사업자 등록이름을 입력해주세요."
                    onChange={onBusinessNameChangeHandler}
                  />
                  
                  {/* <InputComponent
                    messageError={businessImageCheckMessageError}
                    message=''
                    value={businessImage}
                    label="사업자 등록증 사진"
                    type="file"
                    placeholder=""
                    onChange={onBusinessImageChangeHandler}
                  /> */}
                  <InputComponent
                    messageError={businessNumberCheckMessageError}
                    message={businessNumberCheckMessage}
                    value={businessType}
                    label="사업자 유형"
                    type="text"
                    placeholder="사업자 유형을 입력하세요."
                    onChange={onBusinessTypeChangeHandler}
                  />
                  <div id="business-wrapper">
                    <div className="startDay-container">
                      <div>
                        <div className="startDay">개업일[선택]</div>
                        <DatePicker
                          selected={businessStartDay}
                          onChange={onBusinessStartDayChangeHandler}
                          dateFormat="yyyy-MM-dd"
                          locale={ko}
                          placeholderText="개업일자 선택(클릭)"
                          isClearable
                          className="host-input-field"
                        />
                        <div className="startDay-button" ></div>
                      </div>
                      {businessStartDayCheckMessageError && (
                        <div className="error-message">{businessStartDayCheckMessage}</div>
                      )}
                    </div>
                    <InputComponent
                    messageError={businessNumberCheckMessageError}
                    message={businessNumberCheckMessage}
                    value={businessNumber}
                    label="사업자 등록번호"
                    type="text"
                    placeholder="사업자 등록번호 10자를 입력해주세요."
                    buttonName="등록"
                    onChange={onBusinessNumberChangeHandler}
                    onButtonClick={onBusinessNumberCheckClickHandler}
                  />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={`${currentView}-button-container2`}>
            <div className={`${currentView}-agree`}>
              <input
                className={`${currentView}-agreeButton`}
                type="checkbox"
                checked={isAgreed}
                onChange={onAgreeButtonClickHandler}
              />
              <div className={`${currentView}-agreeMessage`}>개인정보 수집 및 이용약관에 동의합니다.</div>
            </div>
            <button
              className={`${currentView}-button-clear-${guestIsButtonEnabled ? 'active' : 'disable'}`}
              onClick={currentView === 'guest' ? onGuestSignUpButtonHandler : onHostSignUpButtonHandler}
            >
              회원가입
            </button>
          </div>
          {/* 이미 Roomly 회원이신가요? 및 로그인 버튼 */}
          <div className={`${currentView}-already-signIn`}>
            <div className={`${currentView}-already`}>이미 Roomly 회원이신가요?</div>
            <div className={`${currentView}-mainPageGo`} onClick={onMainPageGoClickHandler}>
              메인페이지에서 로그인하기
            </div>
          </div>
          {/* {currentView === 'guest' && !isSnsSignUp && <SnsContainer type="회원가입" />} */}
        </div>
      </div>
    </div>
  );
};