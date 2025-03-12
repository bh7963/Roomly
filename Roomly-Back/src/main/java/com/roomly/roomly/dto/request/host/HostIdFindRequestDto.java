package com.roomly.roomly.dto.request.host;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class HostIdFindRequestDto {
    
    @NotBlank
    private String hostName;
    @NotBlank
    @Pattern(regexp = "^[0-9]{11}$")
    private String hostTelNumber;

}
