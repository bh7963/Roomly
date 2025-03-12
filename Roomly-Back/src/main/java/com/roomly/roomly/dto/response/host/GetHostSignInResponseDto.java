package com.roomly.roomly.dto.response.host;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.roomly.roomly.dto.response.ResponseCode;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.ResponseMessage;
import com.roomly.roomly.entity.HostEntity;

import lombok.Getter;

@Getter
// 호스트 정보 응답 클래스
public class GetHostSignInResponseDto extends ResponseDto{
    
    private String hostId;
    private String hostPw;
    private String hostName;
    private String hostBusinessNumber;
    private String hostTelNumber;
    private String businessName;
    private String businessStartDay;
    private String businessImage;
    private boolean entryStatus;


    public GetHostSignInResponseDto(HostEntity hostEntity){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.hostId = hostEntity.getHostId();
        this.hostPw = hostEntity.getHostPw();
        this.hostName = hostEntity.getHostName();
        this.hostBusinessNumber = hostEntity.getHostTelNumber();
        this.hostTelNumber = hostEntity.getHostTelNumber();
        this.businessName = hostEntity.getBusinessName();
        this.businessStartDay = hostEntity.getBusinessStartDay();
        this.businessImage = hostEntity.getBusinessImage();
        this.entryStatus = hostEntity.getEntryStatus();
    }

    public static ResponseEntity<GetHostSignInResponseDto> success(HostEntity hostEntity) {
        GetHostSignInResponseDto responseBody = new GetHostSignInResponseDto(hostEntity); 
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

}
