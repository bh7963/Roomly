import "./style.css";
import React, { useEffect, useState } from 'react';
import Topbar from "src/component/topbar";

import Modal from 'react-modal';

// import { fetchAdminHostApprovalRequests, fetchHostApprovaRequestDetail } from "src/apis/admin";
import GetHostListResponseDto from "src/apis/admin/dto/response/get-host-list-response.dto";

import Host from "src/types/admin/host.interface";
import { fetchHostApprovaRequestDetail, getHostListRequest } from "src/apis/admin";
import { ResponseDto } from "src/apis/guestmypage";



export default function HostList() {
  
  // 디테일 불러올 상태 {누나가 한 부분}
  // const [detailrequests, setDetailRequests] = useState<HostEnrollmentResponseDetailDto>();
  const [pendingSortOrder, setPendingSortOrder] = useState<'latest' | 'oldest'>('latest');
  // const [approvedSortOrder, setApprovedSortOrder] = useState<'latest' | 'oldest'>('latest');
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedRequest, setSelectedRequest] = useState<HostEnrollmentResponseDetailDto | null>(null);
  
  // state: 백엔드에서 불러온 hostList 데이터를 저장할 상태 //
  const [ originalList, setOriginalList] = useState<Host[]>([]);

  const getHostResponse = (responseBody: GetHostListResponseDto | ResponseDto | null) => {
    

    const { hostList } = responseBody as GetHostListResponseDto;
    
    setOriginalList(hostList);
  }
  useEffect(()=>{

    getHostListRequest().then(getHostResponse)
  },[])

      const mockData:  Host[]  = [
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


  // function: 호스트 계정 승인 리스트 api 호출 //
  // const fetchRequests = async () => {
  //   try {
  //     const data = await fetchAdminHostApprovalRequests(); 
  //     setRequests(data);
  //   } catch (error) {
  //     console.error('Error fetching approval requests:', error);
  //   }
  // };

  // useEffect(() => {
    // fetchRequests();
    // setRequests(mockData)
  // }, []);

//  function: 모달 오픈 시 특정 호스트 승인 요청 디테일 정보 api 호출 //
// const openModal = async (hostId: string) => {
//   try {
//     const data = await fetchHostApprovaRequestDetail(hostId);
//     setSelectedRequest(data);  // 모달에 표시할 데이터를 설정
//     setIsModalOpen(true);      // 모달 열기
//   } catch (error) {
//     console.error('Error fetching host enrollment request detail:', error);
//   }
// };



  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   setSelectedRequest(null);
  // };

  // const handleApproval = () => {
  //   if (window.confirm("정말로 승인하시겠습니까?")) {
  //     alert("승인에 성공하였습니다.");
  //     if (selectedRequest) {
  //       // 승인된 요청의 상태를 "approved"로 업데이트
  //       setRequests((prevRequests) =>
  //         prevRequests.map((req) =>
  //           req.hostId === selectedRequest.hostId
  //             ? { ...req, status: "approved" }
  //             : req
  //         )
  //       );
  //     }
  //     closeModal();
  //   }
  // };

  return (
    <div className="page-container">
      <Topbar />
      <h1>호스트 계정 요청 승인 페이지</h1>

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
            <th>호스트 이름</th>
            <th>호스트 ID</th>
            <th>전화번호</th>
            <th>상태</th>
            {/* <th>사업자 정보 보기</th> */}
          </tr>
        </thead>
        <tbody>
          {
            originalList.map((request) => request.entryStatus === false &&(
              <tr key={request.hostId}>
                <td>{request.hostId}</td>
                <td>{request.hostName}</td>
                <td>{request.hostTelNumber}</td>
                <td><span className="status-badge in-progress" >{request.entryStatus} 대기 중</span></td>
                <td>
                {/* <button onClick={() => openModal(request.hostId)} className="action-button approve">
                    상세 보기
                </button> */}
                </td>
              </tr>
          ))}
        </tbody>
      </table>

      <h2>승인 완료 요청</h2>
      <div className="sort-container">
        <label className="sort-label">분류:</label>
        <select
          // value={approvedSortOrder}
          // onChange={(e) => setApprovedSortOrder(e.target.value as 'latest' | 'oldest')}
          className="sort-select"
        >
          <option value="latest">최신순</option>
          <option value="oldest">오래된 순</option>
        </select>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>호스트 이름</th>
            <th>호스트 ID</th>
            <th>전화번호</th>
            <th>상태</th>
            {/* <th>사업자 정보 보기</th> */}
          </tr>
        </thead>
        <tbody>
          {
            originalList.map((request) => request.entryStatus === true &&(
              <tr key={request.hostId}>
                <td>{request.hostId}</td>
                <td>{request.hostName}</td>
                <td>{request.hostTelNumber}</td>
                <td><span className="status-badge approved">{request.entryStatus} 승인 완료</span></td>
                <td>
                {/* <button onClick={() => openModal(request.hostId)} className="action-button approve">
                  상세 보기
                </button> */}
                </td>
              </tr>
          ))}
        </tbody>
      </table>

      {/* 모달 */}
      {/* <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="사업자 정보 모달"
        className="modal"
        overlayClassName="modal-overlay"
      > */}
        {/* {selectedRequest && (
          <div className="modal-content">
            <h2>{selectedRequest.hostName}님의 사업자 정보</h2>
            <p>대표자 명: {selectedRequest.ownerName}</p>
            <p>호스트 ID: {selectedRequest.hostId}</p>
            <p>호스트 전화번호: {selectedRequest.hostTelNumber}</p>
            <p>개업 일자: {selectedRequest.businessOpenDay}</p>
            <p>사업자 번호: {selectedRequest.businessLicenseNumber}</p>
            <div>
              <h3>사업자 등록증</h3>
              <img src={selectedRequest.businessLicenseImg} alt="사업자 등록증" className="license-image" />
            </div>
            <button onClick={handleApproval} className="action-button approve">승인</button>
            <button onClick={handleApproval} className="action-button reject">승인 거절</button>
            <button onClick={closeModal} className="action-button close">닫기</button>
          </div>
        )} */}
      {/* </Modal> */}
    </div>
  );
};
