package com.roomly.roomly.handler;

import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.roomly.roomly.dto.response.ResponseDto;

@RestControllerAdvice
public class CustomExceptionHandler {
    // HttpMessageNotReadableException: Request Body가 없어서 읽지 못할 때
    // MethodArgumentNotValidException: 유효성 검사 실패
    @ExceptionHandler({
        HttpMessageNotReadableException.class,
        MethodArgumentNotValidException.class
    })
    public ResponseEntity<ResponseDto> validExceptionHandler(Exception e) {
        e.printStackTrace();
        return ResponseDto.validationFail();
    }
}
