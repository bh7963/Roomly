import React, { useState } from 'react';
import './style.css';

// Pagination 컴포넌트
const Pagination: React.FC<{
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

// 숙소 리스트 컴포넌트
const List: React.FC = () => {
  const accommodations = [
    {
      id: 1,
      name: '사랑스런 호텔',
      price: 260000,
      rating: 4.8,
      location: '서울특별시 중구',
      imageUrl: 'placeholder-image-url',
      reviewCount: 123,
      facilities: ['수영장', '금연 객실', '반려동물 동반 가능', '바베큐 가능'],
    },
    {
      id: 2,
      name: '평화로운 펜션',
      price: 200000,
      rating: 4.6,
      location: '강원도 속초시',
      imageUrl: 'placeholder-image-url',
      reviewCount: 87,
      facilities: ['금연 객실', '반려동물 동반 가능'],
    },

    // 더 많은 숙소 데이터 추가 가능
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('추천순'); // 분류 옵션 기본값

  const itemsPerPage = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 분류 로직
  const sortedAccommodations = [...accommodations].sort((a, b) => {
    if (sortOption === '평점 높은순') {
      return b.rating - a.rating;
    } else if (sortOption === '리뷰 많은순') {
      return b.reviewCount - a.reviewCount;
    } else if (sortOption === '낮은 가격순') {
      return a.price - b.price;
    } else if (sortOption === '높은 가격순') {
      return b.price - a.price;
    }
    return 0;
  });

  // 현재 페이지에 보여줄 숙소 리스트
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentAccommodations = sortedAccommodations.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="accommodation-list">
      <div className="list-header">
        <p>{accommodations.length}개의 검색 결과가 있습니다.</p>
        <div className="sort-dropdown">
          <label htmlFor="sortOptions">분류 기준:</label>
          <select
            id="sortOptions"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="추천순">추천순</option>
            <option value="평점 높은순">평점 높은순</option>
            <option value="리뷰 많은순">리뷰 많은순</option>
            <option value="낮은 가격순">낮은 가격순</option>
            <option value="높은 가격순">높은 가격순</option>
          </select>
        </div>
      </div>

      <div className="accommodation-cards">
        {currentAccommodations.map((accommodation) => (
          <div key={accommodation.id} className="accommodation-card">
            <img src={accommodation.imageUrl} alt={accommodation.name} className="accommodation-image" />
            <div className="accommodation-info">
              <h3>{accommodation.name}</h3>
              <p>{accommodation.location}</p>
              <p>₩{accommodation.price.toLocaleString()} /박</p>
              <p>Rating: {accommodation.rating}</p>
              <p>리뷰: {accommodation.reviewCount}개</p>
              <p>Facilities: {accommodation.facilities.join(', ')}</p>
              <button className="details-btn">상세보기</button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination 컴포넌트 */}
      <Pagination
        totalItems={accommodations.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default List;
