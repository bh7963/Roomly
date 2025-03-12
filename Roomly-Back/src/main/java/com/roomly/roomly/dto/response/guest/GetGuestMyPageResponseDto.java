package com.roomly.roomly.dto.response.guest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.roomly.roomly.dto.response.ResponseCode;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.ResponseMessage;
import com.roomly.roomly.entity.GuestEntity;
import lombok.Getter;

@Getter
public class GetGuestMyPageResponseDto extends ResponseDto{
    
    private String guestName;
    private String guestTelNumber;
    private String guestId;
    private String guestPw;
    private String joinPath;
    private String snsId;

    
    private GetGuestMyPageResponseDto(GuestEntity guestEntitiys) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.guestName = guestEntitiys.getGuestName();
        this.guestTelNumber = guestEntitiys.getGuestTelNumber();
        this.guestId = guestEntitiys.getGuestId();
        this.guestPw = guestEntitiys.getGuestPw();
        this.joinPath = guestEntitiys.getJoinPath();
        this.snsId = guestEntitiys.getSnsId();
    }

    public static ResponseEntity<GetGuestMyPageResponseDto> success(GuestEntity guestEntitiys) {
        GetGuestMyPageResponseDto responseBody = new GetGuestMyPageResponseDto(guestEntitiys);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
    
}
