import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import './style.css'
import { HOST_ACCESS_TOKEN } from 'src/constants';
import { useCookies } from 'react-cookie';
import { SignInHost } from 'src/stores';

import ReservationList from 'src/types/accommodation/reservationstatus-list.interface';
import { ResponseDto } from 'src/apis/guestmypage';
import GetReservationStatusListResponseDto from 'src/apis/hostmypage/dto/response/GetReservationStatusListResponseDto';
import { getHostAccommodationListRequest, getHostReservationStatusListRequest } from 'src/apis';

export default function ReservationStatusList() {
    const { signInHost } = SignInHost();
    const [cookies] = useCookies();
    const [guestName, setguestName] = useState<string>('');
    const [guestId, setguestId] = useState<string>('');
    const [reservationList, setReservationList ] = useState<ReservationList[]>([]);

    const today: Date = new Date();

    const todaytext: string = today.toString();

    const navigator = useNavigate();

    /** 
     * event handler: 클릭시 관련된 숙소 상세 페이지로 이동  
     * detail: 지금은 메인으로 이동하게 해놓음
     */
    const onClickListComponent = () => {
        navigator('/main')
    }

// Function: Get Guest Reservation List Response 처리 함수
const getHostReservationListResponse = (responseBody: GetReservationStatusListResponseDto | ResponseDto | null ) => {
    const message =
        !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'AF' ? '잘못된 접근입니다.' :
        responseBody.code === 'NI' ? '존재하지 않는 사용자입니다.' :
        responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
    
    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
        alert(message);
        return;
    }
    const { reservationList } = responseBody as GetReservationStatusListResponseDto;
    setReservationList(reservationList); // 상태로 저장
    };
    
    const getReservationList = () => {
        const hostAccessToken = cookies[HOST_ACCESS_TOKEN];
        if (!hostAccessToken) return;
        if (!signInHost?.hostId) return;

        const hostId = signInHost.hostId;
        getHostReservationStatusListRequest(hostId, hostAccessToken).then(getHostReservationListResponse)
    }
    // Effect: 백엔드 API에서 데이터 불러오기
    useEffect(() => {

        // getReservationList();

}, [signInHost]);

    return (
        (reservationList.map((reservation)=>(
        <div id='reservationstatus2-warpper'>
            <div className='reservationstatus2-box'>
                <div className='reservationstatus2-list-top-deatail'>
                    <div className='reservationstatus2-date'>예약시간: {reservation.createdAt}</div>
                </div>
                <div className='reservationstatus2-list-main-detail'>
                    <img className='reservationstatus2-list-image' src={reservation.accommodationMainImage} onClick={onClickListComponent} />
                    <div className='reservationstatus2-hotel-detail'>
                        <div className='reservationstatus2-hotel-title'>{reservation.accommodationName}</div>
                        <div className='reservationstatus2-hotel-room'>{reservation.roomName}</div>
                    </div>
                    <div className='reservationstatus2-detail-list'>
                        <div className='reservationstatus2-stay'>{reservation.totalNight}</div>
                        <div className='reservationstatus2-start-end-time'>
                            <div className='reservationstatus2-start'>입실시간: {reservation.checkInDay}</div>
                            <div className='reservationstatus2-end'>퇴실시간: {reservation.checkOutDay}</div>
                        </div>
                        <div className='reservationstatus2-count'>{reservation.reservationTotalPeople}</div>
                    </div>
                    <div className='reservationstatus2-guestinfo'>
                        <div className='reservationstatus2-guestinfo-roomId'>예약번호 : {reservation.reservationId}</div>
                        <div className='reservationstatus2-guestinfo-name'>이름 :{reservation.guestName}</div>
                        <div className='reservationstatus2-guestinfo-guestId'>전화번호 :{reservation.guestTelNumber}</div>
                    </div>
                </div>
            </div>
        </div>)))

    )
}
