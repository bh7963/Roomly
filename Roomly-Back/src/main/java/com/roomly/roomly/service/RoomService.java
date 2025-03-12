package com.roomly.roomly.service;

import org.springframework.http.ResponseEntity;

import com.roomly.roomly.dto.response.room.GetRoomResponseDto;
import com.roomly.roomly.dto.response.room.GetRoomImageResponseDto;
import com.roomly.roomly.dto.request.room.PatchRoomRequestDto;
import com.roomly.roomly.dto.request.subImages.PatchRoomImageRequestDto;
import com.roomly.roomly.dto.response.ResponseDto;

public interface RoomService {


    // 객실 정보 가져오기
    ResponseEntity<? super GetRoomResponseDto> getRoom(Integer roomId);
    // 객실 서브 이미지 가져오기
    ResponseEntity<? super GetRoomImageResponseDto> getRoomImage(Integer roomId);
     // 객실 정보 수정
    ResponseEntity<ResponseDto> patchRoom(PatchRoomRequestDto dto, String accommodationName, Integer roomId);
    // 객실 서브 이미지 수정
    ResponseEntity<ResponseDto> patchRoomImage(PatchRoomImageRequestDto dto, String accommodationName, Integer roomId, String roomImage);
    // 객실 삭제
    ResponseEntity<ResponseDto> deleteRoom(Integer roomId);
    
}
