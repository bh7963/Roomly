package com.roomly.roomly.service.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.roomly.roomly.dto.request.guest.GuestReviewListRequestDto;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.guest.GetAccommodationReviewResponseDto;
import com.roomly.roomly.dto.response.guest.GetGuestReviewResponseDto;
import com.roomly.roomly.entity.ReservationEntity;
import com.roomly.roomly.entity.ReviewEntity;
import com.roomly.roomly.repository.AccommodationRepository;
import com.roomly.roomly.repository.GuestRepository;
import com.roomly.roomly.repository.ReservationRepository;
import com.roomly.roomly.repository.ReviewRepository;
import com.roomly.roomly.repository.resultSet.AccommodationReviewListResultSet;
import com.roomly.roomly.repository.resultSet.GuestReviewListResultSet;
import com.roomly.roomly.service.ReviewService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewServiceImplement implements ReviewService{
    

    private final ReservationRepository reservationRepository;
    private final GuestRepository guestRepository;
    private final ReviewRepository reviewRepository;
    private final AccommodationRepository accommodationRepository;

    @Override
    // 리뷰작성
    public ResponseEntity<ResponseDto> addReview(GuestReviewListRequestDto dto,String guestId) {

        Integer reservationId = dto.getReservationId();

        try {
            ReservationEntity reservationEntity = reservationRepository.findByReservationId(reservationId);
            if(reservationEntity == null) return ResponseDto.noExistReservationId();

            String reservationGuestId = reservationEntity.getGuestId();
            if (!reservationGuestId.equals(guestId)) return ResponseDto.noExistGuest();
            
            ReviewEntity reviewEntity = new ReviewEntity(dto);
            reviewRepository.save(reviewEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
            return ResponseDto.success();
    }

    @Override
    // 해당 Id의 리뷰 List 보기
    public ResponseEntity<? super GetGuestReviewResponseDto> guestReviewList(String guestId) {
        
        List<GuestReviewListResultSet> resultSet = new ArrayList<>();

        try {
            // 아이디 유효성 검사
            boolean isExistsGuestId = reservationRepository.existsByGuestId(guestId);
            if (!isExistsGuestId) return ResponseDto.noExistUserId();
            
            // 해당 아이디에 대해 작성한 리뷰가 있는지 검사
            resultSet = guestRepository.getReviewList(guestId);
            if (resultSet.size() == 0) return ResponseDto.noExistReviewGuestId();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetGuestReviewResponseDto.success(resultSet);
    }

    @Override
    // 숙소에 관한 리뷰 리스트 확인하기
    public ResponseEntity<? super GetAccommodationReviewResponseDto> accommodationReviewList(String accommodationName) {
    
        List<AccommodationReviewListResultSet> resultSet = new ArrayList<>();

        try {
            // 해당 숙소가 있는지 유효성 검사
            boolean accommodation = accommodationRepository.existsByAccommodationName(accommodationName);
            if (!accommodation) return ResponseDto.noExistAccommodation();
            
            // 해당 숙소에 대해 작성한 리뷰가 있는지 검사
            resultSet = accommodationRepository.getAccommodationReviewList(accommodationName);
            if (resultSet.size() == 0) return ResponseDto.noExistAccommodationNameReview();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetAccommodationReviewResponseDto.success(resultSet);
    }
}
