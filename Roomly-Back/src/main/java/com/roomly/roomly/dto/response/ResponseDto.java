package com.roomly.roomly.dto.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResponseDto {
    
    private String code;
    private String meesage;

    public static ResponseEntity<ResponseDto> success(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> noExistUserId(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.NO_EXIST_USER_ID, ResponseMessage.NO_EXIST_USER_ID);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> duplicatedId(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.DUPLICATED_ID, ResponseMessage.DUPLICATED_ID);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> duplicatedTelNumber(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.DUPLICATED_TELNUMBER, ResponseMessage.DUPLICATED_TELNUMBER);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> duplicatedBusinessNumber(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.DUPLICATED_BUSINESS_NUMBER, ResponseMessage.DUPLICATED_BUSINESS_NUMBER);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> duplicatedImage(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.DUPLICATED_IMAGE, ResponseMessage.DUPLICATED_IMAGE);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> duplicatedAccommodationName(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.DUPLICATED_ACCOMMODATION_NAME, ResponseMessage.DUPLICATED_ACCOMMODATION_NAME);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> duplicatedRoom(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.DUPLICATED_ROOM, ResponseMessage.DUPLICATED_ROOM);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> duplicatedPassword(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.DUPLICATED_PASSWORD, ResponseMessage.DUPLICATED_PASSWORD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> duplicatedIntroduce(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.DUPLICATED_INTRODUCE, ResponseMessage.DUPLICATED_INTRODUCE);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
    

    public static ResponseEntity<ResponseDto> noExistType(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.NO_EXIST_TYPE, ResponseMessage.NO_EXIST_TYPE);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> noExistReservation(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.NO_EXIST_RESERVATION, ResponseMessage.NO_EXIST_RESERVATION);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> noExistIntroduce(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.NO_EXIST_INTRODUCE, ResponseMessage.NO_EXIST_INTRODUCE);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> noExistAccommodation(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.NO_EXIST_ACCOMMODATION, ResponseMessage.NO_EXIST_ACCOMMODATION);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> noExistRoom(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.NO_EXIST_ROOM, ResponseMessage.NO_EXIST_ROOM);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> noExistImage(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.NO_EXIST_IMAGE, ResponseMessage.NO_EXIST_IMAGE);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> duplicatedReservation(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.DUPLICATED_RESERVATION, ResponseMessage.DUPLICATED_RESERVATION);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> noExistGuest(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.NO_EXIST_GUEST, ResponseMessage.NO_EXIST_GUEST);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> noExistHost(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.NO_EXIST_HOST, ResponseMessage.NO_EXIST_HOST);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> noExistUseInformation(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.NO_EXIST_USE_INFORMATION, ResponseMessage.NO_EXIST_USE_INFORMATION);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> noExistReservationId() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.NO_EXIST_RESERVATION_ID,
                ResponseMessage.NO_EXIST_RESERVATION_ID);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> noExistReviewGuestId() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.NO_EXIST_REVIEW_GUEST_ID, ResponseMessage.NO_EXIST_REVIEW_GUEST_ID);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> noExistAccommodationNameReview() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.NO_EXIST_REVIEW_ACCOMMODATION_NAME, ResponseMessage.NO_EXIST_REVIEW_ACCOMMODATION_NAME);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
    
    public static ResponseEntity<ResponseDto> noExistBookMark() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.NO_EXIST_BOOKMARK, ResponseMessage.NO_EXIST_BOOKMARK);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
    
    public static ResponseEntity<ResponseDto> noExistTelNumber() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.NO_EXIST_TELNUMBER, ResponseMessage.NO_EXIST_TELNUMBER);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> noPaymentId() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.NO_EXIST_PAYMENT_ID,
                ResponseMessage.NO_EXIST_PAYMENT_ID);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notMatchValue() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_MATCH_VALUE, ResponseMessage.NOT_MATCH_VALUE);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
    
    public static ResponseEntity<ResponseDto> entryFail(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.ENTRY_FAIL, ResponseMessage.ENTRY_FAIL);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> validationFail(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.VALIDATION_FALIL, ResponseMessage.VALIDATION_FALIL);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> authenticatedError(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.AUTHENTICATION_FAIL, ResponseMessage.AUTHENTICATION_FAIL);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> noPermission(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.NO_PERMISSION, ResponseMessage.NO_PERMISSION);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> telAuthFail(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.TEL_AUTH_FAILE, ResponseMessage.TEL_AUTH_FAILE);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> signInFail(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.SIGN_IN_FAIL, ResponseMessage.SIGN_IN_FAIL);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    } 

    public static ResponseEntity<ResponseDto> deleteFail(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.DELETE_FAIL, ResponseMessage.DELETE_FAIL);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }
    
    public static ResponseEntity<ResponseDto> existedReservation(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.EXISTED_RESERVATION, ResponseMessage.EXISTED_RESERVATION);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> databaseError(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.DATABASE_ERROR, ResponseMessage.DATABASE_ERROR);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> messageSendFail(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.MESSAGE_SEND_FAILE, ResponseMessage.MESSAGE_SEND_FAILE);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> tokenCreateFail(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.TOKEN_CREATE_FAIL, ResponseMessage.TOKEN_CREATE_FAIL);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }
}
