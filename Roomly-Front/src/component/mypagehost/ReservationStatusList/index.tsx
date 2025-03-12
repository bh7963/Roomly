import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import './style.css'
import { LsisuerImage } from 'src/resources/images/leisure';
import { GetHostAccommodationListResponseDto } from 'src/apis/hostmypage/dto/response/GetHostAccommodationListResponseDto';
import { ResponseDto } from 'src/apis/hostmypage';
import { HOST_ACCESS_TOKEN } from 'src/constants';
import { useCookies } from 'react-cookie';
import { SignInHost } from 'src/stores';

import { ReservationStatus } from 'src/apis/hostmypage/dto/response/ReservationStatus';
import { GetReservationStatusListResponseDto } from 'src/apis/hostmypage/dto/response/GetReservationStatusListResponseDto';

interface Reservation {
    guestName: string;
    guestTelNumber: string;
    reservationId: number;
    // 필요한 경우 다른 속성 추가
}

export default function ReservationStatusList() {
    const { signInHost } = SignInHost();
    const [cookies] = useCookies();
    const [guestName, setguestName] = useState<string>('');
    const [guestId, setguestId] = useState<string>('');
    const [reservationStatusList, setReservationStatusList ] = useState<ReservationStatus[]>([]);

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
const getHostReservationListResponse = (responseBody: GetReservationStatusListResponseDto | ResponseDto | null) => {
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

    const { reservationStatusList } = responseBody as GetReservationStatusListResponseDto;
    // setReservationStatusList(reservationStatusList); // 상태로 저장
};
    // Effect: 백엔드 API에서 데이터 불러오기
    useEffect(() => {
    const hostAccessToken = cookies[HOST_ACCESS_TOKEN];
    if (!hostAccessToken) return;
    if (!signInHost) return;

    const hostId = signInHost.hostId;

    // getHostReservationListRequest(hostId, hostAccessToken)
    //     .then(getHostReservationListResponse); // 응답 처리
}, [cookies, signInHost]);

    return (
        <div id='reservationstatus2-warpper'>
            <div className='reservationstatus2-box'>
                <div className='reservationstatus2-list-top-deatail'>
                    <div className='reservationstatus2-date'>{todaytext}</div>
                </div>
                <div className='reservationstatus2-list-main-detail'>
                    <img className='reservationstatus2-list-image' src={LsisuerImage[1]} onClick={onClickListComponent} />
                    <div className='reservationstatus2-hotel-detail'>
                        <div className='reservationstatus2-hotel-title'>제주신라호텔 서귀포점</div>
                        <div className='reservationstatus2-hotel-room'>DELUXE | Double Room</div>
                    </div>
                    <div className='reservationstatus2-detail-list'>
                        <div className='reservationstatus2-stay'>몇박인지</div>
                        <div className='reservationstatus2-start-end-time'>
                            <div className='reservationstatus2-start'>입실시간:00:00</div>
                            <div className='reservationstatus2-end'>퇴실시간:00:00</div>
                        </div>
                        <div className='reservationstatus2-count'>인원:0</div>
                    </div>
                    <div className='reservationstatus2-guestinfo'>
                        <div className='reservationstatus2-guestinfo-roomId'>룸번호 : </div>
                        <div className='reservationstatus2-guestinfo-guestId'>아이디 :</div>
                        <div className='reservationstatus2-guestinfo-name'>이름 :</div>
                    </div>
                </div>
            </div>
        </div>

    )
}
