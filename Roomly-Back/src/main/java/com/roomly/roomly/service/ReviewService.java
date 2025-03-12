package com.roomly.roomly.service;

import org.springframework.http.ResponseEntity;

import com.roomly.roomly.dto.request.guest.GuestReviewListRequestDto;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.guest.GetAccommodationReviewResponseDto;
import com.roomly.roomly.dto.response.guest.GetGuestReviewResponseDto;

public interface ReviewService {
    
    // 리뷰 작성하기
    ResponseEntity<ResponseDto> addReview(GuestReviewListRequestDto dto,String guesrId);
    // 해당 guestId의 리뷰보기
    ResponseEntity<? super GetGuestReviewResponseDto> guestReviewList(String guestId);
    // 해당 숙소명의 리뷰 보기
    ResponseEntity<? super GetAccommodationReviewResponseDto> accommodationReviewList(String accommodationName);
}
