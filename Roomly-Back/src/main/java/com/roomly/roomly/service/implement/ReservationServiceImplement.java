package com.roomly.roomly.service.implement;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.roomly.roomly.dto.request.payment.PaymentSuccessRequestDto;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.guest.GetGuestReservationViewResponseDto;
import com.roomly.roomly.dto.response.guest.GetReservationStatusResponseDto;
import com.roomly.roomly.entity.ReservationEntity;
import com.roomly.roomly.repository.GuestRepository;
import com.roomly.roomly.repository.ReservationRepository;
import com.roomly.roomly.repository.RoomRepository;
import com.roomly.roomly.repository.resultSet.GetReservationStatusResultSet;
import com.roomly.roomly.repository.resultSet.GetReservationViewResultSet;
import com.roomly.roomly.service.ReservationService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservationServiceImplement implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final GuestRepository guestRepository;
    private final RoomRepository roomRepository;

    @Override
    // 예약 결제 창
    public ResponseEntity<? super GetGuestReservationViewResponseDto> getReservationView(String guestId, Integer roomId) {
        GetReservationViewResultSet resultSet = null;
        
        try {
            
            boolean isGuest = guestRepository.existsByGuestId(guestId);
            if (!isGuest) return ResponseDto.noExistGuest();
            boolean isRoom = roomRepository.existsByRoomId(roomId);
            if (!isRoom) return ResponseDto.noExistRoom();

            resultSet = roomRepository.getReservationView(guestId, roomId);
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();

        }
        return GetGuestReservationViewResponseDto.success(resultSet);
    }

    @Override
    // 예약 현황 확인하기
    public ResponseEntity<? super GetReservationStatusResponseDto> reservationStatus(String guestId) {
        
        List<GetReservationStatusResultSet> resultSet = new ArrayList<>();

        try {

            boolean noExistsGuestId = guestRepository.existsByGuestId(guestId);
            if(!noExistsGuestId) return ResponseDto.noExistUserId();

            resultSet = reservationRepository.getReservationStatus(guestId);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetReservationStatusResponseDto.success(resultSet);
    }

    // 유효성검사 (결제후)
    @Override
    public boolean isRoomAvailable(Integer roomId, LocalDate checkIn, LocalDate checkOut) {
        // DB에서 해당 객실(roomId)로 겹치는 날짜 범위의 예약이 있는지 확인
        List<ReservationEntity> overlappingReservations = reservationRepository.findOverlappingReservations(roomId, checkIn, checkOut);
        return overlappingReservations.isEmpty();
    }
    
    // 예약값 넣기(결제후)
    @Override
    public ResponseEntity<ResponseDto> createReservation(PaymentSuccessRequestDto dto) {

        String guestId = dto.getGuestId();
        Integer roomId = dto.getRoomId();
        
        try {
            
            boolean isExistsGuestId = guestRepository.existsByGuestId(guestId);
            if(!isExistsGuestId) return ResponseDto.noExistUserId();

            boolean isExistsRoomId = roomRepository.existsByRoomId(roomId);
            if(!isExistsRoomId) return ResponseDto.noExistRoom();

            // 날짜 형식을 LocalDate로 변환
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate checkInDate = LocalDate.parse(dto.getCheckInDate(), formatter);
            LocalDate checkOutDate = LocalDate.parse(dto.getCheckOutDate(), formatter);
            
            // 예약 가능 여부 확인
            if (!isRoomAvailable(dto.getRoomId(), checkInDate, checkOutDate)) {
                return ResponseDto.duplicatedReservation();
            }
            
            // 새 예약 생성 및 저장
            ReservationEntity reservationEntity = new ReservationEntity(dto);
            reservationRepository.save(reservationEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return ResponseDto.success();
    }
    
}
