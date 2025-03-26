import "./style.css";
import Topbar from "src/component/topbar";
import ReviewList from "./bottom";
import FacilitiesCard from "./middle/facilities";
import Map from "./middle/navermap";
import RoomList from "./middle/roomlist";
import AccommodationDetailTop from "./top";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useCookies } from "react-cookie";
import { GUEST_ACCESS_TOKEN } from "src/constants";
import { getAccommodationDetailRequest } from "src/apis";
import { ResponseDto } from "src/apis/guestmypage";
import GetAccommodationResponseDto from "src/apis/hostmypage/dto/response/GetAccommodationResponseDto";
import { useSearchParams } from "react-router-dom";

export default function DetailList() {

  const { accommodationName } = useParams();
  const [searchParams] = useSearchParams();

  const [cookies] = useCookies();
  const [accommodation, setAccommodation] = useState<GetAccommodationResponseDto>();

  // const guestAccessToken = cookies[GUEST_ACCESS_TOKEN];

  const latitude = 37.7749; // 임의의 위도 값
  const longitude = -122.4194; // 임의의 경도 값
  const accommodationAddress = "부산광역시 부산진구 중앙대로 668 에이원프라자 빌딩 4층";

  // function: get accommodation detail list response 처리 함수 //
  const getAccommodaitonResponse = (responseBody:  GetAccommodationResponseDto | ResponseDto | null) =>{
    const message = 
        !responseBody ? '서버에 문제가 있습니다. ':
        responseBody.code === 'AF' ? '잘못된 접근입니다. ':
        responseBody.code === 'NR' ? '객실이 존재하지 않습니다. ':
        responseBody.code === 'DBE' ? '서버에 문제가있습니다. ': '';
        
        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        };
        const accommodation = responseBody as GetAccommodationResponseDto;
        setAccommodation(accommodation);
  }

  useEffect(() => {
    const guestAceessToken = cookies[GUEST_ACCESS_TOKEN];
      if (!guestAceessToken || !accommodationName) return;
      
      const checkInDay = searchParams.get("start") as string;
      const checkOutDay = searchParams.get("end")as string;
      getAccommodationDetailRequest(accommodationName,checkInDay,checkOutDay,guestAceessToken).then(getAccommodaitonResponse);

  }, [accommodationName])

  if (!accommodation) return null;
  
  return (
    <>
      <div id="accommodation-detail-list-wrapper">
        
        <Topbar />

        {/* AccommodationDetailTop 컴포넌트 */}
        <AccommodationDetailTop accommodation={accommodation}/>

       {/* RoomList 컴포넌트 */}
        <div className="middle-wrapper">
          <RoomList accommodation={accommodation} />
        </div>

        {/* FacilitiesCard 컴포넌트 */}
          <FacilitiesCard />

        {/* Map 컴포넌트 */}
          <Map
            accommodationAddress={accommodationAddress}
            latitude={latitude}
            longitude={longitude}
          />

        {/* ReviewList 컴포넌트 */}
          <ReviewList />

      </div>
      {/* <Bottombar/> */}
    </>
  );
}
