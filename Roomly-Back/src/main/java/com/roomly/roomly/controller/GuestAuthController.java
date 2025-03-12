package com.roomly.roomly.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.roomly.roomly.dto.request.guest.GuestIdFindRequestDto;
import com.roomly.roomly.dto.request.guest.GuestPwFindRequestDto;
import com.roomly.roomly.dto.request.guestauth.GuestIdCheckRequestDto;
import com.roomly.roomly.dto.request.guestauth.GuestSignInRequestDto;
import com.roomly.roomly.dto.request.guestauth.GuestSignUpRequestDto;
import com.roomly.roomly.dto.request.guestauth.GuestTelAuthCheckRequestDto;
import com.roomly.roomly.dto.request.guestauth.GuestTelAuthRequestDto;
import com.roomly.roomly.dto.request.host.TelAuthCheckRequestDto;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.guest.GuestIdFindSuccessResponseDto;
import com.roomly.roomly.dto.response.guestauth.GuestSignInResponseDto;
import com.roomly.roomly.service.AuthService;
import com.roomly.roomly.service.GuestService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/roomly/auth/guest")
@RequiredArgsConstructor
public class GuestAuthController {
    
    private final AuthService guestAuthService;
    private final GuestService guestService;

    // 아이디 중복확인
    @PostMapping("/id-check")
    public ResponseEntity<ResponseDto> guestIdCheck(
        @RequestBody @Valid GuestIdCheckRequestDto requestBody
    ){
        ResponseEntity<ResponseDto> response = guestAuthService.guestIdCheck(requestBody);
        return response;
    }

    // 전화번호 중복확인 및 인증번호 발송
    @PostMapping("/tel-auth")
    public ResponseEntity<ResponseDto> telAuth(
        @RequestBody @Valid GuestTelAuthRequestDto requestBody
    ){
        ResponseEntity<ResponseDto> response = guestAuthService.guestTelAuth(requestBody);
        return response;
    }
    
    // 인증번호 확인
    @PostMapping("/tel-auth-check")
    public ResponseEntity<ResponseDto> telAuthCheck(
        @RequestBody @Valid TelAuthCheckRequestDto requestBody
    ){
        ResponseEntity<ResponseDto> response = guestAuthService.guestTelAuthCheck(requestBody);
        return response;
    }

    // 회원가입
    @PostMapping("/sign-up")
    public ResponseEntity<ResponseDto> signUp(
        @RequestBody @Valid GuestSignUpRequestDto requestBody
    ){
        ResponseEntity<ResponseDto> response = guestAuthService.guestSignUp(requestBody);
        return response;
    }
    
    // 로그인
    @PostMapping("/sign-in")
    public ResponseEntity<? super GuestSignInResponseDto> signIn(
        @RequestBody @Valid GuestSignInRequestDto requestBody
    ){
        ResponseEntity<? super GuestSignInResponseDto> response = guestAuthService.guestSignIn(requestBody);
        return response;
    }

    // 게스트 아이디 찾기
    @PostMapping("/id-find")
    public ResponseEntity<ResponseDto> guestIdFind(
        @RequestBody @Valid GuestIdFindRequestDto requestBody
    ) {
        ResponseEntity<ResponseDto> responseBody = guestService.guestIdFind(requestBody);
        return responseBody;
    }

    // 아이디 찾기에 대한 전화번호 인증확인  
    @PostMapping("/id-find-tel-auth-check")
        public ResponseEntity<? super GuestIdFindSuccessResponseDto> guestTelAuthCheck(
            @RequestBody @Valid TelAuthCheckRequestDto requestBody
    ) {
        ResponseEntity<? super GuestIdFindSuccessResponseDto> responseBody = guestService.guestTelAuthCheck(requestBody);
        return responseBody;
    }
        // 게스트 비밀번호 변경(로그아웃상태)
    @PatchMapping("/pw-find")
    public ResponseEntity<ResponseDto> guestPwFind(
        @RequestBody @Valid GuestPwFindRequestDto requestBody
    ) {
        ResponseEntity<ResponseDto> responseBody = guestService.guestPwFind(requestBody);
        return responseBody;
    }
}
