package com.roomly.roomly.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.roomly.roomly.dto.request.guest.GuestReviewListRequestDto;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.guest.GetAccommodationReviewResponseDto;
import com.roomly.roomly.dto.response.guest.GetGuestReviewResponseDto;
import com.roomly.roomly.service.ReviewService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/roomly/reviews")
@RequiredArgsConstructor
public class ReviewsController {
    
    private final ReviewService ReviewService;

    // 리뷰작성하기
    @PostMapping("/add/{guestId}")
    public ResponseEntity<ResponseDto> addReview(
        @RequestBody @Valid GuestReviewListRequestDto requestBody,
        @PathVariable("guestId") String guestId
    ) {
        
        ResponseEntity<ResponseDto> response = ReviewService.addReview(requestBody,guestId);
        return response;
    }

    // 게스트아이디에 관한 리뷰리스트 보기
    @GetMapping("guest-list/{guestId}")
    public ResponseEntity<? super GetGuestReviewResponseDto> guestReviewList(
        @PathVariable("guestId") String guestId
    ){
        ResponseEntity<? super GetGuestReviewResponseDto> response = ReviewService.guestReviewList(guestId);
        return response;
    }
    
    // 숙소명에 관한 리뷰리스트 보기
    @GetMapping("acc-list/{accommodationName}")
    public ResponseEntity<? super GetAccommodationReviewResponseDto> accommodationReviewList(
        @PathVariable("accommodationName") String accommodationName
    ){
        ResponseEntity<? super GetAccommodationReviewResponseDto> response = ReviewService.accommodationReviewList(accommodationName);
        return response;
    }
}
