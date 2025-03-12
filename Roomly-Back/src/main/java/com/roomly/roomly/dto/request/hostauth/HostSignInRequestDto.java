package com.roomly.roomly.dto.request.hostauth;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class HostSignInRequestDto {
    
    @NotBlank
    private String hostId;
    @NotBlank
    private String hostPw;
}
