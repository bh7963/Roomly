package com.roomly.roomly.dto.response.admin;

import com.roomly.roomly.common.object.Host;
import com.roomly.roomly.dto.response.ResponseCode;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.ResponseMessage;
import com.roomly.roomly.entity.HostEntity;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import lombok.Getter;

@Getter
public class GetHostListResponseDto extends ResponseDto {
    
    private List<Host> hostList;

    public GetHostListResponseDto (List<HostEntity> hostEntities){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

        this.hostList = Host.getHosts(hostEntities);
    }

    public static ResponseEntity<GetHostListResponseDto> success(
        List<HostEntity> hostEntities
    ){
        GetHostListResponseDto responseBody = new GetHostListResponseDto(hostEntities);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody); 
    }
}
