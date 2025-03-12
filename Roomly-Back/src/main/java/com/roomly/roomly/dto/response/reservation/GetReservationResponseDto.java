package com.roomly.roomly.dto.response.reservation;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.roomly.roomly.common.object.Reservation;
import com.roomly.roomly.dto.response.ResponseCode;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.ResponseMessage;

import lombok.Getter;

@Getter
public class GetReservationResponseDto extends ResponseDto{

    private List<Reservation> reservationList;

    public GetReservationResponseDto(List<Reservation> reservationList) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

        this.reservationList = reservationList;
    }

    public static ResponseEntity<GetReservationResponseDto> success(List<Reservation> reservationList){
        GetReservationResponseDto responseBody = new GetReservationResponseDto(reservationList);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
    
}
