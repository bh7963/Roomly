import React, { useState } from 'react';
import './style.css';



interface ImageSliderProps {
  imageContents: { image: string, text: string }[];
  title: string;
  onClick: (text:string ) => void;
}

export default function ImageSlider6({ imageContents, title , onClick }: ImageSliderProps) {

  const [startIndex, setStartIndex] = useState<number>(0);

  const handleNext = () => {
    if (startIndex < 4) {
      setStartIndex(startIndex + 4); // 오른쪽 버튼 클릭 시 4칸 이동
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 4); // 왼쪽 버튼 클릭 시 4칸 이동
    }
  };

  

  const showLeftButton = startIndex > 0; // 시작 인덱스가 0보다 클 때 왼쪽 버튼 표시
  const showRightButton = startIndex < 4; // 시작 인덱스가 4보다 작을 때 오른쪽 버튼 표시

  return (
    <div className='slider6-warpper'>
      <div className='slider6-left'>
        {showLeftButton && <div className='slider6-left-button' onClick={handlePrev}></div>}
      </div>
      <div className="slider6-container" >
        <div className='slider6-title'>{title}</div>
        <div className='slider6-image-container' style={{ transform: `translateX(-${(startIndex / 6) * 100}%)` }}>
          {imageContents.slice(0, imageContents.length).map(({ image, text }, index) => (
            <div className='slider6-image' key={index} onClick={() => onClick(text)}>
              <img className='slider6-slide' src={image} alt={`Image ${index + 1}`} />
              <div className='slider6-ranktext'>{text}</div>
            </div>
          ))}
        </div>
      </div>
      <div className='slider6-right'>
        {showRightButton && <div className='slider6-right-button' onClick={handleNext}></div>}
      </div>
    </div>
  );
};
