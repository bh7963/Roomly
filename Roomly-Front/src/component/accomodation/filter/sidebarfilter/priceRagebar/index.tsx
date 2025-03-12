import React from 'react';
import "./style.css";
import { useFilterStore } from 'src/stores';

const RangeSlider = () => {
  const { priceRange, setPriceRange } = useFilterStore();

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinValue = Number(e.target.value);
    setPriceRange({ ...priceRange, min: newMinValue });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxValue = Number(e.target.value);
    setPriceRange({ ...priceRange, max: newMaxValue });
  };

  const getMinTrackBackground = () => {
    const minTrackPercentage = ((priceRange.min - 10000) / (3000000 - 0)) * 100;
    return `linear-gradient(to right, #00ACCF ${minTrackPercentage}%, #FF5733 ${minTrackPercentage}%)`;
  };

  // const getMaxTrackBackground = () => {
  //   const maxTrackPercentage = ((priceRange.max - 10000) / (3000000 - 0)) * 100;
  //   return `linear-gradient(to right, #FF5733 ${maxTrackPercentage}%, #00ACCF ${maxTrackPercentage}%)`;
  // };

  return (
    <div className="range-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Range Display */}
      <div style={{ marginBottom: '10px', fontSize: '14px', fontWeight: 'bold' }}>
        <span>{priceRange.min.toLocaleString()}원</span>
        <span>~</span>
        <span style={{ marginLeft: '10px' }}> {priceRange.max.toLocaleString()}원</span>
      </div>

      {/* Range Sliders */}
      <div style={{ display: 'flex', width: '200px' }}>
        <input
          className="range-bar-left"
          type="range"
          min={0}
          max={5000000}
          step={10000}
          value={priceRange.min}
          onChange={handleMinChange}
          style={{
            width: '90px',
            height: '10px',
            margin: '0px',
            boxSizing: 'border-box',
            borderTopLeftRadius: '10px',
            borderBottomLeftRadius: '10px',
            background: getMinTrackBackground(),
          }}
        />
        {/* <input
          className="range-bar-right"
          type="range"
          min={0}
          max={5000000}
          step={10000}
          value={priceRange.max}
          onChange={handleMaxChange}
          style={{
            width: '90px',
            height: '10px',
            boxSizing: 'border-box',
            borderTopRightRadius: '10px',
            borderBottomRightRadius: '10px',
            marginLeft: '-2px',
            background: getMaxTrackBackground(),
          }}
        /> */}
      </div>
    </div>
  );
};

export default RangeSlider;
