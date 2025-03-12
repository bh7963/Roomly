package com.roomly.roomly.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.roomly.roomly.dto.request.guest.AddBookMarkRequestDto;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.guest.GetGuestBookMarkResponseDto;
import com.roomly.roomly.service.BookmarkService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/roomly/bookmark")
@RequiredArgsConstructor
public class BookmarkController {
    
    private final BookmarkService bookmarkService;

    // 즐겨찾기 리스트보기 (해당 id에 대한)
    @GetMapping("/list-bookmark/{guestId}")
    public ResponseEntity<? super GetGuestBookMarkResponseDto> getBookMarkList(
        @PathVariable("guestId") String guestId
    ) {
        ResponseEntity <? super GetGuestBookMarkResponseDto> response = bookmarkService.getBookMarkList(guestId);
        return response;
    }

    // 즐겨찾기 추가
    @PostMapping("/add-bookmark/{guestId}")
    public ResponseEntity<ResponseDto> addBookMark(
        @RequestBody @Valid AddBookMarkRequestDto requestBody,
        @PathVariable("guestId") String guestId
    ) {
        ResponseEntity<ResponseDto> response = bookmarkService.addBookMark(requestBody,guestId);
        return response;
    }

    // 즐겨찾기 삭제
    @DeleteMapping("/delete-bookmark/{guestId}/{accommodationName}")
    public ResponseEntity<ResponseDto> deleteBookMark(
        @PathVariable("guestId") String guestId,
        @PathVariable("accommodationName") String accommodationName
    ){
        ResponseEntity<ResponseDto> response = bookmarkService.deleteBookMark(guestId, accommodationName);
        return response;
    }
}
