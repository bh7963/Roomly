package com.roomly.roomly.dto.response.guest;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.roomly.roomly.dto.response.ResponseCode;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.ResponseMessage;
import com.roomly.roomly.repository.resultSet.GetReservationStatusResultSet;

import lombok.Getter;

@Getter
public class GetReservationStatusResponseDto extends ResponseDto{

    List<GetReservationStatusResultSet> getReservationStatusResultSets;

    public GetReservationStatusResponseDto(List<GetReservationStatusResultSet> resultSet) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.getReservationStatusResultSets = resultSet;
    }

    public static ResponseEntity<GetReservationStatusResponseDto> success(List<GetReservationStatusResultSet> resultSet) {
        GetReservationStatusResponseDto responseBody = new GetReservationStatusResponseDto(resultSet);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
    
}
