package com.roomly.roomly.dto.response.host;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.roomly.roomly.dto.response.ResponseCode;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.ResponseMessage;
import com.roomly.roomly.entity.HostEntity;

import lombok.Getter;

@Getter
public class HostIdFindSuccessResponseDto extends ResponseDto {
    
    private String hostId;

    public HostIdFindSuccessResponseDto(HostEntity hostEntity){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.hostId = hostEntity.getHostId();
    }

    public static ResponseEntity<HostIdFindSuccessResponseDto> success(HostEntity hostEntity){
        HostIdFindSuccessResponseDto responseBody = new HostIdFindSuccessResponseDto(hostEntity);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
