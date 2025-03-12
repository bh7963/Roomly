package com.roomly.roomly.entity;


import com.roomly.roomly.dto.request.room.PatchRoomRequestDto;
import com.roomly.roomly.dto.request.room.PostRoomRequestDto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="room")
@Table(name="room")

public class RoomEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roomId;
    private String roomName;
    private Integer roomPrice;
    private String roomCheckIn;
    private String roomCheckOut;
    private Integer roomTotalGuest;
    private String accommodationName;
    private String roomInfo;
    private String roomMainImage;

    public RoomEntity(PostRoomRequestDto roomRequestDto, String accommodationName) {
        
            this.roomName = roomRequestDto.getRoomName();
            this.roomPrice = roomRequestDto.getRoomPrice();
            this.roomCheckIn = roomRequestDto.getRoomCheckIn();
            this.roomCheckOut = roomRequestDto.getRoomCheckOut();
            this.roomTotalGuest = roomRequestDto.getRoomTotalGuest();
            this.accommodationName = accommodationName;
            this.roomMainImage = roomRequestDto.getRoomMainImage();
            this.roomInfo = roomRequestDto.getRoomInfo();
            
    }

    public void patch(PatchRoomRequestDto dto){
        this.roomName = dto.getRoomName();
        this.roomPrice = dto.getRoomPrice();
        this.roomCheckIn = dto.getRoomCheckIn();
        this.roomCheckOut = dto.getRoomCheckOut();
        this.roomTotalGuest = dto.getRoomTotalGuest();
        this.roomMainImage = dto.getRoomMainImage();
        this.roomInfo = dto.getRoomInfo();
    }
}
