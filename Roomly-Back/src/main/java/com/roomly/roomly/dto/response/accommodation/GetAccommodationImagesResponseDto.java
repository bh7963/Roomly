package com.roomly.roomly.dto.response.accommodation;

import com.roomly.roomly.dto.response.ResponseCode;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.ResponseMessage;
import com.roomly.roomly.entity.AccImageEntity;
import com.roomly.roomly.entity.AccommodationEntity;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import lombok.Getter;

@Getter
public class GetAccommodationImagesResponseDto extends ResponseDto {

    private String accmmodationMainImage;
    private List<String> accommodationImages;
    
    public GetAccommodationImagesResponseDto(AccommodationEntity accommodationEntity, List<AccImageEntity> accImageEntities){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

        List<String> accommodationImages = new ArrayList<>();
        for (AccImageEntity accImageEntity : accImageEntities){
            accommodationImages.add(accImageEntity.getAccommodationImage());
        }
        this.accmmodationMainImage = accommodationEntity.getAccommodationMainImage();
        this.accommodationImages = accommodationImages;
    }

    public static ResponseEntity<GetAccommodationImagesResponseDto> success(
        AccommodationEntity accommodationEntity, 
        List<AccImageEntity> accImageEntities
    ){
        GetAccommodationImagesResponseDto repsonseBody = new GetAccommodationImagesResponseDto(accommodationEntity, accImageEntities);
        return ResponseEntity.status(HttpStatus.OK).body(repsonseBody);
    }
    
}
