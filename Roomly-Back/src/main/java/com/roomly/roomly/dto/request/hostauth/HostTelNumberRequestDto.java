package com.roomly.roomly.dto.request.hostauth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class HostTelNumberRequestDto {
    
    @NotBlank
    @Pattern(regexp = "^[0-9]{11}$")
    private String hostTelNumber;
}
