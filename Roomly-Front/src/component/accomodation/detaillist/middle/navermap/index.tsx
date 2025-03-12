import React from 'react';
import './style.css';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface MapProps {
  accommodationAddress: string;
  latitude: number;
  longitude: number;
}

const Map: React.FC<MapProps> = ({ latitude, longitude, accommodationAddress }) => {
  // 주소 복사 기능
  const copyToClipboard = () => {
    navigator.clipboard.writeText(accommodationAddress).then(() => {
      alert('주소가 복사되었습니다.');
    }).catch((err) => {
      console.error('주소 복사 실패:', err);
    });
  };
  
  return (
    <div id='room-detail-map-wrapper'>
      <div className='map-title'>위치</div>
      <LoadScript googleMapsApiKey="AIzaSyCqPhfzQDCxqzMIJNBeMTJuzJ9o71CqRM4">
        <GoogleMap 
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={{ lat: latitude, lng: longitude }}
          zoom={15}
        >
          <Marker 
            position={{ lat: latitude, lng: longitude }}
            label={{
              text: accommodationAddress,
              color: "#FBBC04",
              fontWeight: "bold",
            }}
          />
        </GoogleMap>
      </LoadScript>
      <div className='address-container'>
      <div>{accommodationAddress}</div>
      <button className='address-copy-button' onClick={copyToClipboard}>주소복사</button>
      </div>
    </div>
  );
};

export default Map;
