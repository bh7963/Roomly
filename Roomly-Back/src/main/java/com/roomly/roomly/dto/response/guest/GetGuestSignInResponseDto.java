package com.roomly.roomly.dto.response.guest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.roomly.roomly.dto.response.ResponseCode;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.ResponseMessage;
import com.roomly.roomly.entity.GuestEntity;

import lombok.Getter;

@Getter
// 게스트 정보 응답 클래스
public class GetGuestSignInResponseDto extends ResponseDto{
    
    private String guestId;
    private String guestPw;
    private String guestName;
    private String guestTelNumber;
    private String joinPath;
    private String snsId;

    public GetGuestSignInResponseDto(GuestEntity guestEntity){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.guestId = guestEntity.getGuestId();
        this.guestPw = guestEntity.getGuestPw();
        this.guestName = guestEntity.getGuestName();
        this.guestTelNumber = guestEntity.getGuestTelNumber();
        this.joinPath = guestEntity.getJoinPath();
        this.snsId = guestEntity.getSnsId();
    }

    public static ResponseEntity<GetGuestSignInResponseDto> success(GuestEntity guestEntity) {
        GetGuestSignInResponseDto responseBody = new GetGuestSignInResponseDto(guestEntity); 
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

}
