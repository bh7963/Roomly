import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './style.css';
import Modal from 'react-modal';
import AccommodationDetailTopImages from '../../top/imageslick';

import { RoomDTO } from 'src/apis/accommodation/dto/request/room.request.dto';
import { useCookies } from 'react-cookie';

// props: 객실 카드 컴포넌트의 props 정의 //
interface RoomCardProps {
  room: RoomDTO;
  isFullyBooked: boolean; // 객실 매진 여부를 나타내는 props 추가
}

// component: 객실 상세 정보 보여주는 카드 컴포넌트 //
const HostRoomCard: React.FC<RoomCardProps> = ({ room, isFullyBooked }) => {

  // state: 상태 함수 //
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [cookies] = useCookies(['accessToken']);

  // state: url 값 저장 //
  const [searchParams] = useSearchParams('');

 

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
  // const handleChangebooking = () => {
  //   if (cookies.accessToken) {
  //     // 로그인 상태인 경우 예약 페이지로 이동
  //     navigator(
  //       `${PAYMENT_PATH}?Region=${urlRegion}&start=${urlStart}&end=${urlEnd}&count=${urlCount}&name=${encodeURIComponent(room.name)}&roomType=${urlRoom}`,
  //       { state: { imageSrc: room.images[0], price: room.roomPrice, checkInTime: urlStart, checkOutTime: urlEnd, personnelCount: urlCount, roomName: urlName, roomType: urlRoom } }
  //     );
  //   } else {
  //     // 로그인 상태가 아닌 경우 alert 표시 후 회원가입 페이지로 이동
  //     if (window.confirm('Roomly 회원만 숙박 예약이 가능합니다. 로그인/회원가입 페이지로 이동하시겠습니까?')) {
  //       navigator('/sign-up');
  //     }
  //   }
  // };

  const handleRoomEdit = () => {
    
        navigator('http://localhost:3000/mypagehost/accommodations/edit')
    
    } 


  return (
    <div id="room-card">
      {isFullyBooked ? ( // 객실이 매진된 경우
        <div className="fully-booked-message">
          <p>선택한 날짜의 객실은 매진되었어요.</p>
          <p>상단 검색창에서 날짜나 인원을 다시 설정해보세요.</p>
          <button className="change-schedule-btn" onClick={handleChangeSchedule}>
            일정 변경
          </button>
        </div>
      ) : (
        <>
          <div id="room-card-image">
            <img
              src={room.images[0]} // 첫 번째 이미지만 표시
              alt={room.roomName}
              onClick={() => handleImageClick(0)} // 이미지를 클릭하면 이미지 모달 열기
            />
            <div className='image-icon-container'>
              <div className='image-icon'></div>
              <div className="image-count">{room.images.length}+</div>
            </div>
          </div>
          <div id="room-card-info">
            <div className='room-name'>{room.roomName}</div>
            <p>입실 {room.checkInTime}</p>
            <p>퇴실 {room.checkOutTime}</p>
            <p>기준 {room.maxOccupancy}명</p>
          </div>
          <div className="room-card-action">
            <button className="detail-btn" onClick={handleOpenDetailModal}>
              상세 정보
            </button>
            <button className="reserve-btn" onClick={handleRoomEdit}>
              객실 수정
            </button>
            <button className="reserve-btn" >
              객실 삭제
            </button>
            <p className="price">₩{room.roomPrice.toLocaleString()}원 /1박</p>
          </div>
        </>
      )}

      {/* 이미지 모달: AccommodationDetailTopImages 사용 */}
      {isImageModalOpen && (
        <AccommodationDetailTopImages
          initialIndex={currentImageIndex}
          onClose={closeImageModal}
          images={room.images} // 객실 이미지 배열 전달
        />
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
          <h2>{room.roomName} - 상세정보</h2>
          <p>{room.description}</p>
          <p>입실 시간: {room.checkInTime}</p>
          <p>퇴실 시간: {room.checkOutTime}</p>
          <p>최대 수용 인원: {room.maxOccupancy}명</p>
          <p>가격: ₩{room.roomPrice.toLocaleString()}원</p>
          <button onClick={closeDetailModal}>닫기</button>
        </Modal>
      )}
    </div>
  );
};

export default HostRoomCard;
