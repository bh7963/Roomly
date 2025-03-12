package com.roomly.roomly.dto.request.guest;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AddBookMarkRequestDto {
    
    @NotBlank
    private String guestId;
    @NotBlank
    private String accommodationName;
}
