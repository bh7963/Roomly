package com.roomly.roomly.dto.response.hostauth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.roomly.roomly.dto.response.ResponseCode;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.ResponseMessage;
import lombok.Getter;

@Getter
public class HostSignInResponseDto extends ResponseDto{
    
    private String hostAccessToken;
    private Integer expiration;

    public HostSignInResponseDto(String hostaccessToken){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.hostAccessToken = hostaccessToken;
        this.expiration = 10 * 60 * 60;
    }

    public static ResponseEntity<HostSignInResponseDto> success(String hostaccessToken) {
        HostSignInResponseDto responseBody = new HostSignInResponseDto(hostaccessToken);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

}
