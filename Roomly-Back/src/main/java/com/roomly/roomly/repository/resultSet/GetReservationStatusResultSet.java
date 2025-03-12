package com.roomly.roomly.repository.resultSet;

public interface GetReservationStatusResultSet {
    
    String getCreatedAt(); // 예약날짜
    Long getReservationId(); // 예약번호
    String getAccommodationMainImage(); // 숙소 대표이미지
    String getAccommodationName(); // 숙소이름
    String getRoomName(); // 객실이름
    String getRoomCheckIn(); // 체크인
    String getRoomCheckOut (); // 체크아웃
    String getReservationTotalPeople (); // 총인원수
    Long getTotalPrice(); // 1박가격 (숙박일수 * 룸 가격) // 결제 테이블의 amount컬럼
    Integer getTotalNight(); // ''박 수

}