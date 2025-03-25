package com.roomly.roomly.service;

import org.springframework.http.ResponseEntity;

import com.roomly.roomly.dto.request.guestauth.GuestIdCheckRequestDto;
import com.roomly.roomly.dto.request.guestauth.GuestSignInRequestDto;
import com.roomly.roomly.dto.request.guestauth.GuestSignUpRequestDto;
import com.roomly.roomly.dto.request.guestauth.GuestTelAuthRequestDto;
import com.roomly.roomly.dto.request.host.TelAuthCheckRequestDto;
import com.roomly.roomly.dto.request.hostauth.HostBusinessNumberRequestDto;
import com.roomly.roomly.dto.request.hostauth.HostIdCheckRequestDto;
import com.roomly.roomly.dto.request.hostauth.HostSignInRequestDto;
import com.roomly.roomly.dto.request.hostauth.HostSignUpRequestDto;
import com.roomly.roomly.dto.request.hostauth.HostTelAuthCheckRequestDto;
import com.roomly.roomly.dto.request.hostauth.HostTelNumberRequestDto;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.guestauth.GuestSignInResponseDto;
import com.roomly.roomly.dto.response.hostauth.HostSignInResponseDto;

public interface AuthService {
    // -------- 호스트 --------

    // 호스트 아이디 중복확인
    ResponseEntity<ResponseDto> hostIdCheck(HostIdCheckRequestDto dto);
    // 호스트 전화번호 중복확인 및 인증번호 전송
    ResponseEntity<ResponseDto> hostTelNumber(HostTelNumberRequestDto dto);
    // 호스트 전화번호 인증번호 확인
    ResponseEntity<ResponseDto> hostTelAuthCheck(HostTelAuthCheckRequestDto dto);
    // 사업자 번호 중복확인
    ResponseEntity<ResponseDto> hostBusinessNumber(HostBusinessNumberRequestDto dto);
    // 호스트 회원가입
    ResponseEntity<ResponseDto> hostSignUp(HostSignUpRequestDto dto);
    // 호스트 로그인
    ResponseEntity<? super HostSignInResponseDto> hostSignIn(HostSignInRequestDto dto);

    // -------- 게스트 --------

    // 게스트 아이디 중복확인
    ResponseEntity<ResponseDto> guestIdCheck(GuestIdCheckRequestDto dto);
    // 게스트 전화번호 중복확인 및 인증번호 전송
    ResponseEntity<ResponseDto> guestTelAuth(GuestTelAuthRequestDto dto);
    // 게스트 전화번호 인증번호 확인
    ResponseEntity<ResponseDto> guestTelAuthCheck(TelAuthCheckRequestDto dto);
    // 게스트 회원가입
    ResponseEntity<ResponseDto> guestSignUp(GuestSignUpRequestDto dto);
    // 게스트 로그인
    ResponseEntity<? super GuestSignInResponseDto> guestSignIn(GuestSignInRequestDto dto);
}
