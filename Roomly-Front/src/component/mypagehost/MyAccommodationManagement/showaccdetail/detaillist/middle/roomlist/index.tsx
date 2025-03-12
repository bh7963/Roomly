import React, { useState } from 'react';
import './style.css';
import { RoomDTO } from 'src/apis/accommodation/dto/request/room.request.dto';
import { AccommodationDetailRequestDTO } from 'src/apis/accommodation/dto/request/accommodation-detail.request.dto';
import HostRoomCard from '../roomcard';
// import MapSection from '../navermap';

interface RoomDetailProps {
  roomsData: RoomDTO[];
}
interface AccommodationInfoProps {
  accommodationData?: AccommodationDetailRequestDTO;
}

// component: middel 객실 리스트 컴보넌트(객실 카드, 숙소 소개)
const RoomList: React.FC<RoomDetailProps & AccommodationInfoProps> = ({ roomsData, accommodationData }) => {
  const [visibleRooms, setVisibleRooms] = useState(3); // 처음에는 3개의 객실만 보이도록 설정
  const [isAllRoomsVisible, setIsAllRoomsVisible] = useState(false); // 모든 객실 표시 여부
  const [isAccommodationInfoVisible, setIsAccommodationInfoVisible] = useState(false); // 숙소 정보 표시 여부

  const handleShowMore = () => {
    setVisibleRooms(roomsData.length); // 모든 객실 보여주기
    setIsAllRoomsVisible(true); // 상태를 true로 변경
  };

  const handleShowLess = () => {
    setVisibleRooms(3); // 다시 처음 3개의 객실만 보여주기
    setIsAllRoomsVisible(false); // 상태를 false로 변경
  };

  const toggleAccommodationInfo = () => {
    setIsAccommodationInfoVisible(!isAccommodationInfoVisible); // 숙소 정보 토글
  };

  return (
    <div id="room-list-container">
      <div className='room-list-title'>객실 선택</div>
      <div className="room-list">
        {roomsData.slice(0, visibleRooms).map((room, index) => (
          <HostRoomCard key={index} room={room} isFullyBooked={false} />))}
        {!isAllRoomsVisible ? (
          <button className="show-more-btn" onClick={handleShowMore}>
            객실 모두 보기
          </button>
        ) : (
          <button className="show-less-btn" onClick={handleShowLess}>
            모두 보기 닫기
          </button>
        )}
      </div>

      {/* 숙소 정보 보기/닫기 */}
      <div className="accommodation-info-section">
        {!isAccommodationInfoVisible ? (
          <button onClick={toggleAccommodationInfo} className="show-accommodation-info-btn">
            숙소 정보 보기
          </button>
        ) : (
          <>
            <button onClick={toggleAccommodationInfo} className="hide-accommodation-info-btn">
              숙소 정보 닫기
            </button>
            <div className="accommodation-info">
              {accommodationData ? (
                <>
                  <h3>숙소 소개</h3>
                  <p>{accommodationData.introduction}</p>
                  <h3>숙소 이용 정보</h3>
                  <div dangerouslySetInnerHTML={{ __html: accommodationData.usage_info }} />
                </>
              ) : (
                <p>숙소 정보를 불러오는 중입니다.</p>
              )}
            </div>
          </>
        )}
      </div>
      {/* 지도 섹션 */}
      {/* {isAccommodationInfoVisible && <MapSection />} */}


    </div>
  );
};

export default RoomList;
