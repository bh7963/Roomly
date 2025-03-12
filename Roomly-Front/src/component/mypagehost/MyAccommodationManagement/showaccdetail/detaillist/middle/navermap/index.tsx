import React from 'react';
import './style.css';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface MapProps {
  accommodationAddress: string;
  latitude: number;
  longitude: number;
}

const Map: React.FC<MapProps> = ({ latitude, longitude, accommodationAddress }) => {
  return (
    <>
      <h3>위치</h3>
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
      <div>{accommodationAddress}</div>
      <button>주소복사</button>
    </>
  );
};

export default Map;
