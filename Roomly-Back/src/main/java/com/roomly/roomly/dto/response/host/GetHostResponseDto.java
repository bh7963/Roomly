package com.roomly.roomly.dto.response.host;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.roomly.roomly.dto.response.ResponseCode;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.ResponseMessage;
import com.roomly.roomly.entity.HostEntity;

import lombok.Getter;

@Getter
public class GetHostResponseDto extends ResponseDto  {
    
    private String hostName;
    private String hostId;
    private String hostPw;
    private String hostTelNumber;

    public GetHostResponseDto(HostEntity hostEntity){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

        this.hostName = hostEntity.getHostName();
        this.hostId = hostEntity.getHostId();
        this.hostPw = hostEntity.getHostPw();
        this.hostTelNumber = hostEntity.getHostTelNumber();
    }

    public static ResponseEntity<GetHostResponseDto> success(HostEntity hostEntity){
        GetHostResponseDto responseBody = new GetHostResponseDto(hostEntity);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
