import React, { useEffect } from 'react'
import './style.css';
import RoomList from './roomlist'
import { RoomDTO } from 'src/apis/accommodation/dto/request/room.request.dto';
import FacilitiesCard from './facilities';

import Map from './navermap';
import MapWithMarkers from './mapmarker';
import {Status, Wrapper} from "@googlemaps/react-wrapper";
import GoogleMap from './googlemap';


const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <>로딩중...</>;
    case Status.FAILURE:
      return <>에러 발생</>;
    case Status.SUCCESS:
      return <GoogleMap/>;
  }
};

const mockRoomsData: RoomDTO[] = [
  {
    roomName: "Deluxe Room",
    description: "Spacious suite with a beautiful city view, free WiFi, and complimentary breakfast.",
    checkInTime: "14:00",
    checkOutTime: "11:00",
    maxOccupancy: 4,
    roomPrice: 150000,
    images: [
      "Best-Western-Plus-Congress-Hotel-4-800x600.jpg",
      "https://example.com/images/deluxe-room2.jpg"
    ]
  },
  {
    roomName: "suite Room",
    description: "가족 단위로 오기 좋은 넓은 스위트 패밀리 객실.",
    checkInTime: "15:00",
    checkOutTime: "10:00",
    maxOccupancy: 4,
    roomPrice: 200000,
    images: [
      "Best-Western-Plus-Congress-Hotel-4-800x600.jpg",
      "https://example.com/images/deluxe-room2.jpg"
    ]
  },
];

const markersData = [
  { id: 1, latitude: 37.7749, longitude: -122.4194, label: 'San Francisco' },
  { id: 2, latitude: 34.0522, longitude: -118.2437, label: 'Los Angeles' },
  { id: 3, latitude: 36.1699, longitude: -115.1398, label: 'Las Vegas' },
];


  


const AccommodationHostDetailMiddle: React.FC = (AccommodaitonProps) => {

  useEffect(()=>{

    
  },[])

  const latitude = 37.7749; // 임의의 위도 값
  const longitude = -122.4194; // 임의의 경도 값
  const accommodationAddress = '부산광역시 부산진구 중앙대로 668 에이원프라자 빌딩 4층'
  
  return (
    <div className='middle-wrapper'>
      <RoomList roomsData={mockRoomsData} />
      <FacilitiesCard/>
      <Map latitude={latitude} longitude={longitude} accommodationAddress={accommodationAddress} />
      <MapWithMarkers markers={markersData} />
      <Wrapper apiKey="AIzaSyCqPhfzQDCxqzMIJNBeMTJuzJ9o71CqRM4" render={render} libraries={['marker']}/>
  

    </div>
  )
}

export default AccommodationHostDetailMiddle

