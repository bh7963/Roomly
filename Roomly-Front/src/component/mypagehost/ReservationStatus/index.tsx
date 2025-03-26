import React, { ChangeEvent, useEffect, useState } from 'react';
import './style.css';
import ReservationStatusList from '../ReservationStatusList';
import GetReservationStatusListResponseDto from 'src/apis/hostmypage/dto/response/GetReservationStatusListResponseDto';
import { ResponseDto } from 'src/apis/guestmypage';
import { HOST_ACCESS_TOKEN } from 'src/constants';
import { useCookies } from 'react-cookie';
import ReservationList from 'src/types/accommodation/reservationstatus-list.interface';
import { SignInHost } from 'src/stores';
import useHostStore from 'src/stores/sign-in-host.store';
import { getHostReservationStatusListRequest } from 'src/apis';
import { useNavigate } from 'react-router';



interface Props {
    titletext: string;
    username: string;
    activite: boolean;
}

export default function ReservationStatus({ titletext, username, activite }: Props) {
    const [currentPage, setCurrentPage] = useState(1);
    const [cookies] = useCookies();
    const [reservationList, setReservationList ] = useState<ReservationList[]>([]);
    const { signInHost } = useHostStore();
    const navigator = useNavigate();

    // 페이지 변경 핸들러
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

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
        // function: 호스트(숙소) 예약 현황 리스트 처리 함수 //
        const getReservationList = () => {
            const hostAccessToken = cookies[HOST_ACCESS_TOKEN];
            if (!hostAccessToken) return;
            if (!signInHost?.hostId) return;
    
            const hostId = signInHost.hostId;
            getHostReservationStatusListRequest(hostId, hostAccessToken).then(getHostReservationListResponse)
        }

        useEffect(()=>{
            getReservationList();
            console.log('TEST:'+reservationList)
        },[])


    return (
        <>
            {activite && (
                <div id="reservationstatus-wrapper">
                    <div className="reservationstatus-title">
                        <div className="reservationstatus-title-text">{titletext}</div>
                        <div className="reservationstatus-title-box">
                            <div className="information-title-detail-username">
                                '{username}'
                            </div>
                            <div className="reservationstatus-title-detail">님 반갑습니다.</div>
                        </div>
                    </div>
                    <div className="reservationstatus-main">
                        {reservationList && reservationList.length > 0 ?(reservationList.map((reservation) => (
                            <div id='reservationstatus2-warpper'>
                                <div className='reservationstatus2-box'>
                                    <div className='reservationstatus2-list-top-deatail'>
                                        <div className='reservationstatus2-guestinfo-roomId'>예약번호 : {reservation.reservationId}</div>
                                        <div className='reservationstatus2-date'>예약시간: {reservation.createdAt}</div>
                                    </div>
                                    <div className='reservationstatus2-list-main-detail'>
                                        <img className='reservationstatus2-list-image' 
                                            src={reservation.accommodationMainImage} 
                                            onClick={onClickListComponent} />
                                        <div className='reservationstatus2-hotel-detail'>
                                            <div className='reservationstatus2-hotel-title'>{reservation.accommodationName}</div>
                                            <div className='reservationstatus2-hotel-room'>{reservation.roomName}</div>
                                        </div>
                                        <div className='reservationstatus2-detail-list'>
                                            <div className='reservationstatus2-stay'>{reservation.totalNight}박</div>
                                            <div className='reservationstatus2-start-end-time'>
                                                <div className='reservationstatus2-start'>입실시간: {reservation.checkInDay}</div>
                                                <div className='reservationstatus2-end'>퇴실시간: {reservation.checkOutDay}</div>
                                            </div>
                                            <div className='reservationstatus2-count'>{reservation.reservationTotalPeople}명</div>
                                        </div>
                                        <div className='reservationstatus2-guestinfo'>
                                            <div className='reservationstatus2-guestinfo-name'>이름 :{reservation.guestName}</div>
                                            <div className='reservationstatus2-guestinfo-guestId'>전화번호 :{reservation.guestTelNumber}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>))): '예약이 없습니다.'}
                    </div>
                    <div className="pagination">
                        {/* 이전 버튼 */}
                        {/* <button 
                            className="page-arrow" 
                            onClick={() => handlePageChange(currentPage - 1)} 
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button> */}

                        {/* 페이지 번호 */}
                        {/* {pageNumbers.slice(0, 5).map((pageNum) => (
                            <button
                                key={pageNum}
                                className={currentPage === pageNum ? 'active' : ''}
                                onClick={() => handlePageChange(pageNum)}
                            >
                                {pageNum}
                            </button>
                        ))} */}

                        {/* 다음 버튼 */}
                        {/* <button 
                            className="page-arrow" 
                            onClick={() => handlePageChange(currentPage + 1)} 
                            disabled={currentPage === totalPages}
                        >
                            &gt;
                        </button> */}
                    </div>
                </div>
            )}
        </>
    );
}
