package com.roomly.roomly.common.object;

import com.roomly.roomly.repository.resultSet.GetAccommodationListResultSet;

import lombok.Getter;
import java.util.List;
import java.util.ArrayList;

@Getter
public class Accommodations {

    private String accommodationName;
    private String accommodationMainImage;
    private String accommodationType;
    private Integer accommodationGradeAverage;
    private String categoryArea;
    private Boolean categoryPet;
    private Boolean categoryNonSmokingArea;
    private Boolean categoryIndoorSpa;
    private Boolean categoryDinnerParty;
    private Boolean categoryWifi;
    private Boolean categoryCarPark;
    private Boolean categoryPool;
    private Boolean applyStatus;
    private Integer minRoomPrice;
    private Integer countReview;

    public Accommodations(GetAccommodationListResultSet resultSet){
        
        this.accommodationName = resultSet.getAccommodationName();
        this.accommodationMainImage = resultSet.getAccommodationMainImage();
        this.accommodationType = resultSet.getAccommodationType();
        this.accommodationGradeAverage = resultSet.getAccommodationGradeAverage() == null ? 0 : resultSet.getAccommodationGradeAverage();
        this.categoryArea = resultSet.getCategoryArea();
        this.categoryPet = resultSet.getCategoryPet() != null && resultSet.getCategoryPet() == 0 ? false : true;
        this.categoryNonSmokingArea = resultSet.getCategoryNonSmokingArea() != null && resultSet.getCategoryNonSmokingArea() == 0 ? false : true;
        this.categoryIndoorSpa = resultSet.getCategoryIndoorSpa() != null && resultSet.getCategoryIndoorSpa() == 0 ? false : true;
        this.categoryDinnerParty = resultSet.getCategoryDinnerParty() != null && resultSet.getCategoryDinnerParty() == 0 ? false : true;
        this.categoryWifi = resultSet.getCategoryWifi() != null && resultSet.getCategoryWifi() == 0 ? false : true;
        this.categoryCarPark = resultSet.getCategoryCarPark() != null && resultSet.getCategoryCarPark() == 0 ? false : true;
        this.categoryPool = resultSet.getCategoryPool() != null && resultSet.getCategoryPool() == 0 ? false : true;
        this.applyStatus  = resultSet.getApplyStatus() != null && resultSet.getApplyStatus() == 0 ? false : true;
        this.minRoomPrice = resultSet.getMinRoomPrice();
        this.countReview = resultSet.getCountReview() == null ? 0 : resultSet.getCountReview();
    }

    public static List<Accommodations> getList(List<GetAccommodationListResultSet> resultSets){
        List<Accommodations> accommodationses = new ArrayList<>();
        for(GetAccommodationListResultSet getAccommodationListResultSet : resultSets){
            Accommodations accommodations = new Accommodations(getAccommodationListResultSet);
            accommodationses.add(accommodations);
        }
        return accommodationses;
    }
    
}
