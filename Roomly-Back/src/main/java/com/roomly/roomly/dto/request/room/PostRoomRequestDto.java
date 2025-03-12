package com.roomly.roomly.dto.request.room;

import java.util.List;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostRoomRequestDto {
    
    @NotBlank
    private String roomName;
    @NotNull
    private Integer roomPrice;
    @NotBlank
    private String roomCheckIn;
    @NotBlank
    private String roomCheckOut;
    @NotNull
    private Integer roomTotalGuest;
    @NotBlank
    private String roomMainImage;
    @NotBlank
    private String roomInfo;
    private List<String> roomImages;


}
