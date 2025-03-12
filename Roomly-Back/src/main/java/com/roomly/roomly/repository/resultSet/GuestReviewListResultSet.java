package com.roomly.roomly.repository.resultSet;

public interface GuestReviewListResultSet {
    
    Integer getReservationId(); // 예약번호
    String getAccommodationName(); // 숙소명
    String getReviewDate(); // 리뷰 등록일
    String getReviewContent(); // 리뷰 내용
    Integer getReviewGrade(); // 평점
}
