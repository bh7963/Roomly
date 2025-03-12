package com.roomly.roomly.dto.response.guest;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.roomly.roomly.dto.response.ResponseCode;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.ResponseMessage;
import com.roomly.roomly.repository.resultSet.GuestReviewListResultSet;

import lombok.Getter;

@Getter
public class GetGuestReviewResponseDto extends ResponseDto {
    
    List<GuestReviewListResultSet> reviewList;
    
    public GetGuestReviewResponseDto(List<GuestReviewListResultSet> resultSet) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        
        this.reviewList = resultSet;

    }

    public static ResponseEntity<GetGuestReviewResponseDto> success(List<GuestReviewListResultSet> resultSet) {
        GetGuestReviewResponseDto responseBody = new GetGuestReviewResponseDto(resultSet);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
