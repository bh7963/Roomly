package com.roomly.roomly.dto.response.guest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.roomly.roomly.dto.response.ResponseCode;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.ResponseMessage;

import lombok.Getter;

@Getter
public class GuestIdFindSuccessResponseDto extends ResponseDto{
    

    private String userId;

    public GuestIdFindSuccessResponseDto(String userId){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.userId = userId;
    }

    public static ResponseEntity<GuestIdFindSuccessResponseDto> success(String userId){
        GuestIdFindSuccessResponseDto responseBody = new GuestIdFindSuccessResponseDto(userId);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
