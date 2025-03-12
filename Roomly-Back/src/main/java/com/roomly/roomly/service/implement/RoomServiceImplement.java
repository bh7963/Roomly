package com.roomly.roomly.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;

import com.roomly.roomly.dto.request.room.PatchRoomRequestDto;
import com.roomly.roomly.dto.request.subImages.PatchRoomImageRequestDto;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.room.GetRoomImageResponseDto;
import com.roomly.roomly.dto.response.room.GetRoomResponseDto;
import com.roomly.roomly.entity.AccommodationEntity;
import com.roomly.roomly.entity.RoomEntity;
import com.roomly.roomly.entity.RoomImageEntity;
import com.roomly.roomly.repository.AccommodationRepository;
import com.roomly.roomly.repository.ReservationRepository;
import com.roomly.roomly.repository.RoomImageRepository;
import com.roomly.roomly.repository.RoomRepository;
import com.roomly.roomly.service.RoomService;
import java.util.Date;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomServiceImplement implements RoomService {

    private final RoomRepository roomRepository;
    private final RoomImageRepository roomImageRepository;
    private final ReservationRepository reservationRepository;
    private final AccommodationRepository accommodationRepository;

    
    // 객실 정보 가져오기 메서드
    @Override
    public ResponseEntity<? super GetRoomResponseDto> getRoom(Integer roomId) {
        RoomEntity roomEntity = null;
        try {

            roomEntity = roomRepository.findByRoomId(roomId);
            if (roomEntity == null) return ResponseDto.noExistRoom();
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetRoomResponseDto.success(roomEntity);
    }

    // 객실 서브 이미지 가져오기 메서드
    @Override
    public ResponseEntity<? super GetRoomImageResponseDto> getRoomImage(Integer roomId) {
        RoomEntity roomEntity;
        List<RoomImageEntity> roomImageEntities = new ArrayList<>();
        try {

            roomEntity = roomRepository.findByRoomId(roomId);
            if (roomEntity == null) return ResponseDto.noExistRoom();

            roomImageEntities = roomImageRepository.findByRoomId(roomId);
            if (roomImageEntities == null) return ResponseDto.noExistImage();

            
            
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetRoomImageResponseDto.success(roomEntity, roomImageEntities);
    }

    // 객실 수정 메서드
    @Override
    public ResponseEntity<ResponseDto> patchRoom(PatchRoomRequestDto dto, String accommodationName, Integer roomId) {
        
        try {
            RoomEntity roomEntity = roomRepository.findByAccommodationNameAndRoomId(accommodationName, roomId);
            if (roomEntity == null ) return ResponseDto.noExistRoom();

            String changeRoomName = dto.getRoomName();
            boolean isExistedRoomName = roomRepository.existsByAccommodationNameAndRoomName(accommodationName, changeRoomName);
            if(isExistedRoomName) return ResponseDto.duplicatedRoom();

            roomEntity.patch(dto);
            roomRepository.save(roomEntity);
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return ResponseDto.success();
    }

    // 객실 서브 이미지 수정 메서드
    @Override
    public ResponseEntity<ResponseDto> patchRoomImage(
        PatchRoomImageRequestDto dto, 
        String accommodationName,
        Integer roomId,
        String roomImage) {

        try {
            AccommodationEntity accommodationEntity = accommodationRepository.findByAccommodationName(accommodationName);
            if (accommodationEntity == null) return ResponseDto.noExistAccommodation();

            RoomEntity roomEntity = roomRepository.findByRoomId(roomId);
            if(roomEntity == null) return ResponseDto.noExistRoom();

            String imageUrl = dto.getRoomImage();
            boolean isMatch = roomImageRepository.existsByRoomImage(imageUrl);
            if(isMatch) return ResponseDto.duplicatedImage();

            RoomImageEntity roomImageEntity = roomImageRepository.findByRoomImage(roomImage);
            if(roomImageEntity == null ) return ResponseDto.noExistImage();

            roomImageRepository.patchRoomImage(imageUrl, roomImage);
            roomImageRepository.save(roomImageEntity);
    
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return ResponseDto.success();
    }


    // 객실 삭제 메서드
    @Override
    public ResponseEntity<ResponseDto> deleteRoom(Integer roomId) {

        List<Date> reservationEndDay = new ArrayList<>();

        try {

            RoomEntity roomEntity = roomRepository.findByRoomId(roomId);
            if (roomEntity == null ) return ResponseDto.noExistRoom();

            reservationEndDay = reservationRepository.getReservationEnd(roomId);

            Date now = new Date();
            for(Date date : reservationEndDay){
                if(!date.before(now)) return ResponseDto.existedReservation();
            }

            roomRepository.deleteByRoomId(roomId);

            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return ResponseDto.success();
    }
        
}
