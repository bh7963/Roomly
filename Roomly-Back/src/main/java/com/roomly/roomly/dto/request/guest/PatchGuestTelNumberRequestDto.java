package com.roomly.roomly.dto.request.guest;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PatchGuestTelNumberRequestDto {
    
    @NotBlank
    @Pattern(regexp="^[0-9]{11}$") 
    private String guestTelNumber;
}
