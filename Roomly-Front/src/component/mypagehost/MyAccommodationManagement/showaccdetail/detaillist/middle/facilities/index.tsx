import React from 'react';
import './style.css';

export default function FacilitiesCard() {
  return (
    <>
    <div>서비스 및 부대시설</div>
    <div className="facilities-card">
      <div className="facility-item">
        <span className="facility-icon dog-icon" /> 애견 동반
      </div>
      <div className="facility-item">
        <span className="facility-icon smoke-free-icon" /> 금연 객실
      </div>
      <div className="facility-item">
        <span className="facility-icon spa-icon" /> 실내 스파
      </div>
      <div className="facility-item">
        <span className="facility-icon bbq-icon" /> 바베큐 가능
      </div>
      <div className="facility-item">
        <span className="facility-icon wifi-icon" /> 와이파이
      </div>
      <div className="facility-item">
        <span className="facility-icon parking-icon" /> 주차시설
      </div>
      <div className="facility-item">
        <span className="facility-icon pool-icon" /> 수영장
      </div>
    </div>
    </>
  );
}
