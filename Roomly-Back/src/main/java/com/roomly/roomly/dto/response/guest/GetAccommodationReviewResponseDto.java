package com.roomly.roomly.dto.response.guest;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.roomly.roomly.dto.response.ResponseCode;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.ResponseMessage;
import com.roomly.roomly.repository.resultSet.AccommodationReviewListResultSet;

import lombok.Getter;

@Getter
public class GetAccommodationReviewResponseDto extends ResponseDto {
    
    List<AccommodationReviewListResultSet> accommodationReviewListResultSets;

    public GetAccommodationReviewResponseDto(List<AccommodationReviewListResultSet> accommodationReviewResultSets) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.accommodationReviewListResultSets = accommodationReviewResultSets;
    }

        public static ResponseEntity<GetAccommodationReviewResponseDto> success(List<AccommodationReviewListResultSet> resultSet) {
            GetAccommodationReviewResponseDto responseBody = new GetAccommodationReviewResponseDto(resultSet);
            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

}
