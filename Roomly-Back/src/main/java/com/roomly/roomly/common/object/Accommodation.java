package com.roomly.roomly.common.object;

import java.util.List;

import com.roomly.roomly.entity.AccommodationEntity;

import lombok.Getter;

import java.util.ArrayList;


@Getter
public class Accommodation {

    private String hostId;
    private String accommodationName;
    private String entryTime;
    private Boolean applyStatus;

    public Accommodation(AccommodationEntity accommodationEntity){
        this.hostId = accommodationEntity.getHostId();
        this.accommodationName = accommodationEntity.getAccommodationName();
        this.entryTime = accommodationEntity.getEntryTime();
        this.applyStatus = accommodationEntity.getApplyStatus();
    }

    public static List<Accommodation> getList(List<AccommodationEntity> accommodationEntities){
        List<Accommodation> accommodations = new ArrayList<>();
        for( AccommodationEntity accommodationEntity : accommodationEntities){
            Accommodation accommodation = new Accommodation(accommodationEntity);
            accommodations.add(accommodation);
        }
        return accommodations;
    }
    
}
