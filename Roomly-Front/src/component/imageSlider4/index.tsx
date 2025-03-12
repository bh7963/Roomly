import React, { useState } from 'react';
import './style.css';



interface ImageSliderProps {
  imageContents: { 
    image: string, 
    text: string, 
    filter: string, 
    title: string,
    Region: string, 
    propose: string, 
    price: string }[];
}

export default function ImageSlider4({ imageContents }: ImageSliderProps) {

  const [startIndex, setStartIndex] = useState<number>(0);

  const handleNext = () => {
    if (startIndex < 20) {
      setStartIndex(startIndex + 4); // 오른쪽 버튼 클릭 시 4칸 이동
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 4); // 왼쪽 버튼 클릭 시 4칸 이동
    }
  };

  const showLeftButton = startIndex > 0; // 시작 인덱스가 0보다 클 때 왼쪽 버튼 표시
  const showRightButton = startIndex < imageContents.length-4; // 시작 인덱스가 4보다 작을 때 오른쪽 버튼 표시

  return (
    <div className='slider4-wrapper'>
      <div className='slider4-left'>
        {showLeftButton && <div className='slider4-left-button' onClick={handlePrev}></div>}
      </div>
      <div className="slider4-container">
        <div className='slider4-image-container' style={{ transform: `translateX(-${(startIndex / 4) * 100}%)` }}>
          {imageContents.slice(0, imageContents.length+1).map(({ image, filter, title, Region, propose, price}, index) => (
            <div className='slider4-image' key={index}>
              <img className='slider4-slide' src={image} alt={`Image ${index + 1}`} /> 
              <div className='slider4-text'>
              <div className='slider4-text-container'>
                <div className='slider4-text-filter'>{filter}</div>
                <div className='slider4-text-title'>{title}</div>
                <div className='slider4-text-Region'>{Region}</div>
                <div className='slider4-text-propose'>{propose}</div>
              </div>
              <div className='slider4-text-price'>
                  <div className='qqaa4411'>{price}</div>
                  <div className='qaws4152'>원</div>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='slider4-right'>
        {showRightButton && <div className='slider4-right-button' onClick={handleNext}></div>}
      </div>
    </div>
  );
};