package com.roomly.roomly.service.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.roomly.roomly.dto.request.guest.AddBookMarkRequestDto;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.guest.GetGuestBookMarkResponseDto;
import com.roomly.roomly.entity.BookmarkEntity;
import com.roomly.roomly.repository.AccommodationRepository;
import com.roomly.roomly.repository.BookMarkRepository;
import com.roomly.roomly.repository.GuestRepository;
import com.roomly.roomly.repository.resultSet.GetBookMarkResultSet;
import com.roomly.roomly.service.BookmarkService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookmarkServiceImplement implements BookmarkService {
    
    
    private final BookMarkRepository bookMarkRepository;
    private final GuestRepository guestRepository;
    private final AccommodationRepository accommodationRepository;
    
    // 즐겨찾기 list
    @Override
    public ResponseEntity<? super GetGuestBookMarkResponseDto> getBookMarkList(String guestId) {
        
        List<GetBookMarkResultSet> bookMarkResultSets = new ArrayList<>();

        try {
            
            boolean existsByGuestId = guestRepository.existsByGuestId(guestId);
            if (!existsByGuestId) return ResponseDto.noExistUserId();

            bookMarkResultSets = bookMarkRepository.getBookmarkList(guestId);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetGuestBookMarkResponseDto.success(bookMarkResultSets);
    }

    // 즐겨찾기 add
    @Override
    public ResponseEntity<ResponseDto> addBookMark(AddBookMarkRequestDto dto, String guestId) {
        
        String id = null;
        BookmarkEntity bookmarkEntity = null;

        try {
            
            // 매개변수로 받아온 Id 유효성 검사
            boolean isExistedId = guestRepository.existsByGuestId(guestId);
            if (!isExistedId) return ResponseDto.noExistUserId();
            
            // 매개변수로 받은 Id와 requestBody의 아이디값도 일치해야함
            id = dto.getGuestId();
            boolean existsByGuestId = id.equals(guestId);
            if(!existsByGuestId) return ResponseDto.notMatchValue();

            String accommodation = dto.getAccommodationName();
            boolean isExisted = accommodationRepository.existsByAccommodationName(accommodation);
            if (!isExisted) return ResponseDto.noExistAccommodation();

            bookmarkEntity = new BookmarkEntity(dto);
            bookMarkRepository.save(bookmarkEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return ResponseDto.success();
    }


    @Override
    // 즐겨찾기 삭제
    public ResponseEntity<ResponseDto> deleteBookMark(String guestId, String accommodationName) {
        
        try {

            boolean isGuest = guestRepository.existsByGuestId(guestId);
            if (!isGuest) return ResponseDto.noExistUserId();
            
            boolean isAccommodation = accommodationRepository.existsByAccommodationName(accommodationName);
            if (!isAccommodation) return ResponseDto.noExistAccommodation();

            BookmarkEntity bookmarkEntity = bookMarkRepository.findByGuestIdAndAccommodationName(guestId, accommodationName);
            if (bookmarkEntity == null) return ResponseDto.noExistBookMark();


            bookMarkRepository.delete(bookmarkEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return ResponseDto.success();
    }
    
}
