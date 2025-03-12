import React, { useState, useRef, useEffect } from "react";
import {
  FaWifi,
  FaParking,
  FaSwimmingPool,
  FaConciergeBell,
} from "react-icons/fa";
import Modal from "react-modal";
import Slider from "react-slick";
import axios from "axios";
import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// interface: 숙소 이미지 모달 + 슬라이더 //
interface AccommodationImagesProps {
  initialImages: string[]; // 숙소 ID를 props로 전달
}

const AccommodationHostDetailTopImages: React.FC<AccommodationImagesProps> = ({
  initialImages,
}) => {
  // state: 상태 //
  const [images, setImages] = useState<string[]>(initialImages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const sliderRef = useRef<Slider>(null);

  // effect: 서버에서 이미지 데이터 가져오는 함수 //
  useEffect(() => {
    const fetchAccommodationImages = async () => {
      try {
        const response = await axios.get(
          `/api/accommodations/${initialImages}/images`
        );
        setImages(response.data.accommodation_main_image); // 서버 응답의 이미지 데이터로 상태 업데이트
      } catch (error) {
        console.error("이미지 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchAccommodationImages(); // 컴포넌트 마운트 시 이미지 가져오기
  }, [initialImages]);

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
          src={images[0]}
          alt="Main Accommodation"
          className="large-image"
          onClick={() => handleImageClick(0)}
        />
      </div>

      {/* Small images in a 2x3 grid */}
      <div className="small-image-grid-container">
        {/* '이미지 전체보기' button */}

        {images.length > 5 && (
          <button className="button-box" onClick={() => setIsModalOpen(true)}>
            <div className="image-icon"></div>
            <div className="view-all-btn"> 전체보기 </div>
          </button>
        )}

        <div className="small-image-grid">
          {images.slice(1, 5).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Accommodation ${index + 1}`}
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
        <button onClick={closeModal}>Close</button>
        <Slider {...sliderSettings} ref={sliderRef}>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Accommodation ${index + 1}`}
                className="large-modal-image"
              />
            </div>
          ))}
        </Slider>

        {/* Thumbnail navigation */}
        <div className="thumbnail-row">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
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

// 숙소 디테일 상단 정보 카드 //
interface AccommodationDetailTopProps {
  //! dto 타입 백엔드와 맞춰서 수정 필요. 특히 카테고리(=서비스) 부분
  name: string;
  stars: number;
  price: string;
  reviewScore: number;
  reviewCount: number;
  reviewSnippet: string[];
  services: string[];
  location: string;
  mapLink: string;
  accommodationType: string;
  onReviewButtonClick: () => void;
}

const AccommodationHostDetailTopCard: React.FC<AccommodationDetailTopProps> = ({
  name,
  stars,
  price,
  reviewScore,
  reviewCount,
  reviewSnippet,
  services,
  location,
  mapLink,
  accommodationType,
  onReviewButtonClick, 
}) => {
  // state: 상태 관리 //
  const [isFacilityModalOpen, setIsFacilityModalOpen] = useState(false);

  // 부대시설 모달 열기 및 닫기 함수
  const openFacilityModal = () => setIsFacilityModalOpen(true);
  const closeFacilityModal = () => setIsFacilityModalOpen(false);

  // 리액트 아이콘 라이브러리 사용 //
  const iconMap: Record<string, JSX.Element> = {
    Wifi: <FaWifi />,
    Parking: <FaParking />,
    Pool: <FaSwimmingPool />,
  
  };

  return (
    <div id="accommodation-detail">
      <div className="header">
        <div className="title-section">
          <div className="accommodation-type-container">
            <div className="accommodation-type">{accommodationType}</div>
            <div className="stars">{"★".repeat(stars)}</div>
          </div>
          <div className="accommodation-name">{name}</div>
        </div>
        <div className="price-section">
          <div className="accommodation-price">{price}원~ </div>
          <div className="price-per-night"> /1박</div>
        </div>
      </div>

      <div id="content">
        <div className="review-section">
          <div className="review-score-box">
            <div className="review-score">⭐ {reviewScore}</div>
            <div className="heder-title">{reviewCount}개의 리뷰</div>
            <div className="right-arrow-icon-box">
              <button
                className="right-arrow-icon-button"
                onClick={() => {
                  onReviewButtonClick();
                }}
              ></button>
            </div>
          </div>

          <div className="review-snippet">{reviewSnippet}</div>
          {/* Call the onReviewButtonClick function when the button is clicked */}
        </div>

        <div className="services-section">
          <div className="heder-title-container">
          <div className="heder-title">서비스 및 부대시설</div>
          <button
            className="view-all-facilities-btn"
            onClick={openFacilityModal}></button>
          </div>
          <div className="services">
            {services.map((service, index) => (
              <span key={index} className="service-icon">
                {/* 서비스 이름에 맞는 아이콘을 표시 */}
                {iconMap[service] || <FaConciergeBell />}{" "}
                {/* 매칭되지 않으면 기본 아이콘 */}
                {service}
              </span>
            ))}
          </div>
          {/* 부대시설 모달 */}
          <Modal
            isOpen={isFacilityModalOpen}
            onRequestClose={closeFacilityModal}
            contentLabel="Facility Information"
            className="modal"
            overlayClassName="overlay"
          >
            <button onClick={closeFacilityModal}>Close</button>
            <div className="facility-info">
              <h3>부대시설</h3>
              <div className="facility-icons">
                {services.map((service, index) => (
                  <div key={index} className="facility-item">
                    <i className={`facility-icon ${service}-icon`} />{" "}
                    {/* 부대시설 아이콘 넣기*/}
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </Modal>
        </div>

        <div className="location-section">
          <div className="heder-title-container">
          <div className="heder-title">위치 정보</div>
          <div className="view-all-location-btn"></div>
          </div>
          <div className="address-container">
            <div className="address-icon"></div>
             <div className="accommodation-address">{location}</div>
          </div>
          <button className="show-map-detail-button">지도보기</button>
        </div>
      </div>
    </div>
  );
};

interface AccommodationDetail {
  name: string;
  stars: number;
  price: string;
  reviewScore: number;
  reviewCount: number;
  reviewSnippet: string[];
  services: string[];
  location: string;
  mapLink: string;
  images: string[];
  accommodationType: string;
}

export default function AccommodationHostDetailTop({
  accommodation_name,
  onReviewButtonClick,
}: {
  accommodation_name: string;
  onReviewButtonClick: () => void;
}) {
  // const [accommodationDetail, setAccommodationDetail] = useState<AccommodationDetail | null>(null);

  // 테스트용 (테스트 끝나면 삭제 예정)
  const [accommodationDetail, setAccommodationDetail] =
    useState<AccommodationDetail | null>({
      name: "Best Western Plus",
      stars: 4,
      accommodationType: "호텔",
      price: "100,000",
      reviewScore: 4.5,
      reviewCount: 128,
      reviewSnippet: [
        "아주 훌륭한 숙소입니다",
        "숙소가 정말 깨끗하고 교통편도 좋아서 차 없이 방문하기에도 좋았어요, 유명 관광지와 거리가 매우 가까운 숙소이며 직원 분들이 친절하시고 조식도 정말 맛있었습니다.",
      ],
      services: [
        "WiFi",
        "수영장",
        "주차",
        "애견 동반 가능",
        "실내 스파",
        "금연 객실",
        "바베큐",
      ],
      location: "부산광역시 부산진구 중앙대로 668 에이원프라자 빌딩 4층",
      mapLink: "https://maps.example.com",
      images: [
        // require("./images/accommodationlist/Best-Western-Plus-Congress-Hotel-4-800x600.jpg"),
        // require("./images/accommodationlist/ibis-Yerevan-Center-4-800x600.jpg"),
        // require("./images/Best-Western-Plus-Congress-Hotel-4-800x600.jpg"),
        // require("./images/Europe-Hotel-4-800x600.jpg"),
        // require("./images/ibis-Yerevan-Center-4-800x600.jpg"),
        // require("./images/Best-Western-Plus-Congress-Hotel-4-800x600.jpg"),
        // require("./images/Europe-Hotel-4-800x600.jpg"),

        require("./guamHayattoutdoor.jpg"),
        require("./00fee112.webp"),
        require("./1e934a37.avif"),
        require("./376a71e5.webp"),
        require("./3a94d2de.avif"),
        require("./6410d584.webp"),
        require("./7d463801.avif"),
        require("./9015f3a4.avif"),
        require("./970ac34e.avif"),
        require("./9841e722.webp"),
        require("./f4dd89a9.webp"),
        require("./hayattExteria.jpg"),
      ],
    });

  useEffect(() => {
    const fetchAccommodationDetail = async () => {
      try {
        const response = await axios.get(
          `/api/accommodations/${accommodation_name}/details`
        );
        setAccommodationDetail(response.data);
      } catch (error) {
        console.error("Error fetching accommodation details:", error);
      }
    };
    fetchAccommodationDetail();
  }, [accommodation_name]);

  if (!accommodationDetail) return <p>Loading...</p>; // 로딩 표시

  return (
    <>
      <AccommodationHostDetailTopImages
        initialImages={accommodationDetail.images}
      />
      <AccommodationHostDetailTopCard
        name={accommodationDetail.name}
        stars={accommodationDetail.stars}
        price={accommodationDetail.price}
        reviewScore={accommodationDetail.reviewScore}
        reviewCount={accommodationDetail.reviewCount}
        reviewSnippet={accommodationDetail.reviewSnippet}
        services={accommodationDetail.services}
        location={accommodationDetail.location}
        mapLink={accommodationDetail.mapLink}
        accommodationType={accommodationDetail.accommodationType}
        onReviewButtonClick={onReviewButtonClick}
      />
    </>
  );
}
