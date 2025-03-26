package com.roomly.roomly.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.roomly.roomly.dto.response.reservation.GetReservationResponseDto;
import com.roomly.roomly.dto.request.host.HostMyPageRequestDto;
import com.roomly.roomly.dto.request.host.PatchHostPasswordRequestDto;
import com.roomly.roomly.dto.request.host.PatchHostTelNumberRequestDto;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.host.GetHostResponseDto;
import com.roomly.roomly.dto.response.host.GetHostSignInResponseDto;
import com.roomly.roomly.dto.response.host.GetHostAccommodationListResponseDto;

import com.roomly.roomly.service.HostService;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/roomly/host")
public class HostController {

    private final HostService hostService;
    
    // 호스트 정보 상세보기 api
    @PostMapping("/info")
    public ResponseEntity<? super GetHostResponseDto> getHost(
    @RequestBody @Valid HostMyPageRequestDto requestBody,    
    @AuthenticationPrincipal String hostId){
        ResponseEntity<? super GetHostResponseDto> responseBody = hostService.getHost(requestBody, hostId);
            return responseBody;
    }

    // 호스트 패스워드 변경 api
    @PatchMapping("/update-password")
    public ResponseEntity<ResponseDto> patchPassword(
        @RequestBody @Valid PatchHostPasswordRequestDto requestBody,
        @AuthenticationPrincipal String hostId
    ){
        ResponseEntity<ResponseDto> responseBody = hostService.patchHostPassword(requestBody, hostId);
        return responseBody;
    }
    // 호스트 전화번호 변경 api
    @PatchMapping("/update-tel-number")
    public ResponseEntity<ResponseDto> patchTelNumber(
        @RequestBody @Valid PatchHostTelNumberRequestDto requestBody,
        @AuthenticationPrincipal String hostId
    ){
        ResponseEntity<ResponseDto> repsonseBody = hostService.patchHostTelNumber(requestBody, hostId);
        return repsonseBody;
    }

    // 호스트 아이디별 숙소 리스트
    @GetMapping("/list")
    public ResponseEntity<? super GetHostAccommodationListResponseDto> getHostAccommodationList(
        @AuthenticationPrincipal String hostId
    ){
        ResponseEntity<? super GetHostAccommodationListResponseDto> responseBody = hostService.getList(hostId);
        return responseBody;
    } 

    // 호스트 숙소별 예약 리스트 가져오기 api
    @GetMapping("/reservation")
    public ResponseEntity<? super GetReservationResponseDto> getReservaitonList(
        @AuthenticationPrincipal String hostId
    ){
        ResponseEntity<? super GetReservationResponseDto> responseBody = hostService.getRerservaitonList(hostId);
        return responseBody;
    }
    // 호스트 정보 보내기
    @GetMapping("/sign-in")
    public ResponseEntity<? super GetHostSignInResponseDto> getHostSignIn(
        @AuthenticationPrincipal String hostId
    ) {
        ResponseEntity<? super GetHostSignInResponseDto> response = hostService.getHostSignIn(hostId);
        return response;
    }
}
