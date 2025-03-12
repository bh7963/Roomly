package com.roomly.roomly.common.object;
import java.util.ArrayList;
import java.util.List;

import com.roomly.roomly.entity.AccommodationEntity;

import lombok.Getter;

@Getter
public class MyAccommodation {

    
    private String accommodationName;
    private String accommodationMainImage;
    private Boolean applyStatus;
    private String entryTime;

    public MyAccommodation(AccommodationEntity accommodationEntity){
        this.accommodationName = accommodationEntity.getAccommodationName();
        this.accommodationMainImage = accommodationEntity.getAccommodationMainImage();
        this.applyStatus = accommodationEntity.getApplyStatus();
        this.entryTime = accommodationEntity.getEntryTime().substring(0, 10);
    }

    public static List<MyAccommodation> getList(List<AccommodationEntity> accommodationEntities){
        List<MyAccommodation> myAccommodations = new ArrayList<>();
        for( AccommodationEntity accommodationEntity : accommodationEntities){
            MyAccommodation myAccommodation = new MyAccommodation(accommodationEntity);
            myAccommodations.add(myAccommodation);
        }
        return myAccommodations;
    }
}
