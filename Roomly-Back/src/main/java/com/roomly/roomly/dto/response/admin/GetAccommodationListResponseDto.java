package com.roomly.roomly.dto.response.admin;

import com.roomly.roomly.common.object.Accommodation;
import com.roomly.roomly.dto.response.ResponseCode;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.ResponseMessage;
import com.roomly.roomly.entity.AccommodationEntity;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import lombok.Getter;

@Getter
public class GetAccommodationListResponseDto extends ResponseDto {
    
    private List<Accommodation> accommodationList;

    public GetAccommodationListResponseDto(List<AccommodationEntity> accommodationEntities){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

        this.accommodationList = Accommodation.getList(accommodationEntities);
    }

    public static ResponseEntity<GetAccommodationListResponseDto> success(
        List<AccommodationEntity>accommodationEntities
    ){
        GetAccommodationListResponseDto responseBody = new GetAccommodationListResponseDto(accommodationEntities);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
