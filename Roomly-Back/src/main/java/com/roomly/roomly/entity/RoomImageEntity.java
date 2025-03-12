package com.roomly.roomly.entity;


import com.roomly.roomly.entity.pk.RoomImagePk;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="room_image")
@Table(name="room_image")
@IdClass(RoomImagePk.class)
public class RoomImageEntity {
    
    @Id
    private Integer roomId;
    @Id
    private String roomImage;

    
}
