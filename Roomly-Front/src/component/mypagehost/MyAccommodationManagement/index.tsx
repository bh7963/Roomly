import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate, useParams } from "react-router";

import PaginationFunction from "src/component/accomodation/pagination";

import { getHostAccommodationListRequest } from "src/apis";
import { HOST_ACCESS_TOKEN } from "src/constants";
import { useCookies } from "react-cookie";
import { SignInHost } from "src/stores";
import { GetHostAccommodationListResponseDto } from "src/apis/hostmypage/dto/response/GetHostAccommodationListResponseDto";
import { ResponseDto } from "src/apis/guestmypage";
import { MyAccommodation } from "src/apis/hostmypage/dto/response/MyAccommodation";


// type MyAccommodation = {
  
//   accommodationName: string;
//   accommodationMainImage: string;
//   applyStatus: boolean;
//   entryTime: string;
// };

const handleRegisterClick = () => {
  window.location.href = "http://localhost:3000/mypagehost/accommodations/register";
};

const AccommodationManagementPage: React.FC = () => {

  const { signInHost } = SignInHost();
  
  const hostId = signInHost?.hostId 

  const [selectedTab, setSelectedTab] = useState<string>("운영중");
  const [originalList, setOriginalList] = useState<MyAccommodation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cookies] = useCookies();



  // function: get host accommodation list response 처리 함수 //
  const getHostAccommodationListResponse = (responseBody: GetHostAccommodationListResponseDto | ResponseDto | null) => {
    const message = 
    !responseBody ? '서버에 문제가 있습니다. ':
    responseBody.code === 'AF' ? '잘못된 접근입니다. ':
    responseBody.code === 'NI' ? '존재하지 않는 사용자 입니다. ':
    responseBody.code === 'DBE' ? '서버에 문제가있습니다. ': '';
    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
        alert(message);
        return;
    };
    const { accommodations } = responseBody as GetHostAccommodationListResponseDto 
    setOriginalList(accommodations);
  }

  // Effect: 백엔드 API에서 데이터 불러오기
  useEffect(() => {
    const hostAccessToken = cookies[HOST_ACCESS_TOKEN];
    if (!hostAccessToken) return ;
    
    if(!signInHost) return;
    const hostId = signInHost.hostId

    getHostAccommodationListRequest(hostId,hostAccessToken).then(getHostAccommodationListResponse);
    
  }, []);


  const filteredAccommodations = originalList.filter(
    (accommodations) => 
      selectedTab === "운영중" ? accommodations.applyStatus : !accommodations.applyStatus
  );

  return (
    <div className="accommodation-management-page">
      <h2 className="page-title">내 숙소 정보 관리</h2>
      <p className="page-subtitle"> {signInHost?.hostName}호스트님의 숙소 현황을 확인해보세요!</p>
      <div className="tab-container">
        <button
          className={`tab-button ${selectedTab === "운영중" ? "active" : ""}`}
          onClick={() => setSelectedTab("운영중")}
        >
          운영중인 숙소
        </button>
        <button
          className={`tab-button ${selectedTab === "등록 승인 대기중" ? "active" : ""}`}
          onClick={() => setSelectedTab("등록 승인 대기중")}
        >
          등록 승인 대기중
        </button>
        {/* <button
          className={`tab-button ${selectedTab === "삭제 승인 대기중" ? "active" : ""}`}
          onClick={() => setSelectedTab("삭제 승인 대기중")}
        >
          삭제 승인 대기중
        </button> */}
        <button className="register-button" onClick={handleRegisterClick}>
          숙소 등록
        </button>
      </div>
      <div className="accommodation-list">
        {originalList.map((accommodations, index) => accommodations.applyStatus && selectedTab === '운영중'?(
          <AccommodationCard key={index} accommodations={accommodations} />
        ): accommodations.applyStatus === false && selectedTab === '등록 승인 대기중' ?
        <AccommodationCard key={index} accommodations={accommodations} />:''
        )}
      </div>
      <PaginationFunction
        totalItems={filteredAccommodations.length}
        itemsPerPage={2}
        currentPage={1}
        onPageChange={(page: number) => {
          console.log(`Page changed to: ${page}`);
        }}
      />
    </div>
  );
};

type AccommodationCardProps = {
  accommodations: MyAccommodation;
};


const AccommodationCard: React.FC<AccommodationCardProps> = ({ accommodations }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/mypagehost/accommodations/showDetailList");
  };

  const handleEdit = (name: string) => {
    navigate(`/mypagehost/accommodations/edit/${name}`);
  };

  const handleDelete = (name: string) => {
    if (window.confirm("정말로 이 숙소를 삭제하시겠습니까?")) {
      console.log(`숙소 ${name} 삭제`);
    }
  };

  return (
    <div id="accommodation-card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <div className="card-date">{accommodations.entryTime}</div>
      <div className="card-content">
        <img src={accommodations.accommodationMainImage} alt="Accommodation" className="card-image" />
        <div className="card-info">
          <div className="card-header">
            <span className="status-tag">
              {accommodations.applyStatus ? "운영중" : "등록 승인 대기중"}
            </span>
          </div>
          <h3 className="room-name">{accommodations.accommodationName}</h3>
        </div>
        <div className="card-actions">
          <button
            className="edit-button"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(accommodations.accommodationName);
            }}
          >
            수정
          </button>
          <button
            className="delete-button"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(accommodations.accommodationName);
            }}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export function MyAccommodationManagement() {
  return (
    <>
      
      <div className="test">
        <div id="host-accommodation-register-wrapper">
          <AccommodationManagementPage />
        </div>
      </div>
    </>
  );
}
