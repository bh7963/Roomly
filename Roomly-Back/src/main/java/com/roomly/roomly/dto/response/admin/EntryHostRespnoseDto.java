package com.roomly.roomly.dto.response.admin;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.roomly.roomly.dto.response.ResponseCode;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.ResponseMessage;
import com.roomly.roomly.entity.HostEntity;

import lombok.Getter;

@Getter
public class EntryHostRespnoseDto extends ResponseDto {
    private String hostId;
    private String hostName;
    private String hostTelNumber;
    private String businessName;
    private String hostBusinessNumber;
    private String businessStartDay;

    public EntryHostRespnoseDto(HostEntity hostEntity){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

        this.hostId = hostEntity.getHostId();
        this.hostName = hostEntity.getHostName();
        this.hostTelNumber = hostEntity.getHostTelNumber();
        this.businessName = hostEntity.getBusinessName();
        this.hostBusinessNumber = hostEntity.getHostBusinessNumber();
        this.businessStartDay = hostEntity.getBusinessStartDay();
    }

    public static ResponseEntity<EntryHostRespnoseDto> success(HostEntity hostEntity){
        EntryHostRespnoseDto responseBody = new EntryHostRespnoseDto(hostEntity);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
