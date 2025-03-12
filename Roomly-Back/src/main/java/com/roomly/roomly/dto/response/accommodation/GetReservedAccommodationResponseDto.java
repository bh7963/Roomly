package com.roomly.roomly.dto.response.accommodation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.roomly.roomly.common.object.Room;
import com.roomly.roomly.common.object.UseInformation;
import com.roomly.roomly.dto.response.ResponseCode;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.ResponseMessage;
import com.roomly.roomly.entity.AccImageEntity;
import com.roomly.roomly.entity.AccommodationEntity;
import com.roomly.roomly.entity.UseInformationEntity;

import lombok.Getter;

@Getter
public class GetReservedAccommodationResponseDto extends ResponseDto {

    private String accommodationName;
    private String accommodationMainImage;
    private List<String> accSubImages;
    private String accommodationAddress;
    private String accommodationType;
    private String accommodationIntroduce;
    private List<UseInformation> useInformations;
    private List<Room> roomList;
    private String categoryArea;
    private boolean categoryPet;
    private boolean categoryNonSmokingArea; 
    private boolean categoryIndoorSpa;
    private boolean categoryDinnerParty;
    private boolean categoryWifi;
    private boolean categoryCarPark;
    private boolean categoryPool;

    public GetReservedAccommodationResponseDto(
        AccommodationEntity accommodationEntity,
        String accommodationName,
        List<Room> roomList,
        List<UseInformationEntity> useInformationEntities,
        List<AccImageEntity> accImageEntities
        ){
            super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

            List<String> accSubImages = new ArrayList<>();
            for (AccImageEntity accImageEntity: accImageEntities){
                accSubImages.add(accImageEntity.getAccommodationImage());
            }

            this.accommodationName = accommodationEntity.getAccommodationName();
            this.accommodationMainImage = accommodationEntity.getAccommodationMainImage();
            this.accSubImages = accSubImages;
            this.accommodationAddress = accommodationEntity.getAccommodationAddress();
            this.accommodationType = accommodationEntity.getAccommodationType();
            this.accommodationIntroduce = accommodationEntity.getAccommodationIntroduce();
            this.roomList = roomList;
            this.useInformations = UseInformation.getUseInformation(useInformationEntities);
            this.categoryArea = accommodationEntity.getCategoryArea();
            this.categoryPet = accommodationEntity.isCategoryPet();
            this.categoryNonSmokingArea = accommodationEntity.isCategoryNonSmokingArea();
            this.categoryIndoorSpa = accommodationEntity.isCategoryIndoorSpa();
            this.categoryDinnerParty = accommodationEntity.isCategoryDinnerParty();
            this.categoryWifi = accommodationEntity.isCategoryWifi();
            this.categoryCarPark = accommodationEntity.isCategoryCarPark();
            this.categoryPool = accommodationEntity.isCategoryPool();
    }

    public static ResponseEntity<GetReservedAccommodationResponseDto> success(
        AccommodationEntity accommodationEntity, 
        String accommodationName,
        List<Room> roomList,
        List<UseInformationEntity> useInformationEntities,
        List<AccImageEntity> accImageEntities
        ){

            GetReservedAccommodationResponseDto responseBody = new GetReservedAccommodationResponseDto(
                accommodationEntity, accommodationName, roomList, useInformationEntities, accImageEntities);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        }
}
