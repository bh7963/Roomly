package com.roomly.roomly.dto.response.room;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.roomly.roomly.dto.response.ResponseCode;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.ResponseMessage;
import com.roomly.roomly.entity.RoomEntity;

import lombok.Getter;

@Getter
public class GetRoomResponseDto extends ResponseDto {

    private Integer roomId;
    private String roomName;
    private String roomCheckIn;
    private String roomCheckOut;
    private String roomMainImage;
    private String roomInfo;

    public GetRoomResponseDto(RoomEntity roomEntity){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.roomId = roomEntity.getRoomId();
        this.roomName = roomEntity.getRoomName();
        this.roomCheckIn = roomEntity.getRoomCheckIn();
        this.roomCheckOut = roomEntity.getRoomCheckOut();
        this.roomMainImage = roomEntity.getRoomMainImage();
        this.roomInfo = roomEntity.getRoomInfo();
    }

    public static ResponseEntity<GetRoomResponseDto> success(RoomEntity roomEntity){
        GetRoomResponseDto responseBody = new GetRoomResponseDto(roomEntity);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    
}
