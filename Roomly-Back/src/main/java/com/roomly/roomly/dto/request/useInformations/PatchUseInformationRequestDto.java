package com.roomly.roomly.dto.request.useInformations;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PatchUseInformationRequestDto {
    
    @NotBlank
    private String title;
    @NotBlank 
    private String context;
}
