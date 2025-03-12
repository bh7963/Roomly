package com.roomly.roomly.service;

import java.time.LocalDate;

import org.springframework.http.ResponseEntity;

import com.roomly.roomly.dto.request.payment.PaymentSuccessRequestDto;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.guest.GetGuestReservationViewResponseDto;
import com.roomly.roomly.dto.response.guest.GetReservationStatusResponseDto;

public interface ReservationService {
    

    // 예약값 입력(결제후)
    boolean isRoomAvailable(Integer roomId, LocalDate checkIn, LocalDate checkOut);
    ResponseEntity<ResponseDto> createReservation(PaymentSuccessRequestDto dto);

    // 예약및 결제 창
    ResponseEntity<? super GetGuestReservationViewResponseDto> getReservationView(String guestId, Integer roomId);
    // 예약현황 리스트
    ResponseEntity<? super GetReservationStatusResponseDto> reservationStatus(String guestId);
}