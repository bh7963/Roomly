package com.roomly.roomly.dto.request.hostauth;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class HostBusinessImageRequestDto {
    
    @NotBlank
    private String businessImage;
}
