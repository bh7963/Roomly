import DetailList from "src/component/accomodation/detaillist";
import "./style.css";
import React, { useEffect, useState } from 'react'
import GetAccommodationResponseDto from "src/apis/hostmypage/dto/response/GetAccommodationResponseDto";
import { GUEST_ACCESS_TOKEN } from "src/constants";
import { HOST_ACCESS_TOKEN } from "src/constants";
import { ResponseDto } from "src/apis/hostmypage";
import { useCookies } from "react-cookie";
import { getAccommodationDetailRequest } from "src/apis";
import { GetAccommodationDetailListResponseDto } from "src/apis/hostmypage/dto/response/get-accommodation-detail-list.response.dto";



export default function AccommodationDetailList() {

  // state: 백엔드에서 불러온 숙소 상세 리스트 데이터를 저장할 상태 //
  const [callAccommodationDetail, setCallAccommodationDetail] = useState<GetAccommodationResponseDto[]>([]);
  
  const [error, setError] = useState<string | null>(null);
  // state: 쿠키 상태 //
  const [cookies, setCookie] = useCookies();

    // function: get accommodation detail list response 처리 함수 //
    const getAccommodaitonListResponse = (responseBody:  GetAccommodationDetailListResponseDto | ResponseDto | null) =>{
      const message = 
          !responseBody ? '서버에 문제가 있습니다. ':
          responseBody.code === 'AF' ? '잘못된 접근입니다. ':
          responseBody.code === 'DBE' ? '서버에 문제가있습니다. ': '';
          const isSuccessed = responseBody !== null && responseBody.code === 'SU';
          if (!isSuccessed) {
              alert(message);
              return;
          };
          const { accommodationsDetail } = responseBody as GetAccommodationDetailListResponseDto;
          setCallAccommodationDetail(accommodationsDetail);
    }
  return (
    <div>
        <DetailList/>
    </div>
  )
}
