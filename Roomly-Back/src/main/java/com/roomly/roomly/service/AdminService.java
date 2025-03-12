package com.roomly.roomly.service;

import org.springframework.http.ResponseEntity;

import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.admin.EntryHostRespnoseDto;
import com.roomly.roomly.dto.response.admin.GetGuestListResponseDto;
import com.roomly.roomly.dto.response.admin.GetHostListResponseDto;


import com.roomly.roomly.dto.request.admin.PatchEntryStatusRequestDto;
import com.roomly.roomly.dto.response.admin.GetAccommodationListResponseDto;


public interface AdminService {

    // 게스트 정보 리스트 조회
    ResponseEntity<? super GetGuestListResponseDto> getGuestList();
    // 호스트 정보 리스트 조회(관리자가 호스트 사업자 정보 파일 확인 후 승인 용도)
    ResponseEntity<? super GetHostListResponseDto> getHostList();
    // 호스트 정보 상세보기(관리자가 호스트 사업자 정보 파일 확인 후 승인 용도)
    ResponseEntity<? super EntryHostRespnoseDto> getHost(String hostId);
    // 흐스트 승인 상태 변경 
    ResponseEntity<ResponseDto> patchEntryStatus(PatchEntryStatusRequestDto dto, String hostId);
    // 숙소 리스트 조회(승인상태 기다리는 리스트)
    ResponseEntity<? super GetAccommodationListResponseDto> getAccommodationList();
    // 숙소 승인 상태 변경
    ResponseEntity<ResponseDto> patchApplyStatus(String accommodationName);
    
}
