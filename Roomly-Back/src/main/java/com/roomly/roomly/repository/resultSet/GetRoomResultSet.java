package com.roomly.roomly.repository.resultSet;


public interface GetRoomResultSet {
    Integer getRoomId();
    String getRoomName();
    String getRoomMainImage();
    String getRoomInfo();
    Integer getRoomPrice();
    String getRoomCheckIn();
    String getRoomCheckOut();
    Integer getRoomTotalGuest();
}
