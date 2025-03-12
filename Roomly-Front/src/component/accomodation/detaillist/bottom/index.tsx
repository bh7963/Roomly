import React, { useEffect, useState } from 'react';
import './style.css';
import PaginationFuction from '../../pagination';

interface Review {
  guestId: string
  reviewDate: string
  reviewContent: string
  reviewGrade: string
}


// function: 리뷰 카드 컴포넌트 //
const ReviewCard = (review: Review) => {
  return (
    <div className='review-wrapper'>
    <div id='review-card-wrapper'>
    <div className="review-card">
      <div className="review-header">
        <div className='review-user-icon'></div>
        <div className='review-user-date-box'>
        <div className="review-user-id">{review.guestId}</div>
        <div className="review-date">{review.reviewDate}</div>
        </div>
        <div className='review-like-box'>
        <div className="review-like-button"></div> 
        {/* <div className='review-like-count'>{''}</div> */}
        </div>
        
      </div>
      <div className="review-rating">
        {review.reviewGrade}
      </div>
      <div className="review-content">
        {review.reviewContent}
      </div>

    </div>
    </div>
    </div>
  );
};

// state: 리뷰 리스트 컴포넌트 //
const ReviewList: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sortCriteria, setSortCriteria] = useState<string>('추천순');


  return (
    <div id='review-list-wrapper'>
    <div className="review-list-container">
      <div className='review-title'>Reviews</div>

      {/* 정렬 기준 선택 */}
      <div className="sort-dropdown">
        <label htmlFor="sortOptions"> </label>
        <select
          id="sortOptions"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="추천순">추천순</option>
          <option value="최신순">최신순</option>
          <option value="평점 높은순">평점 높은순</option>
          <option value="평점 낮은순">평점 낮은순</option>
        </select>
      </div>

      <div id="review-overall">

        <div className='review-box'>
          <div className='review-star-icon'></div>
        <div className="rating-score">5/5</div>
        <div className="rating-text">Excellent</div>
        <div className="rating-count">({reviews.length} Reviews)</div>
        </div>
      </div>

    </div>
    </div>
  );
};

export default ReviewList;
