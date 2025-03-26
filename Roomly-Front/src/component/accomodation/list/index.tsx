import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./style.css";
import { GUEST_ACCESS_TOKEN, ACCOMMODATION_LIST_DETAIL_PATH, HOST_ACCESS_TOKEN, ACCOMMODATION_LIST_PATH } from "src/constants";
import { getAccommodationListRequest } from "src/apis";
import { useCookies } from "react-cookie";


import { Accommodations } from "src/types";
import { GetAccommodationListResponseDto } from "src/apis/hostmypage/dto/response/get-accommodation-list.response.dto";
import { useFilterStore } from "src/stores";
import { ResponseDto } from "src/apis/guestmypage";
import AccommodationDetailList from "src/views/accommodationlist";

const List = () => {
  
  const originalAallAccommodationListRef = useRef<Accommodations[]>([]);
  // state: 숙소 리스트 불러오기 상태 관리
  const [callAccommodationList, SetCallAccommodationList] = useState<Accommodations[]>([]);

  // variable: 승인된 숙소 갯수 //
  const trueApplyStatusCount =  callAccommodationList.filter(accommodation => accommodation.applyStatus).length;

  // state: 필터 상태 //
  const {priceRange, setPriceRange} = useFilterStore();
  const {reviewScore, setReviewScore} = useFilterStore();
  const {accommodationType, setAccommodationType} = useFilterStore();
  const {categoryArea, setCategoryArea} = useFilterStore();
  const {facilities, setFacilities} = useFilterStore();

  // state: url 값 저장 //
  const [searchParams] = useSearchParams("");

  // state: 북마크 상태 관리 //
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  // state: 쿠키 상태 //
  const [cookies] = useCookies();
  
  // state: 이미지 상태 //
  const [accommodationMainImage, setAccommodationMainImage] = useState<string[]>([]);

  const handleBookmarkToggle = (accommodationName: string) => {
    if (bookmarks.includes(accommodationName)) {
      setBookmarks(
        bookmarks.filter((bookmarkedId) => bookmarkedId !== accommodationName)
      );
    } else {
      setBookmarks([...bookmarks, accommodationName]);
    }
  };

  // function: get accommodation list response 처리 함수 //
  const getAccommodaitonListResponse = (responseBody: GetAccommodationListResponseDto | ResponseDto | null) =>{
    const message = 
        !responseBody ? '서버에 문제가 있습니다. ':
        responseBody.code === 'AF' ? '잘못된 접근입니다. ':
        responseBody.code === 'DBE' ? '서버에 문제가있습니다. ': '';
        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        };
        const { accommodations } = responseBody as GetAccommodationListResponseDto;

        SetCallAccommodationList(accommodations);
        originalAallAccommodationListRef.current = accommodations;
  }

  // Effect: 백엔드에서 숙소 리스트 데이터 요청 //
  useEffect(() => {
    const guestAccessToken = cookies[GUEST_ACCESS_TOKEN];
    
    if (!guestAccessToken) return;
    if (!urlRegion) return;
    getAccommodationListRequest(urlRegion, guestAccessToken).then(getAccommodaitonListResponse);

  }, []);

  useEffect(() => {
    let callAccommodationList = [...originalAallAccommodationListRef.current];

    callAccommodationList = callAccommodationList.filter(item => item.minRoomPrice >= priceRange.min && item.minRoomPrice <= priceRange.max);

    if (accommodationType.length)
      callAccommodationList = callAccommodationList.filter(item => accommodationType.includes(item.accommodationType));

    if (categoryArea.length)
      callAccommodationList = callAccommodationList.filter(item => categoryArea.includes(item.categoryArea));

    if (facilities.length) {
      const wifi = facilities.includes('무료 와이파이');
      const park = facilities.includes('주차장');
      const pool = facilities.includes('수영장');
      const pet = facilities.includes('펫 동반 가능');
      const noSmoking = facilities.includes('금연 객실');
      const spa = facilities.includes('실내 스파');
      const bbq = facilities.includes('바베큐');
      callAccommodationList = callAccommodationList.filter(item =>
        wifi ? item.categoryWifi : 
        park ? item.categoryCarPark : 
        pool ? item.categoryPool : 
        pet ? item.categoryPet : 
        noSmoking ? item.categoryNonSmokingArea : 
        spa ? item.categoryIndoorSpa : 
        bbq ? item.categoryDinnerParty : false
      )
    }
      

    SetCallAccommodationList(callAccommodationList);


  }, [priceRange, reviewScore, accommodationType, categoryArea, facilities]);


  // function: url 값 가져오기 //
  const urlRegion = searchParams.get("Region");
  const urlStart = searchParams.get("start");
  const urlEnd = searchParams.get("end");
  const urlCount = searchParams.get("count");
  const urlName = searchParams.get("accommodationName");

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: 리뷰 평점 시각화 //
  const visualReviewGrade = (rating:number) =>{
    return '⭐'.repeat(Math.round(rating))
  }

  // event handler: 숙소 클릭 시 숙소 디테일 페이지로 이동하는 핸들러 //
  const handleDetailClick = (accommodationName: string) => {
    navigator(`${ACCOMMODATION_LIST_PATH}/detail/${accommodationName}?Region=${urlRegion}&start=${urlStart}&end=${urlEnd}&count=${urlCount}`)
  };

  // function: 각 숙소의 시설 정보를 문자열로 변환하는 함수 //
  const getFacilities = (accommodations: Accommodations) => {
    const facilities = [];
    if (accommodations.categoryPet) facilities.push("애완동물 허용");
    if (accommodations.categoryNonSmokingArea) facilities.push("금연 구역");
    if (accommodations.categoryIndoorSpa) facilities.push("실내 스파");
    if (accommodations.categoryDinnerParty) facilities.push("저녁 파티 가능");
    if (accommodations.categoryWifi) facilities.push("와이파이");
    if (accommodations.categoryCarPark) facilities.push("주차 공간");
    if (accommodations.categoryPool) facilities.push("수영장");
  
    // 텍스트로만 점 구분자 결합하여 반환
    return facilities.join(" · ");
  };

  return (
        
    <div id="accommodation-search-list">
      <div className="list-header">
        <div className="search-length-result">{trueApplyStatusCount}개의 검색 결과가 있습니다.</div>
        <div className="sort-dropdown">
          <label htmlFor="sortOptions"></label>
        </div>
      </div>

      {/* 검색 결과가 없을 때 메시지를 표시 */}
      
      {callAccommodationList.length !== 0 ? (
        <div className="accommodation-cards-container">
          
        {callAccommodationList.map((accommodations) => accommodations.applyStatus ?(
          <div
            key={accommodations.accommodationName}
            className="accommodation-cards"
            onClick={() => handleDetailClick(accommodations.accommodationName)}
          >
            <div className="image-wrapper">
              <img
                src={`${accommodations.accommodationMainImage}`}
                alt={accommodations.accommodationName}
                className="accommodation-image"
              />
              <div className="accommodation-image" style={{backgroundImage:`url(${accommodations.accommodationMainImage})`}} />
              <div className={`bookmark ${bookmarks.includes(accommodations.accommodationName)? "active": ""}`}onClick={() => handleBookmarkToggle(accommodations.accommodationName)}>
                ♥
              </div>
            </div>
            <div id="accommodation-info">
              <div className="type-area-container">
              <div className="type">{accommodations.accommodationType}</div>
              <div className="divider-bar-type-area">|</div>
              <div className="category-area">{accommodations.categoryArea}</div>
              </div>
              <div className="name">{accommodations.accommodationName}</div>
              <div className="fake-stars">{visualReviewGrade(accommodations.accommodationGradeAverage)}</div>

              <div className="category-facilities">{getFacilities(accommodations)}</div>

            </div>
            <div className="divider-bar"></div>
              {/* 최저 객실 가격 표시 */}
              <div className="accommodation-price-container">
                <div className="price-box">
                  <div className="min-price">{accommodations.minRoomPrice}~</div>
                  <div className="won">원</div>
                  <div className="per-one-day">/박</div>
                </div>
                <div className="rating-box">
                  <div className="rating"> {accommodations.accommodationGradeAverage}</div>
                  <div className="rating-per-score">/5</div>
                </div>
              <div className="review">{accommodations.countReview}개의 리뷰</div>
              <button className="show-detail-btn" onClick={() => handleDetailClick(accommodations.accommodationName)}>
                상세보기
              </button>
            </div>
          </div>
        ) : ('')
      )}
    </div>
  ) : (
    <div className="no-results">
      <p>선택한 조건에 맞는 상품이 없어요.</p>
      <p>필터를 다시 설정해 보세요.</p>
    </div>
  )}

      {/* Pagination 컴포넌트 */}

    </div>
  
  );
};

export default List;
