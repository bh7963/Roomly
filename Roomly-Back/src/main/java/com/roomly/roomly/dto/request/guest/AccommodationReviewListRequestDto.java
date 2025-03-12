package com.roomly.roomly.dto.request.guest;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AccommodationReviewListRequestDto {
    
    
    @NotBlank
    private String guestName;
    @NotBlank
    private String reviewDate;
    @NotBlank
    private String reviewContent;
    
    @Min(1)
    @Max(5)
    private Integer reviewGradeInteger;
}