package com.roomly.roomly.dto.response.guest;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.roomly.roomly.dto.response.ResponseCode;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.ResponseMessage;
import com.roomly.roomly.repository.resultSet.GetBookMarkResultSet;

import lombok.Getter;

@Getter
public class GetGuestBookMarkResponseDto extends ResponseDto{

    private List<GetBookMarkResultSet> bookMarkResultSets;
    
    private GetGuestBookMarkResponseDto(List<GetBookMarkResultSet> bookMarkResultSets) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.bookMarkResultSets = bookMarkResultSets;
    }

    public static ResponseEntity<GetGuestBookMarkResponseDto> success(List<GetBookMarkResultSet> bookMarkResultSets) {
        GetGuestBookMarkResponseDto responseBody = new GetGuestBookMarkResponseDto(bookMarkResultSets);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
    
}
