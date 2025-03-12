import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import Main from './views/main/Main';


import Payment from './views/payment';

import { GUEST_ACCESS_TOKEN, ACCOMMODATION_LIST_DETAIL_PATH, ACCOMMODATION_LIST_PATH, AUTH_PATH, FINDID_PATH, MAIN_PATH, HOST_ACCESS_TOKEN } from './constants';

import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import SignUp from './views/auth';
import DetailList from './component/accomodation/detaillist';

import FAQ from './views/faq';
import HostAccommodationRegister from './component/mypagehost/MyAccommodationManagement/registration';


import BookingList from './component/mypageguest/bookinglist';

import HostEnrollmentapproval from './views/admin/hostenrollmentapproval/index';
import FindId from './views/find';


import GuestMypage from './views/mypageguest';
import Accommodationenrollmentapproval from './views/admin/accommodationenrollmentapproval';
import AccommodationList from './views/accommodation';
import Roomly from './views/roomly';

import ShowDetailList from './component/mypagehost/MyAccommodationManagement/showaccdetail/detaillist';
import { SignInHost, SignInUser } from './stores';


import { GetHostSignInResponseDto } from './apis/login/dto';
import { getSignInHostRequest } from './apis/signUp';
import { getGuestSignInRequest } from './apis/login';
import GetGuestSignInResponseDto from './apis/login/dto/response/get-guest-sign-in.response.dto';
import { ResponseDto } from './apis/guestmypage';

import HostMypage from './views/mypagehost';
import ReservationStatus from './component/mypagehost/ReservationStatus';
import HostMypageLayout from './layout/mypageHost';
import MyInfoManagement from './component/mypagehost/myinfo';
import MyAccommodationManagementView from './views/mypagehost/MyAccommodationManagement';
import HostList from './views/admin/hostenrollmentapproval/index';
import HostAccommodationRegisterForm from './component/mypagehost/MyAccommodationManagement/registration/accommodationRegistrationform';



// component: root path 컴포넌트 //
function Index() {
  const navigator = useNavigate();

  useEffect(() => {
    navigator('/main');
  }, []);

  return (
    <></>
  );
}

// component: booking path 컴포넌트 //
function Booking() {

  // state: 로그인 쿠키 상태 // 
  const [cookies] = useCookies();
  const navigator = useNavigate();

  // effect: 예약하기 클릭 시 마운트 될 상태 //
  useEffect(() => {
    if (cookies.accessToken) navigator('/booking');
    else navigator('/main');
  }, []);

  return (
    <></>
  )

}

export default function App() {

  // 로그인 유저 정보 상태 //
  const { signInUser, setSignInUser } = SignInUser();
  const { signInHost, setSignInHost } = SignInHost();

  // state : cookie 상태 //
  const [cookies, setCookie, removeCookie] = useCookies();

  // function : 네비게이터 함수 //
  const navigator = useNavigate();


  const getSignInGuestResponse = (responseBody: GetGuestSignInResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' :
        responseBody.code === 'NI' ? '로그인 유저 정보가 존재하지 않습니다.' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' : '';
    const isSuccessde = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessde) return;
    const { guestId, guestName, guestTelNumber } = responseBody as GetGuestSignInResponseDto
    setSignInUser({ guestId, guestName, guestTelNumber });
  }

  // function: get sign in host response 처리 함수 //
  const getSignInHostResponse = (responseBody: GetHostSignInResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' :
        responseBody.code === 'NI' ? '로그인 유저 정보가 존재하지 않습니다.' :
          responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' : '';
    const isSuccessde = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessde) return;

    const { hostId, hostName, hostTelNumber, hostPw, entryStatus } = responseBody as GetHostSignInResponseDto;
    setSignInHost({ hostId, hostName, hostPw, hostTelNumber, entryStatus });
  }

  useEffect(() => {
    const guestAccessToken = cookies[GUEST_ACCESS_TOKEN];

    if (guestAccessToken) getGuestSignInRequest(guestAccessToken).then(getSignInGuestResponse);
    else setSignInUser(null)
  }, [cookies[GUEST_ACCESS_TOKEN]])

  useEffect(() => {
    const hostAccessToken = cookies[HOST_ACCESS_TOKEN];
    if (hostAccessToken) getSignInHostRequest(hostAccessToken).then(getSignInHostResponse)
    else setSignInHost(null);
  }, [cookies[HOST_ACCESS_TOKEN]])

  // onPathChange 함수 정의
  const handlePathChange = () => {
    console.log('Path changed!');
  };

  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path={MAIN_PATH} element={<Main />} />
      <Route path='/mypageGuest' element={<GuestMypage />} />
      <Route path='/mypagehost' element={<HostMypage />} />
      <Route path='/mypagehost/enrollment' element={<HostAccommodationRegisterForm />} />


      <Route path={ACCOMMODATION_LIST_PATH} element={<AccommodationList />} />
      <Route path={ACCOMMODATION_LIST_DETAIL_PATH(':accommodationName')} element={<DetailList />} />
      <Route path={AUTH_PATH} element={<SignUp />} />
      <Route path='/payment' element={<Payment onPathChange={() => { }} />} />
      <Route path={FINDID_PATH} element={<FindId />} />
      <Route path='/roomly-company' element={<Roomly />} />
      <Route path='/adminhost' element={<HostEnrollmentapproval />}/>
      <Route path='/adminaccommodation' element={<Accommodationenrollmentapproval/>}/>
      <Route path='/faq' element={<FAQ/>}/>      

      <Route path='*' element={<Index />} />
    </Routes>

  );
}