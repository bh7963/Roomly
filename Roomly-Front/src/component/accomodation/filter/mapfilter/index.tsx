import React from 'react'
import './style.css';

import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { GoogleMap } from '@react-google-maps/api';

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

export default function MapFilter() {
  return (
    <div id='map-wrapper'>
    <div className='map-filter'>
      <button>
        지도 보기
      </button>
      <Wrapper apiKey="AIzaSyCqPhfzQDCxqzMIJNBeMTJuzJ9o71CqRM4" render={render} libraries={['marker']}/>
      </div>
      </div>
  )
}
