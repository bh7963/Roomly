package com.roomly.roomly.common.object;

import java.util.ArrayList;
import java.util.List;

import com.roomly.roomly.entity.RoomImageEntity;
import com.roomly.roomly.repository.resultSet.GetRoomResultSet;

import lombok.Getter;

@Getter
public class Room {
    private Integer roomId;
    private String roomName;
    private String roomMainImage;
    private Integer roomPrice;
    private String roomCheckIn;
    private String roomCheckOut;
    private String roomInfo;
    private Integer roomTotalGuest;
    private List<String> roomImages;

    public Room (GetRoomResultSet resultSet, List<RoomImageEntity> roomImageEntities){

        List<String> roomImages = new ArrayList<>();
        for (RoomImageEntity roomImageEntity: roomImageEntities) {
            roomImages.add(roomImageEntity.getRoomImage());  
        };
        
        this.roomId = resultSet.getRoomId();
        this.roomName = resultSet.getRoomName();
        this.roomMainImage = resultSet.getRoomMainImage();
        this.roomPrice = resultSet.getRoomPrice();
        this.roomCheckIn = resultSet.getRoomCheckIn();
        this.roomCheckOut = resultSet.getRoomCheckOut();
        this.roomInfo = resultSet.getRoomInfo();
        this.roomTotalGuest = resultSet.getRoomTotalGuest();
        this.roomImages = roomImages;
    }
    
}
