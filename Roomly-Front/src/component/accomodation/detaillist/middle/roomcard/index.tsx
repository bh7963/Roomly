import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './style.css';
import Modal from 'react-modal';
import AccommodationDetailTopImages from '../../top/imageslick';
import { PAYMENT_PATH } from 'src/constants';
import { useCookies } from 'react-cookie';
import useStore from 'src/stores/sign-in-user.store';
import GetAccommodationResponseDto from 'src/apis/hostmypage/dto/response/GetAccommodationResponseDto';
import Room from 'src/apis/hostmypage/dto/response/Room';

// props: 객실 카드 컴포넌트의 props 정의 //
interface Props {
  accommodation: GetAccommodationResponseDto;
  room:Room
}

// component: 객실 상세 정보 보여주는 카드 컴포넌트 //
const RoomCard = ({ accommodation, room }: Props) => {

  // state: 상태 함수 //
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [cookies] = useCookies(['guestAccessToken']);

  // state: url 값 저장 //
  const [searchParams] = useSearchParams('');

  // function: url 값 가져오기 //
  const urlRegion = searchParams.get('Region')
  const urlStart = searchParams.get('start')
  const urlEnd = searchParams.get('end')
  const urlCount = searchParams.get('count')
  const urlName = searchParams.get('accommodationName')
  const urlRoom = searchParams.get('roomName')
  

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // 이미지 클릭 시 이미지 모달 열기
  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsImageModalOpen(true);
  };

  // 상세 정보 버튼 클릭 시 상세 정보 모달 열기
  const handleOpenDetailModal = () => {
    setIsDetailModalOpen(true);
  };

  // 이미지 모달 닫기
  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  // 상세 정보 모달 닫기
  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  // 일정 변경 버튼 클릭 핸들러 
  const handleChangeSchedule = () => {
    navigator('/main'); // 메인 화면으로 이동
  };

  // event handler: 숙소 예약 버튼 클릭 시 예약 페이지로 이동하는 핸들러 //
  const handleChangebooking = () => {
    if (cookies.guestAccessToken) {
      // 로그인 상태인 경우 예약 페이지로 이동
      navigator(
        `${PAYMENT_PATH}?Region=${urlRegion}&start=${urlStart}&end=${urlEnd}&count=${urlCount}&name=${accommodation.accommodationName}&roomType=${urlRoom}`,
        { state: { imageSrc: accommodation.accommodationMainImage[0], price: room.roomPrice, checkInTime: urlStart, checkOutTime: urlEnd, personnelCount: urlCount, accommodationName:accommodation.accommodationName, roomName: room.roomName, roomType: urlRoom }
    });
    } else {
      // 로그인 상태가 아닌 경우 alert 표시 후 회원가입 페이지로 이동
      if (window.confirm('Roomly 회원만 숙박 예약이 가능합니다. 로그인/회원가입 페이지로 이동하시겠습니까?')) {
        navigator('/sign-up');
      }
    }
  };

  return (
    <div id="room-card">
      {false ? ( // 객실이 매진된 경우
        <div className="fully-booked-message">
          <p>선택한 날짜의 객실은 매진되었어요.</p>
          <p>상단 검색창에서 날짜나 인원을 다시 설정해보세요.</p>
          <button className="change-schedule-btn" onClick={handleChangeSchedule}>
            일정 변경
          </button>
        </div>
      ) : (
        <>
        <div id='room-card-image-container'>

            <img className='room-card-image'
              src={room.roomMainImage} // 첫 번째 이미지만 표시
              alt={room.roomName}
              onClick={() => handleImageClick(0)} // 이미지를 클릭하면 이미지 모달 열기
            />
            <div className='image-icon-container'>
              <div className='image-icon'></div>
              <div className="image-count">{room.roomImages.length}+</div>
            </div>

          </div>

          <div id="room-card-info">
            <div className='room-name'>{room.roomName}</div>

            <div className='check-in-container'>
            <div className='check-in-icon'></div>
            <div className='check-in-time'>입실 {room.roomCheckIn} ~</div>
            </div>

            <div className='check-out-container'>
            <div className='check-out-icon'></div>
            <div className='check-out-time'>퇴실 {room.roomCheckOut} ~</div>
            </div>
            
            <div className='max-occupancy-container'>
            <div className='max-occupancy-icon'></div>
            <div className='max-occupancy'>최대 숙박 가능 인원: {room.roomTotalGuest}명</div>
            </div>

          </div>

          <div id="room-card-action">
            <div className='detail-btn-container'>
            <button className="detail-btn" onClick={handleOpenDetailModal}>
              상세 정보
            </button>
            <div className='detail-btn-icon'></div>
            </div>
            <button className="reserve-btn" onClick={handleChangebooking}>
              숙박 예약
            </button>
            <div className='room-card-price-container'>
            <div className="room-card-price">{room.roomPrice.toLocaleString()}원 </div>
            <div className='price-per-night'>/1박</div>
            </div>
          </div>
        </>
      )}

      {/* 이미지 모달: AccommodationDetailTopImages 사용 */}
      {isImageModalOpen && (
        <AccommodationDetailTopImages accommodation={accommodation} room={room} onClose={closeImageModal} />
      )}

      {/* 상세 정보 모달 */}
      {isDetailModalOpen && (
        <Modal
          isOpen={isDetailModalOpen}
          onRequestClose={closeDetailModal} // 모달 외부를 클릭하거나 닫기 버튼을 누르면 닫기
          contentLabel="Room Details Modal"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <div className='test-test-test'>
            <div className='roomcard-detail-modal-close-title-box'>
          <button className='roomcard-detail-modal-close-button' onClick={closeDetailModal}></button>
          <div className='roomcard-detail-info-modal-title'>{room.roomName} </div>
          </div>
          <div className='room-modal-info-container'>
          <div className='room-modal-info'>객실 정보</div>
          <div className='room-modal-info-detail'>{accommodation.accommodationIntroduce}</div>
          <div className='room-modal-info-detail' >· 입실 시간: {room.roomCheckIn}</div>
          <div className='room-modal-info-detail' >· 퇴실 시간: {room.roomCheckOut}</div>
          <div className='room-modal-info-detail' >· 최대 수용 인원: {room.roomTotalGuest}명</div>
          <div className='room-modal-info-detail' >· 가격: ₩{room.roomPrice.toLocaleString()}원</div>
          </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RoomCard;
