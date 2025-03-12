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
public class GuestReviewListRequestDto {
    
    private Integer reservationId;
    @NotBlank
    private String reviewContent;
    @Min(1)
    @Max(5)
    private Integer reviewGrade;

}