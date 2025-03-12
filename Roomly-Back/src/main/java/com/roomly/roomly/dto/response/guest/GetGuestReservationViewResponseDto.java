package com.roomly.roomly.dto.response.guest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.roomly.roomly.dto.response.ResponseCode;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.ResponseMessage;
import com.roomly.roomly.repository.resultSet.GetReservationViewResultSet;

import lombok.Getter;

@Getter
public class GetGuestReservationViewResponseDto extends ResponseDto{
    
    private String guestName;
    private String guestTelNumber;
    private String accommodationName;
    private String roomName;
    private String roomCheckIn;
    private String roomCheckOut;
    private String roomMainImage;
    private Integer roomPrice;

    private GetGuestReservationViewResponseDto(GetReservationViewResultSet resultSet) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

        this.guestName = resultSet.getGuestName();
        this.guestTelNumber = resultSet.getGuestTelNumber();
        this.accommodationName = resultSet.getAccommodationName();
        this.roomName = resultSet.getRoomName();
        this.roomCheckIn = resultSet.getRoomCheckIn();
        this.roomCheckOut = resultSet.getRoomCheckOut();
        this.roomMainImage = resultSet.getRoomMainImage();
        this.roomPrice = resultSet.getRoomPrice();

    }

    public static ResponseEntity<GetGuestReservationViewResponseDto> success(GetReservationViewResultSet resultSet) {
        GetGuestReservationViewResponseDto responseBody = new GetGuestReservationViewResponseDto(resultSet);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
