package com.roomly.roomly.repository.resultSet;

public interface GetReservationResultSet {
    
    Integer getReservationId();
    Integer getTotalNight();
    String getGuestName();
    String getGuestTelNumber();
    Integer getReservationTotalPeople();
    Integer getRoomPrice();
    String getRoomName();
    String getAccommodationMainImage();
    String getAccommodationName();
    String getCheckInDay();
    String getCheckOutDay();
    String getCreatedAt();
}
