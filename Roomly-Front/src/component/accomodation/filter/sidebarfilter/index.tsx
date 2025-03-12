import React, { useState } from "react";

import "./style.css";
import RangeSlider from "./priceRagebar";
import { useFilterStore } from "src/stores";

interface SidebarProps  {
  resetFilters: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ resetFilters }) => {
  // 필터 상태 정의
  const {reviewScore, setReviewScore} = useFilterStore();
  const {accommodationType, setAccommodationType} = useFilterStore();
  const {categoryArea, setCategoryArea} = useFilterStore();
  const {facilities, setFacilities} = useFilterStore();
  const [showAllAreas, setShowAllAreas] = useState(false);
  
  // const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  // const [reviewScore, setReviewScore] = useState<boolean[]>([false, false, false, false, false]);
  // const [accommodationType, setAccommodationType] = useState<boolean[]>([false, false, false]);
  // const [categoryArea, setCategoryArea] = useState<string[]>([]);
  // const [showAllAreas, setShowAllAreas] = useState(false);
  // const [facilities, setFacilities] = useState<string[]>([]);

  return (
    <aside id="sidebar">
      <div className="filter-header">
        <div className="filter-title-box">
          <div className="mini-bar"></div>
          <div className="filter-title">FILTER BY</div>
        </div>

        <div className="reset-box">
          <div className="reset">검색 초기화</div>
          <button className="reset-btn" onClick={resetFilters}></button>
        </div>
      </div>


     {/* 가격 필터 */}
     <div className="filter-section">
        <div className="filter-price-box">
          <div className="filter-price-title-box">
            <div className="filter-categories-title">Filter Price</div>
            <div className="filter-price-title-second">/ 1박 기준</div>
          </div>

        {/* 레인지 바*/}
        <RangeSlider />
        </div>
      </div>

  {/* 리뷰 점수 필터 */}
  <div className="filter-section">
        <div className="filter-section-box">
        <div className="filter-categories-title">리뷰</div>
        <ul className="star">

          {["★★★★★", "★★★★", "★★★", "★★", "★"].map((label, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={reviewScore[index]}
                onChange={() => {
                  const updatedScores = [...reviewScore];
                  updatedScores[index] = !updatedScores[index];
                  setReviewScore(updatedScores);
                }}
              />
              {label}
            </li>
          ))}
        </ul>
      </div>
      </div>

      {/* 숙소 유형 필터 */}
      <div className="filter-section">
      <div className="filter-section-box">
        <div className="filter-categories-title">숙소 유형</div>
        <ul>
          {["호텔", "펜션", "리조트"].map((label, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={accommodationType.includes(label)}
                onChange={() => {
                  if (accommodationType.includes(label)) {
                    const newAccommodationType = accommodationType.filter(item => item !== label);
                    setAccommodationType(newAccommodationType);
                  } else {
                    setAccommodationType([...accommodationType, label]);
                  }
                }}
              />
              {label}
            </li>
          ))}
        </ul>
      </div>
      </div>

    {/* 지역 카테고리 필터 */}
    <div className="filter-section">
        <div className="filter-section-box">
          <div className="filter-categories-title">지역</div>

        <ul>
          {["제주도", "서울", "부산", "경주", ...(showAllAreas ? ["강릉", "인천", "가평", "여수", "속초"] : [])].map((label) => (
            <li key={label}>
              <input
                type="checkbox"
                checked={categoryArea.includes(label)}
                onChange={() => {
                  const updatedAreas = categoryArea.includes(label)
                    ? categoryArea.filter((area) => area !== label)
                    : [...categoryArea, label];
                  setCategoryArea(updatedAreas);
                }}
              />
              {label}
            </li>
          ))}
        </ul>
        <div className="button-wrapper">
          <div className={showAllAreas ? "arrow-up" : "arrow-down"}></div>
          <button className="show-all-button" onClick={() => setShowAllAreas(!showAllAreas)}>
            {showAllAreas ? "숨기기" : "더 보기"}
          </button>
          </div>
          </div>
      </div>

      {/* 시설 필터 */}
      <div className="filter-section">
      <div className="filter-section-box">
        <div className="filter-categories-title">부대 시설</div>

        <ul>
          {["무료 와이파이", "주차장", "수영장", "펫 동반 가능", "금연 객실", "실내 스파", "바베큐"].map((label) => (
            <li key={label}>
              <input
                type="checkbox"
                checked={facilities.includes(label)}
                onChange={() => {
                  const updatedFacilities = facilities.includes(label)
                    ? facilities.filter((f) => f !== label)
                    : [...facilities, label];
                  setFacilities(updatedFacilities);
                }}
              />
              {label}
            </li>
          ))}
        </ul>
      </div>
      </div>
    </aside>
  );
};

export default Sidebar;
