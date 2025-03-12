package com.roomly.roomly.service;

import org.springframework.http.ResponseEntity;

import com.roomly.roomly.dto.request.accommodation.PatchAccommodationRequestDto;
import com.roomly.roomly.dto.request.accommodation.ResgistAccomodation;
import com.roomly.roomly.dto.request.subImages.PatchAccommodationImageRequsetDto;
import com.roomly.roomly.dto.response.accommodation.GetAccommodationResponseDto;
import com.roomly.roomly.dto.response.accommodation.GetAccommodationImagesResponseDto;
import com.roomly.roomly.dto.response.accommodation.GetAccommodationListResponseDto;
import com.roomly.roomly.dto.response.accommodation.GetReservedAccommodationResponseDto;
import com.roomly.roomly.dto.response.ResponseDto;

public interface AccommodationService {

    // Accommodation 등록
    ResponseEntity<ResponseDto> postAccommodation(ResgistAccomodation resgistAccomodation); 
    // Accommodation 정보 수정
    ResponseEntity<ResponseDto> patchAccommodation(PatchAccommodationRequestDto dto, String accommodationName, String hostId);
    // Accommodation Sub Images 수정
    ResponseEntity<ResponseDto> patchAccommodationImage(PatchAccommodationImageRequsetDto dto, String accommodationName, String accommodationImage);
    // Accommodation 정보 보기
    ResponseEntity<? super GetAccommodationResponseDto> getAccommodation(String accommodationName);
    // 예약된 객실 안보이는 숙소 Accommodation정보보기
    ResponseEntity<? super GetReservedAccommodationResponseDto> getReservedAccommodation(String accommodationName, String CheckInDay, String CheckOutDay);
    // Accommodation Sub Images 보기
    ResponseEntity<? super GetAccommodationImagesResponseDto> getAccommodationImages(String accommodationName);
    // Accommodation 리스트 보기
    ResponseEntity<? super GetAccommodationListResponseDto> getAccommodationList();
    // Accommodation 삭제 
    ResponseEntity<ResponseDto> deleteAccommodation(String accommodationName);
}
