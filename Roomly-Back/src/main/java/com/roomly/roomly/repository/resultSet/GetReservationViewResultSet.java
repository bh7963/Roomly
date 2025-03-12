package com.roomly.roomly.repository.resultSet;

public interface GetReservationViewResultSet {
    
    String getGuestName(); // 게스트 이륾
    String getGuestTelNumber(); // 게스트 전화번호
    String getAccommodationName(); // 숙소명
    String getRoomName(); // 객실명
    String getRoomCheckIn(); // 체크인
    String getRoomCheckOut(); // 체크아웃
    String getRoomMainImage(); // 객실 대표 이미지
    Integer getRoomPrice(); // 객실 가격(1박기준)
}
