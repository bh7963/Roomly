package com.roomly.roomly.service;

import org.springframework.http.ResponseEntity;

import com.roomly.roomly.dto.request.useInformations.PatchUseInformationRequestDto;
import com.roomly.roomly.dto.response.ResponseDto;

public interface UseInfomationService {
    
     // 숙소 이용정보 수정
    ResponseEntity<ResponseDto> patchUseInformation(PatchUseInformationRequestDto dto, String accommodationName, Integer autoKey);
    // 숙소 이용정보 삭제
    ResponseEntity<ResponseDto> deleteUseInformation(Integer autoKey);
}
