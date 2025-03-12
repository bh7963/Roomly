package com.roomly.roomly.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.roomly.roomly.entity.RoomImageEntity;
import com.roomly.roomly.entity.pk.RoomImagePk;

@Repository
public interface RoomImageRepository extends JpaRepository<RoomImageEntity, RoomImagePk> {
    
    List<RoomImageEntity> findByRoomId(Integer roomId);
    RoomImageEntity findByRoomImage(String roomImage);
    boolean existsByRoomImage(String roomImage);
    boolean existsByRoomIdAndRoomImage(Integer roomId, String roomImage);

    @Modifying
    @Transactional
    @Query(value = 
    "UPDATE room_image SET room_image = :ChangeRoomImage WHERE room_image = :roomImage",
    nativeQuery = true
    )
    void patchRoomImage(@Param("ChangeRoomImage") String ChangeRoomImage, @Param("roomImage") String roomImage);
}
