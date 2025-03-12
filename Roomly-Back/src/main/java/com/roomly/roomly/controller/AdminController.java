package com.roomly.roomly.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.roomly.roomly.dto.request.admin.PatchEntryStatusRequestDto;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.admin.EntryHostRespnoseDto;
import com.roomly.roomly.dto.response.admin.GetAccommodationListResponseDto;
import com.roomly.roomly.dto.response.admin.GetGuestListResponseDto;
import com.roomly.roomly.dto.response.admin.GetHostListResponseDto;
import com.roomly.roomly.service.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/roomly/admin")
@RequiredArgsConstructor
public class AdminController {
    
    private final AdminService adminService;

    // 게스트 정보 리스트 조회 api
    @GetMapping("/guest-info/list")
    public ResponseEntity<? super GetGuestListResponseDto> getGuestList(){
        ResponseEntity<? super GetGuestListResponseDto> responseBody = adminService.getGuestList();
        return responseBody;
    }
    // 호스트 정보 리스트 조회 api
    @GetMapping("/host-info/list")
    public ResponseEntity<? super GetHostListResponseDto> getHostList(){
        ResponseEntity<? super GetHostListResponseDto> responseBody = adminService.getHostList();
        return responseBody;
    }

    // 호스트정보 상세보기(어드민이 회원가입시 확인해야할 할때 사용) api
    @GetMapping("/info/detail/{hostId}")
    public ResponseEntity<? super EntryHostRespnoseDto> getEntryhost(
        @PathVariable("hostId") String hostId
    ){
        ResponseEntity<? super EntryHostRespnoseDto> responseBody = adminService.getHost(hostId);
        return responseBody;
    }

    // 호스트 계정 승인 상태 변경 api
    @PatchMapping("/update/status/{hostId}")
    public ResponseEntity<ResponseDto> patchEntryStatus(
        @RequestBody PatchEntryStatusRequestDto requestBody,
        @PathVariable("hostId") String hostId
    ){
        ResponseEntity<ResponseDto> responseBody = adminService.patchEntryStatus(requestBody, hostId);
        return responseBody;
    }

    // 숙소 리스트(숙소 승인 상태에 따라)조회 api
    @GetMapping("/accommodation-list")
    public ResponseEntity<? super GetAccommodationListResponseDto> getAccommodationList(){
        ResponseEntity<? super GetAccommodationListResponseDto> responseBody = adminService.getAccommodationList();
        return responseBody;
    }

    // 숙소 승인 상태 변경 api
    @PatchMapping("/accommodation-apply/{accommodationName}")
    public ResponseEntity<ResponseDto> patchApplyStatus(
        @RequestBody PatchEntryStatusRequestDto requestBody,
        @PathVariable("accommodationName") String accommodationName
    ){
        ResponseEntity<ResponseDto> responseBody = adminService.patchApplyStatus(accommodationName);
        return responseBody;
    }

}
