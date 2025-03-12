package com.roomly.roomly.dto.request.subImages;


import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostRoomImageRequestDto {
    
    @NotBlank
    private Integer roomId;
    @NotBlank
    private String roomImage;
}
