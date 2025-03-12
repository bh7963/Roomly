package com.roomly.roomly.entity;

import com.roomly.roomly.dto.request.accommodation.PatchAccommodationRequestDto;
import com.roomly.roomly.dto.request.accommodation.PostAccommodationReqeustDto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="accommodation")
@Table(name="accommodation")

public class AccommodationEntity {

    @Id // pk로 accommodationName 지정
    private String accommodationName;

    private String accommodationMainImage;
    private String accommodationAddress;
    private String accommodationType;
    private String accommodationIntroduce;
    private String categoryArea;
    private boolean categoryPet;
    private boolean categoryNonSmokingArea;
    private boolean categoryIndoorSpa;
    private boolean categoryDinnerParty;
    private boolean categoryWifi;
    private boolean categoryCarPark;
    private boolean categoryPool;
    private Integer accommodationGradeSum;
    private String hostId;
    private Boolean applyStatus;
    private String entryTime;

    public AccommodationEntity(PostAccommodationReqeustDto dto) {
        Date now = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String entryTime = dateFormat.format(now);
        
        this.accommodationName = dto.getAccommodationName();
        this.accommodationMainImage = dto.getAccommodationMainImage();
        this.accommodationAddress = dto.getAccommodationAddress();
        this.accommodationType = dto.getAccommodationType();
        this.accommodationIntroduce = dto.getAccommodationIntroduce();
        this.categoryArea = dto.getCategoryArea();
        this.categoryPet = dto.isCategoryPet();
        this.categoryNonSmokingArea = dto.isCategoryNonSmokingArea();
        this.categoryIndoorSpa = dto.isCategoryIndoorSpa();
        this.categoryDinnerParty = dto.isCategoryDinnerParty();
        this.categoryWifi = dto.isCategoryWifi();
        this.categoryCarPark = dto.isCategoryCarPark();
        this.categoryPool = dto.isCategoryPool();
        this.hostId = dto.getHostId();
        this.applyStatus = dto.getApplyStatus() == null || dto.getApplyStatus() == 0 ? false : true;
        this.entryTime = entryTime;

    }

    public void patch (PatchAccommodationRequestDto dto){
        this.accommodationMainImage = dto.getAccommodationMainImage();
        this.accommodationIntroduce = dto.getAccommodationIntroduce();
        this.categoryArea = dto.getCategoryArea();
        this.categoryPet = dto.isCategoryPet();
        this.categoryNonSmokingArea = dto.isCategoryNonSmokingArea();
        this.categoryIndoorSpa = dto.isCategoryIndoorSpa();
        this.categoryDinnerParty = dto.isCategoryDinnerParty();
        this.categoryWifi = dto.isCategoryWifi();
        this.categoryCarPark = dto.isCategoryCarPark();
        this.categoryPool = dto.isCategoryPool();
    }
    
}
