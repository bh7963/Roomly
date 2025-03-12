package com.roomly.roomly.dto.request.guest;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class GuestIdFindRequestDto {
    
    private String guestName;
    private String guestTelNumber;

}
