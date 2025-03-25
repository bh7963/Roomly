package com.roomly.roomly.dto.response.host;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.roomly.roomly.dto.response.ResponseCode;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.ResponseMessage;

import lombok.Getter;

@Getter
public class HostIdFindSuccessResponseDto extends ResponseDto {
    
    private String userId;

    public HostIdFindSuccessResponseDto(String userId){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.userId = userId;
    }

    public static ResponseEntity<HostIdFindSuccessResponseDto> success(String userId){
        HostIdFindSuccessResponseDto responseBody = new HostIdFindSuccessResponseDto(userId);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
