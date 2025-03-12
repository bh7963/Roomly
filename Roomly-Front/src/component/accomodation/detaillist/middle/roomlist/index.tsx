import React, { useState } from "react";
import "./style.css";
import GetAccommodationResponseDto from "src/apis/hostmypage/dto/response/GetAccommodationResponseDto";
import RoomCard from "../roomcard";

interface Props {
  accommodation: GetAccommodationResponseDto
}

// component: middel 객실 리스트 컴보넌트(객실 카드, 숙소 소개)
const RoomList = ({ accommodation }: Props) => {

    // state: 숙소 리스트 불러오기 상태 관리
  const [callAccommodationDetailList, SetCallAccommodationDetailList] = useState<GetAccommodationResponseDto[]>([]);
  const [visibleRooms, setVisibleRooms] = useState(3); // 처음에는 3개의 객실만 보이도록 설정
  const [isAllRoomsVisible, setIsAllRoomsVisible] = useState(false); // 모든 객실 표시 여부

  const handleShowLess = () => {
    setVisibleRooms(3); // 다시 처음 3개의 객실만 보여주기
    setIsAllRoomsVisible(false); // 상태를 false로 변경
  };

  const handleShowMore = () => {
    
  };

  return (
    <div id="room-list-container">
      <div className='room-list-title'>객실 선택</div>
      <div className="room-list">
        {accommodation.roomList.slice(0, visibleRooms).map((room, index) => (
          <RoomCard key={index} accommodation={accommodation} room={room} />))}
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

      <div id="accommodation-info-section">
        <>
          <div className="accommodation-info">
            {accommodation ? (
              <>
                <div className="accommodation-info-introduction-container">
                  <div className="accommodation-info-container-left-icon"></div>
                  <div className="accommodation-info-introduction">
                    숙소 소개
                  </div>
                  <div className="accommodation-info-content">
                    {accommodation.accommodationIntroduce}
                  </div>
                  <div className="accommodation-info-introduction-divider"></div>
                </div>

                <div className="accommodation-info-content-container">
                  <div className="accommodation-info-introduction">
                    숙소 이용 정보
                  </div>
                  <div
                    className="accommodation-info-content"
                    {...accommodation.useInformations}
                  
                  />
                  <div className="accommodation-info-container-right-icon"></div>
                </div>
              </>
            ) : (
              <div className="accommodation-info-introduction">
                등록된 숙소 정보가 없습니다.
              </div>
            )}
          </div>
        </>
      </div>
    </div>
  );
};

export default RoomList;
