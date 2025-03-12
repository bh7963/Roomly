import "./style.css";
import React, { useEffect, useState } from 'react';
import Topbar from "src/component/topbar";

// import { AdminRequestDTO } from "src/apis/admin/dto/request";
import { useNavigate } from "react-router";
import GetHostListResponseDto from "src/apis/admin/dto/response/get-host-list-response.dto";
import Host from "src/types/admin/host.interface";
export interface AdminRequestProps {
  req: Host[];
}


const Accommodationenrollmentapproval: React.FC = () => {
  const [requests, setRequests] = useState<Host[]>([]);
  const [pendingSortOrder, setPendingSortOrder] = useState<'latest' | 'oldest'>('latest');
  const [approvedSortOrder, setApprovedSortOrder] = useState<'latest' | 'oldest'>('latest');
  const navigate = useNavigate(); 




  // 테스트 완료 후 삭제 예정
  const mockData: Host[] = [
    {
      hostId: "host456",
      hostName: "김민수",
      hostTelNumber: "01012341234",
      entryStatus: false
    },
    {
      hostId: "qwer1234",
      hostName: "안성재",
      hostTelNumber: "01012123232",
      entryStatus: false
    },
    {
      hostId: "host456",
      hostName: "김말자",
      hostTelNumber: "01099998888",
      entryStatus: false
    }
  ];
  

  // function: 호스트 승인 요청 리스트 불러오기 함수 //


  // 상태 변경 함수
  const toggleApprovalStatus = (hostId: string) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.hostId === hostId
          ? { ...req, status: req.entryStatus === false ? 'approved' : 'pending' }
          : req
      )
    );
  };

  // ! 정렬 함수 날짜 말고 호스트명 가나다 순으로 수정 필요 
  // const sortRequests = (requests: AdminRequestDTO[], order: 'latest' | 'oldest') => {
  //   return [...requests].sort((a, b) => {
  //     const dateA = new Date(a.accommodationName);
  //     const dateB = new Date(b.accommodationName);
  //     return order === 'latest' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
  //   });
  // };

  // useEffect(() => {
    // api 호출 자리
     // 일단 테스트 용으로 가짜 데이터를 설정
  // setRequests(mockData);
  // }, []);

  // const pendingRequests = sortRequests(
  //   requests.filter((req) => req.status === 'pending'),
  //   pendingSortOrder
  // );

  // const approvedRequests = sortRequests(
  //   requests.filter((req) => req.status === 'approved'),
  //   approvedSortOrder
  // );

  return (
    <div className="page-container">
      <Topbar />
      <h1>숙소 등록 요청 관리자 페이지</h1>

      <h2>대기 중 요청</h2>
      <div className="sort-container">
        <label className="sort-label">분류:</label>
        <select
          value={pendingSortOrder}
          onChange={(e) => setPendingSortOrder(e.target.value as 'latest' | 'oldest')}
          className="sort-select"
        >
          <option value="latest">최신순</option>
          <option value="oldest">오래된 순</option>
        </select>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>요청 일자</th>
            <th>호스트 ID</th>
            <th>숙소명</th>
            <th>상태</th>
            <th>요청 상세 보기</th>
          </tr>
        </thead>
        <tbody>
          {pendingRequests.map((request) => (
            <tr key={request.hostId}>
              <td>{request.requestDate}</td>
              <td>{request.accommodationName}</td>
              <td>{request.hostId}</td>
              <td>
                <span className="status-badge in-progress">대기 중</span>
              </td>
              <td>
                <button
                 onClick={() => navigate('/mypagehost/accommodations/register')}
                  className="action-button approve"
                >
                  숙소 정보 보기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>승인 완료</h2>
      <div className="sort-container">
        <label className="sort-label">분류:</label>
        <select
          value={approvedSortOrder}
          onChange={(e) => setApprovedSortOrder(e.target.value as 'latest' | 'oldest')}
          className="sort-select"
        >
          <option value="latest">최신순</option>
          <option value="oldest">오래된 순</option>
        </select>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>요청 일자</th>
            <th>호스트 Id</th>
            <th>숙소명</th>
            <th>상태</th>
            <th>요청 상세 보기</th>
          </tr>
        </thead>
        <tbody>
          {approvedRequests.map((request) => (
            <tr key={request.hostId}>
              <td>{request.requestDate}</td>
              <td>{request.accommodationName}</td>
              <td>{request.hostId}</td>
              <td>
                <span className="status-badge done">승인 완료</span>
              </td>
              <td>
                <button
                  onClick={() => toggleApprovalStatus(request.hostId)}
                  className="action-button cancel"
                >
                  숙소 정보 보기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Accommodationenrollmentapproval;
