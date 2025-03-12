import React, { useState, useRef } from "react";

import Modal from "react-modal";
import Slider from "react-slick";
import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GetAccommodationResponseDto from "src/apis/hostmypage/dto/response/GetAccommodationResponseDto";
import Room from "src/apis/hostmypage/dto/response/Room";

interface Props {
  accommodation: GetAccommodationResponseDto
}


// component :  숙소 상단 AccommodationDetailTopImages 컴포넌트 //
const AccommodationDetailTopImages = ({ accommodation }: Props) => {

  // state: TOP 숙소 상단 이미지 상태 //
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const sliderRef = useRef<Slider>(null);


  // function: 숙소 사진 슬라이더 함수 //
  const sliderSettings = {
    initialSlide: currentImage,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index: number) => setCurrentImage(index),
  };

  const handleImageClick = (index: number) => {
    setCurrentImage(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImage(index);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  
  return (
    <div id="image-container">
      <div className="large-image-container">
        <img
          src={accommodation.accommodationMainImage}
          alt="Main Accommodation"
          className="large-image"
          onClick={() => handleImageClick(0)}
        />
        <div className="large-image" style={{backgroundImage:`url(${accommodation.accommodationMainImage})`}}/>
      </div>

      {/* Small images in a 2x3 grid */}
      <div className="small-image-grid-container">
          {accommodation.accommodationMainImage.length > 4 && (
          <button className="button-box" onClick={() => setIsModalOpen(true)}>
            <div className="image-icon"></div>
            <div className="view-all-btn"> 전체보기 </div>
          </button>
        )}

        <div className="small-image-grid">
          {accommodation.accSubImages.slice(1, 5).map((image, index) => (
            // eslint-disable-next-line jsx-a11y/alt-text
            <img
              src={image}
              key={index}
              alt="sub Accommodation"
              className="small-image"
              onClick={() => handleImageClick(index + 1)}
            />
          ))}
        </div>
      </div>

      {/* 이미지 모달 */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Accommodation Images"
        className="modal"
        overlayClassName="overlay"
      >
        <button className='room-detail-modal-close-btn' onClick={closeModal}></button>
        <Slider {...sliderSettings} ref={sliderRef}>
          {accommodation.accSubImages.map((images, index) => (
            <div key={index}>
              <img
                src={images}
                alt={`Accommodation ${index + 1}`}
                className="large-modal-image"
              />
            </div>
          ))}
        </Slider>

        {/* Thumbnail navigation */}
        <div className="thumbnail-row">
          {accommodation.accSubImages.map((accSubImages, index) => (
            <img
              key={index}
              src={accSubImages}
              alt={`Thumbnail ${index + 1}`}
              className={`thumbnail-image ${
                currentImage === index ? "active" : ""
              }`}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>
      </Modal>
    </div>
  );
};


// interface: 숙소 디테일 상단 정보 카드 //
const AccommodationDetailTopCard = ({ accommodation }: Props) => {

  // state: 상단 시설 카드 모달 상태 관리 //
  const [isFacilityModalOpen, setIsFacilityModalOpen] = useState(false);

  // function: 부대시설 모달 열기 및 닫기 함수
  const openFacilityModal = () => setIsFacilityModalOpen(true);
  const closeFacilityModal = () => setIsFacilityModalOpen(false);

  const priceList = accommodation.roomList.map(item => item.roomPrice);
  const minPrice = Math.min(...priceList);

  return (
    <div id="accommodation-detail">
      <div className="header">
        <div className="title-section">
          <div className="accommodation-type-container">
            <div className="accommodation-type">{accommodation.accommodationType}</div>

            <div className="fake-stars">★★★★★</div>
          </div>
          <div className="accommodation-name">{accommodation.accommodationName}</div>
        </div>
        <div className="price-section">
          <div className="accommodation-price">{minPrice}원~ </div>
          <div className="price-per-night"> /1박</div>
        </div>
      </div>

      <div id="content" >
        <div className="review-section" >
          <div className="review-score-box">
            <div className="review-score">⭐ 9.7</div>
            <div className="heder-title">128개의 리뷰</div>
            <div className="right-arrow-icon-box">
              <button
                className="right-arrow-icon-button"
                
              ></button>
            </div>
          </div>

          <div className="review-snippet">숙소가 깨끗하고 정말 좋네요</div>
                </div>

        <div className="services-section" >
          <div className="heder-title-container">
          <div className="heder-title">서비스 및 부대시설</div>
          <button
            className="view-all-facilities-btn" onClick={openFacilityModal}
            ></button>
          </div>
          <div className="services">

              <span className="service-icon">{accommodation.categoryPet}</span>
              <span className="service-icon">{accommodation.categoryNonSmokingArea}</span>
              <span  className="service-icon">{accommodation.categoryIndoorSpa}</span>
              <span  className="service-icon">{accommodation.categoryDinnerParty}</span>
              <span className="service-icon">{accommodation.categoryWifi}</span>
              <span  className="service-icon">{accommodation.categoryCarPark}</span>
              <span  className="service-icon">{accommodation.categoryPool}</span>

          
          </div>
          {/* 부대시설 모달 */}
          <Modal
              isOpen={isFacilityModalOpen}
              onRequestClose={closeFacilityModal}
              contentLabel="Facility Information"
              className="facility-modal"
              overlayClassName="overlay"
            >
              <div className="facility-modal">
              <div id="facility-modal-close-box">
              <button className="facility-modal-close-btn" onClick={closeFacilityModal} ></button>
              <div className="facility-modal-title" >서비스 및 부대시설</div>
              </div>

              <div id="facility-icons-box">
              <div className="facility-icons">
              <span className="service-icon">{accommodation.categoryPet}</span>
              <span className="service-icon">{accommodation.categoryNonSmokingArea}</span>
              <span  className="service-icon">{accommodation.categoryIndoorSpa}</span>
              <span  className="service-icon">{accommodation.categoryDinnerParty}</span>
              <span className="service-icon">{accommodation.categoryWifi}</span>
              <span  className="service-icon">{accommodation.categoryCarPark}</span>
              <span  className="service-icon">{accommodation.categoryPool}</span>
              </div>
              </div>
              </div>
            
          </Modal>
        </div>

        <div className="location-section" >
          <div className="heder-title-container">
          <div className="heder-title">위치 정보</div>
          <div className="view-all-location-btn"></div>
          </div>
          <div className="address-container">
            <div className="address-icon"></div>
            <div className="accommodation-address">{accommodation.accommodationAddress}</div>
          </div>
          <button className="show-map-detail-button">지도보기</button>
        </div>
      </div>
    </div>
  );
};

export default function AccommodationDetailTop({ accommodation }: Props) {

  return (
    <>
      <AccommodationDetailTopImages accommodation={accommodation} />
      <AccommodationDetailTopCard accommodation={accommodation} />
    </>
  );
}
