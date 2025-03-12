import './style.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import Slider from 'react-slick';
import GetAccommodationResponseDto from 'src/apis/hostmypage/dto/response/GetAccommodationResponseDto';
import Room from 'src/apis/hostmypage/dto/response/Room';

Modal.setAppElement('#root');

const AccommodationDetailTopImages = ({ accommodation, room, onClose }: { accommodation: GetAccommodationResponseDto, room: Room, onClose: () => void }) => {
  // 상태를 number 또는 undefined로 설정
  const [currentImage, setCurrentImage] = useState<number | undefined>(0);
  const sliderRef = useRef<Slider>(null);

  const sliderSettings = {
    initialSlide: currentImage || 0, // 0부터 시작
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index: number) => setCurrentImage(index), // 슬라이드 변경 시 인덱스를 상태로 설정
  };

  const thumbnailSettings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 8,
    slidesToScroll: 1,
    focusOnSelect: true,
    centerMode: false,
    afterChange: (index: number) => setCurrentImage(index), // 썸네일 클릭 시 인덱스를 상태로 설정
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImage(index); // 썸네일 클릭 시 인덱스 설정
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index); // 슬라이드로 이동
    }
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      contentLabel="Accommodation Images"
      className="modal"
      overlayClassName="overlay"
    >
      <div className='room-detail-modal-close-btn' onClick={onClose}></div>
      <Slider {...sliderSettings} ref={sliderRef}>
        {room.roomImages.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Accommodation ${index + 1}`} className="large-modal-image" />
          </div>
        ))}
      </Slider>

      {/* Thumbnail 슬라이더 */}
      <Slider {...thumbnailSettings} className="thumbnail-slider">
        {accommodation.accSubImages.map((image, index) => (
          <div key={index} onClick={() => handleThumbnailClick(index)}>
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`thumbnail-image ${currentImage === index ? 'active' : ''}`}
            />
          </div>
        ))}
      </Slider>
    </Modal>
  );
};

export default AccommodationDetailTopImages;
