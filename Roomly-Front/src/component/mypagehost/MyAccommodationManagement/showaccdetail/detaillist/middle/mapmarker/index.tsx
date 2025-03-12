import './style.css';

import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface MarkerData {
  id: number;
  latitude: number;
  longitude: number;
  label: string;
}

interface MapWithMarkersProps {
  markers: MarkerData[];
}

const MapWithMarkers: React.FC<MapWithMarkersProps> = ({ markers }) => {
  // 기본 지도 설정
  const mapContainerStyle = { width: '100%', height: '400px' };
  const defaultCenter = { lat: markers[0]?.latitude || 0, lng: markers[0]?.longitude || 0 }; // 마커 중 첫 번째 위치를 중심으로 설정

  return (
    <LoadScript googleMapsApiKey="AIzaSyCqPhfzQDCxqzMIJNBeMTJuzJ9o71CqRM4">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={10}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            label={{
                text: marker.label,
                color: "black",
                fontSize: "14px",
                fontWeight: "bold"
              }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapWithMarkers;
