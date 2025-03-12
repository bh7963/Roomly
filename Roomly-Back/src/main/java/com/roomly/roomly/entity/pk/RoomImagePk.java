package com.roomly.roomly.entity.pk;

import java.io.Serializable;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomImagePk implements Serializable {
    @Column(name="room_id")
    Integer roomId;
    @Column(name="room_image")
    String roomImage;
}
