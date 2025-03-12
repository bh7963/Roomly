package com.roomly.roomly.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.roomly.roomly.dto.request.accommodation.PatchAccommodationRequestDto;
import com.roomly.roomly.dto.request.accommodation.ResgistAccomodation;
import com.roomly.roomly.dto.request.subImages.PatchAccommodationImageRequsetDto;
import com.roomly.roomly.dto.request.useInformations.PatchUseInformationRequestDto;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.service.AccommodationService;
import com.roomly.roomly.service.UseInfomationService;
import com.roomly.roomly.dto.response.accommodation.GetAccommodationResponseDto;
import com.roomly.roomly.dto.response.accommodation.GetAccommodationListResponseDto;
import com.roomly.roomly.dto.response.accommodation.GetAccommodationImagesResponseDto;
import com.roomly.roomly.dto.response.accommodation.GetReservedAccommodationResponseDto;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/roomly/accommodation")
@RequiredArgsConstructor
public class AccommodationController {

    private final AccommodationService accommodationService;
    private final UseInfomationService useInfomationService;

    // 숙소 등록
    @PostMapping("/register")
    public ResponseEntity<ResponseDto> postAccommodation(
        @RequestBody @Valid ResgistAccomodation reqeustBody){
            ResponseEntity<ResponseDto> responseBody = accommodationService.postAccommodation(reqeustBody);
            return responseBody;
    }
    // 숙소 상세보기(숙소에 해당하는 객실 및 이용정보)
    @GetMapping("/{accommodationName}")
    public ResponseEntity<? super GetAccommodationResponseDto> getAccommodation(
        @PathVariable("accommodationName") String accommodationName
    ){
        ResponseEntity<? super GetAccommodationResponseDto> responseBody = accommodationService.getAccommodation(accommodationName);
        return responseBody;
    }

    // 숙소 정보 수정 
    @PatchMapping("/update/{accommodationName}")
    public ResponseEntity<ResponseDto> patchAccommodation(
        @PathVariable("accommodationName") String accommodationName,
        @RequestBody PatchAccommodationRequestDto requestBody,
        @AuthenticationPrincipal String hostId
    ){
        ResponseEntity<ResponseDto> responseBody = accommodationService.patchAccommodation(requestBody,accommodationName, hostId);
        return responseBody;
    }
    
    // 숙소 이용정보 수정
    @PatchMapping("/information/update/{accommodationName}/{autoKey}")
    public ResponseEntity<ResponseDto> patchUseInformation(
        @RequestBody @Valid PatchUseInformationRequestDto requestBody,
        @PathVariable("accommodationName") String accommodationName,
        @PathVariable("autoKey") Integer autoKey
        ){
            ResponseEntity<ResponseDto> responseBody = useInfomationService.patchUseInformation(requestBody, accommodationName, autoKey);
            return responseBody;
        }
    // 숙소 서브 이미지 수정
    @PatchMapping("/image/update/{accommodationName}/{accommodationImage}")
    public ResponseEntity<ResponseDto> patchAccommodationImage(
        @RequestBody @Valid PatchAccommodationImageRequsetDto requestBody,
        @PathVariable("accommodationName") String accommodationName,
        @PathVariable("accommodationImage") String accommodationImage
    ){
        ResponseEntity<ResponseDto> responseBody = accommodationService.patchAccommodationImage(requestBody, accommodationName, accommodationImage);
        return responseBody;
    }
    // 숙소 이미지들 상세보기
    @GetMapping("/image/{accommodationName}")
    public ResponseEntity<? super GetAccommodationImagesResponseDto> getAccommodationImages(
        @PathVariable("accommodationName") String accommodationName
    ){
        ResponseEntity<? super GetAccommodationImagesResponseDto> responseBody = accommodationService.getAccommodationImages(accommodationName);
        return responseBody;
    }

    // 숙소 리스트(게스트가 확인할 수 있는) 조회
    @GetMapping("/list")
    public ResponseEntity<? super GetAccommodationListResponseDto> getAccommodationList(){
        ResponseEntity<? super GetAccommodationListResponseDto> responseBody = accommodationService.getAccommodationList();
        return responseBody;
    }
    
    // 숙소 삭제
    @DeleteMapping("/delete/{accommodationName}")
    public ResponseEntity<ResponseDto> deleteAccommodation(
        @PathVariable("accommodationName") String accommodationName,
        @AuthenticationPrincipal String hostId
    ){
        ResponseEntity<ResponseDto> responseBody = accommodationService.deleteAccommodation(accommodationName);
        return responseBody;
    }

    // 숙소 이용정보 삭제
    @DeleteMapping("/information/delete/{autoKey}")
    public ResponseEntity<ResponseDto> deleteUseInformation(
        @PathVariable("autoKey") Integer autoKey,
        @AuthenticationPrincipal String hostId
    ){
        ResponseEntity<ResponseDto> responseBody = useInfomationService.deleteUseInformation(autoKey);
        return responseBody;
    }

    @GetMapping("/{accommodationName}/{checkInDay}/{checkOutDay}")
    public ResponseEntity<? super GetReservedAccommodationResponseDto> getReservedAccommodation(
        @PathVariable("accommodationName") String accommodationName,
        @PathVariable("checkInDay") String checkInday,
        @PathVariable("checkOutDay") String checkOutDay
    ){
        ResponseEntity<? super GetReservedAccommodationResponseDto> responseBody = accommodationService.getReservedAccommodation(accommodationName, checkInday, checkOutDay);
        return responseBody;
    }
}
