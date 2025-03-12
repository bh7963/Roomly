package com.roomly.roomly.dto.response.guestauth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.roomly.roomly.dto.response.ResponseCode;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.ResponseMessage;

import lombok.Getter;

@Getter
public class GuestSignInResponseDto extends ResponseDto{
    
    private String guestAccessToken;
    private Integer expiration;

    private GuestSignInResponseDto(String guestAccessToken) {
        
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.guestAccessToken = guestAccessToken;
        this.expiration = 10*60*60; // 10시간 인증
    }

    public static ResponseEntity<GuestSignInResponseDto> success(String guestAccessToken) {
        GuestSignInResponseDto responseBody = new GuestSignInResponseDto(guestAccessToken);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
