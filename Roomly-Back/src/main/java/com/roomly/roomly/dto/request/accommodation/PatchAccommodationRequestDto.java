package com.roomly.roomly.dto.request.accommodation;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PatchAccommodationRequestDto {

    @NotBlank
    private String accommodationMainImage;
    @NotBlank
    private String accommodationIntroduce;
    @NotBlank
    private String categoryArea;
    private boolean categoryPet;
    private boolean categoryNonSmokingArea;
    private boolean categoryIndoorSpa;
    private boolean categoryDinnerParty;
    private boolean categoryWifi;
    private boolean categoryCarPark;
    private boolean categoryPool;
    
}
