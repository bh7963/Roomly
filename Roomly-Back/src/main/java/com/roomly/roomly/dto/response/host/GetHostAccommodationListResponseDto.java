package com.roomly.roomly.dto.response.host;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.roomly.roomly.common.object.MyAccommodation;
import com.roomly.roomly.dto.response.ResponseCode;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.ResponseMessage;
import com.roomly.roomly.entity.AccommodationEntity;

import lombok.Getter;

@Getter
public class GetHostAccommodationListResponseDto extends ResponseDto {
    
    private List<MyAccommodation> accommodations;

    public GetHostAccommodationListResponseDto(List<AccommodationEntity> accommodationEntities){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        
        this.accommodations = MyAccommodation.getList(accommodationEntities);
        
    }

    public static ResponseEntity<GetHostAccommodationListResponseDto> success(List<AccommodationEntity> accommodationEntities){
        GetHostAccommodationListResponseDto responseBody = new GetHostAccommodationListResponseDto(accommodationEntities);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

}
