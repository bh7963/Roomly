import { useEffect, useState } from 'react';
import './style.css';
import BookingList from '../../bookinglist';
import { SignInUser } from 'src/stores';
import { UseInformation } from 'src/types';
import { GetReservationListResponseDto } from 'src/apis/guestmypage/dto/response/get-reservationlist.response.dto';
import { ResponseDto } from 'src/apis/guestmypage';
import { getReservationListRequest } from 'src/apis';
import { GUEST_ACCESS_TOKEN } from 'src/constants';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

interface Props {
    titletext: string;
    username: string;
    activite: boolean;
}

export default function Booking({ titletext, username, activite }: Props) {

    const [currentPage, setCurrentPage] = useState(1);
    const [userId, setUserID] = useState<string>('');
    const { signInUser } = SignInUser();
    const [cookies, setCookie] = useCookies();

    const [reservationList, setReservationList] = useState<UseInformation[]>([]);

    const navigator = useNavigate();

    const getReservationListResponse = (responseBody: GetReservationListResponseDto | ResponseDto | null) => {
        const message =
            !responseBody ? '서버에 문제가 있습니다. ' :
                responseBody.code === 'AF' ? '잘못된 접근입니다. ' :
                    responseBody.code === 'DBE' ? '서버에 문제가있습니다. ' : '';
        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        };

    const { getReservationStatusResultSets } = responseBody as GetReservationListResponseDto;
    
    setReservationList(getReservationStatusResultSets);
}
    useEffect(() => {
        const guestAccessToken = cookies[GUEST_ACCESS_TOKEN];
        if (!guestAccessToken || !userId) return;  // userId가 설정되지 않으면 리턴
        getReservationListRequest(userId, guestAccessToken).then(getReservationListResponse);
    }, [userId])


    useEffect(() => {
        if (!signInUser) return;  // signInUser가 없다면 리턴
        setUserID(signInUser.guestId);  // userId 업데이트
    }, [signInUser]);  // signInUser가 변경될 때마다 실행

    const itemsPerPage = 3; // 한 페이지에 표시할 항목 수

    // 페이지 변경 핸들러
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const totalItems = reservationList.length;  // 총 아이템 수 (예시로 5개로 설정)
    const totalPages = Math.ceil(totalItems / itemsPerPage); // 페이지 수 계산

    // 페이지 번호 배열 생성
    const pageNumbers = [...Array(totalPages)].map((_, i) => i + 1);

    const onClickMainavigator = () => {
        navigator(`/main`)
    }
    return (
        <>
            {activite && (
                <div id="booking-wrapper">
                    <div className="booking-title">
                        <div className="booking-title-text">{titletext}</div>
                        <div className="booking-title-box">
                            <div className="information-title-detail-username">
                                '{username}'
                            </div>
                            <div className="booking-title-detail">님 반갑습니다.</div>
                        </div>
                    </div>
                    <div className="booking-main">
                    {reservationList && reservationList.length > 0 ? (
                        reservationList.map(reservation => 
                        <BookingList
                        reservationNumber = {reservation.reservationId}
                        bookingDate = {reservation.createdAt}
                        bookingPrice = {reservation.totalPrice}
                        accommodationImage  = {reservation.accommodationMainImage}
                        accommodationName   = {reservation.accommodationName}
                        roomName    = {reservation.roomName}
                        totalNight  = {reservation.totalNight}
                        roomCheckIn = {reservation.roomCheckIn}
                        roomCheckOut    = {reservation.roomCheckOut}
                        reservationTotalPeople  = {reservation.reservationTotalPeople} 
                    />)):(
                        <div className="no-results">
                        <p>내역이 없습니다.</p>
                        <div className='main-navigtor-button' onClick={onClickMainavigator}>메인으로 돌아가기</div>
                        </div>)}
                    </div>
                    
                </div>
            )}
        </>
    );
}
