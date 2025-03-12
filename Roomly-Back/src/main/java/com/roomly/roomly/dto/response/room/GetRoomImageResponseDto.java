package com.roomly.roomly.dto.response.room;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import com.roomly.roomly.dto.response.ResponseCode;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.ResponseMessage;
import com.roomly.roomly.entity.RoomEntity;
import com.roomly.roomly.entity.RoomImageEntity;

import lombok.Getter;

@Getter
public class GetRoomImageResponseDto extends ResponseDto {

    private String roomMainImage;
    private List<String> roomImageList;

    public GetRoomImageResponseDto(RoomEntity roomEntity, List<RoomImageEntity> roomImageEntities){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        
        List<String> roomImages = new ArrayList<>();
        for (RoomImageEntity roomImageEntity: roomImageEntities) {
            roomImages.add(roomImageEntity.getRoomImage());  
        };
        this.roomMainImage = roomEntity.getRoomMainImage();
        this.roomImageList = roomImages;
    }

    public static ResponseEntity<GetRoomImageResponseDto> success(
        RoomEntity roomEntity, 
        List<RoomImageEntity> roomImageEntities
    ){
        GetRoomImageResponseDto responseBody = new GetRoomImageResponseDto(roomEntity, roomImageEntities);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
    
}
