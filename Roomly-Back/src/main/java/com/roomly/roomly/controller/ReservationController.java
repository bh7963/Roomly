package com.roomly.roomly.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.roomly.roomly.dto.request.payment.PaymentSuccessRequestDto;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.guest.GetGuestReservationViewResponseDto;
import com.roomly.roomly.dto.response.guest.GetReservationStatusResponseDto;
import com.roomly.roomly.service.ReservationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/roomly/reservation")
@RequiredArgsConstructor
public class ReservationController {
    
    private final ReservationService reservationService;

    @PostMapping("/createReservation")
    // 결제성공후
    public ResponseEntity<ResponseDto> createReservation(
        @RequestBody @Valid PaymentSuccessRequestDto requestBody
    ) {
        ResponseEntity<ResponseDto> response = reservationService.createReservation(requestBody);
        return response;
    }

    // 예약 및 결제 창
    @GetMapping("/reservationView/{guestId}/{roomId}")
    public ResponseEntity<? super GetGuestReservationViewResponseDto> getReservationView(
        @PathVariable("guestId") String guestId,
        @PathVariable("roomId") Integer roomId
    ) {
        ResponseEntity<? super GetGuestReservationViewResponseDto> response = reservationService.getReservationView(guestId, roomId);
        return response;
    }

    // 예약현황리스트
    @GetMapping("/reservation-status/{guestId}")
    public ResponseEntity<? super GetReservationStatusResponseDto> reservationStatus(
        @PathVariable("guestId") String guestId
    ){
        ResponseEntity<? super GetReservationStatusResponseDto> response = reservationService.reservationStatus(guestId);
        return response;
    }

}
