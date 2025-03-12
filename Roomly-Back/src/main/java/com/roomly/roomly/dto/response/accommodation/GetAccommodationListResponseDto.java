package com.roomly.roomly.dto.response.accommodation;

import lombok.Getter;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.roomly.roomly.common.object.Accommodations;
import com.roomly.roomly.dto.response.ResponseCode;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.ResponseMessage;
import com.roomly.roomly.repository.resultSet.GetAccommodationListResultSet;

@Getter
public class GetAccommodationListResponseDto extends ResponseDto{

    List<Accommodations> accommodations;

    public GetAccommodationListResponseDto(List<GetAccommodationListResultSet> resultSet){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

        this.accommodations = Accommodations.getList(resultSet);

    }

    public static ResponseEntity<GetAccommodationListResponseDto> success(
        List<GetAccommodationListResultSet> resultSet
    ){
        GetAccommodationListResponseDto responseBody = new GetAccommodationListResponseDto(resultSet);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    
    
}
