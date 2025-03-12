package com.roomly.roomly.service;

import org.springframework.http.ResponseEntity;

import com.roomly.roomly.dto.request.guest.AddBookMarkRequestDto;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.guest.GetGuestBookMarkResponseDto;

public interface BookmarkService {
    
    // 즐겨찾기 List 
    ResponseEntity<? super GetGuestBookMarkResponseDto> getBookMarkList(String guestId);
    // 즐겨찾기 Add
    ResponseEntity<ResponseDto> addBookMark(AddBookMarkRequestDto dto, String guestId);
    // 즐겨찾기 Delete
    ResponseEntity<ResponseDto> deleteBookMark(String guestId, String accommodationName);
}
