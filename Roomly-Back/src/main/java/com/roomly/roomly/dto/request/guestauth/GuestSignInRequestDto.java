package com.roomly.roomly.dto.request.guestauth;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GuestSignInRequestDto {
    
    @NotBlank
    private String guestId;
    @NotBlank
    private String guestPw; 
}
