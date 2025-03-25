package com.roomly.roomly.dto.response.guest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.roomly.roomly.dto.response.ResponseCode;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.ResponseMessage;
import com.roomly.roomly.entity.GuestEntity;

import lombok.Getter;

@Getter
public class GuestIdFindSuccessResponseDto extends ResponseDto{
    

    private String userId;

    public GuestIdFindSuccessResponseDto(GuestEntity guestEntity){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.userId = guestEntity.getGuestId();
    }

    public static ResponseEntity<GuestIdFindSuccessResponseDto> success(GuestEntity guestEntity){
        GuestIdFindSuccessResponseDto responseBody = new GuestIdFindSuccessResponseDto(guestEntity);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
