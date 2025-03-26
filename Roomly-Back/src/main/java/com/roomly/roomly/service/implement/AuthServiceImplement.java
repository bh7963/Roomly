package com.roomly.roomly.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.roomly.roomly.common.util.AuthNumberCreater;
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
import com.roomly.roomly.entity.GuestEntity;
import com.roomly.roomly.entity.HostEntity;
import com.roomly.roomly.entity.TelAuthNumberEntity;
import com.roomly.roomly.provider.JwtProvider;
import com.roomly.roomly.provider.SmsProvider;
import com.roomly.roomly.repository.GuestRepository;
import com.roomly.roomly.repository.HostRepository;
import com.roomly.roomly.repository.TelAuthNumberRepository;
import com.roomly.roomly.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImplement implements AuthService {

    private final HostRepository hostRepository;
    private final SmsProvider smsProvider;
    private final TelAuthNumberRepository telAuthNumberRepository;
    private final GuestRepository guestRepository;

    private  PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final JwtProvider jwtProvider;

    // 호스트 아이디 중복확인 메서드
    @Override
    public ResponseEntity<ResponseDto> hostIdCheck(HostIdCheckRequestDto dto) {
        String hostId = dto.getHostId();
        try {
            
            boolean isMatched = hostRepository.existsByHostId(hostId);
            if (isMatched) return ResponseDto.duplicatedId();

            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return ResponseDto.success();
    }

    // 호스트 전화번호 중복확인 및 인증번호 발송 메서드
    @Override
    public ResponseEntity<ResponseDto> hostTelNumber(HostTelNumberRequestDto dto) {
        
        String hostTelNumber = dto.getHostTelNumber();
        
        try {
            
            boolean isMatchedTelNumber = hostRepository.existsByHostTelNumber(hostTelNumber);
            if(isMatchedTelNumber) return ResponseDto.duplicatedTelNumber();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        String authNumber = AuthNumberCreater.number4();

        boolean isSendSuccess = smsProvider.sendMessage(hostTelNumber, authNumber);
        if(isSendSuccess) return ResponseDto.messageSendFail();

        try {
            TelAuthNumberEntity telAuthNumberEntity = new TelAuthNumberEntity(hostTelNumber, authNumber);
            telAuthNumberRepository.save(telAuthNumberEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return ResponseDto.success();
    }

    // 호스트 전화번호 인증번호 확인 메서드
    @Override
    public ResponseEntity<ResponseDto> hostTelAuthCheck(HostTelAuthCheckRequestDto dto) {
        
        String telNumber = dto.getTelNumber();
        String authNumber = dto.getAuthNumber();

        try {
            
            boolean isMatchedTelAuth = telAuthNumberRepository.existsByTelNumberAndAuthNumber(telNumber, authNumber);
            if (!isMatchedTelAuth) return ResponseDto.telAuthFail();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return ResponseDto.success();
    }

    // 호스트 사업자 번호 중복확인 메서드
    @Override
    public ResponseEntity<ResponseDto> hostBusinessNumber(HostBusinessNumberRequestDto dto) {
        String hostBusinessNumber = dto.getHostBusinessNumber();
        try {
            
            boolean isMatchedHostBusinessNumber = hostRepository.existsByHostBusinessNumber(hostBusinessNumber);
            if(isMatchedHostBusinessNumber) return ResponseDto.duplicatedBusinessNumber();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return ResponseDto.success();
    }

    // 호스트 회원가입 메서드
    @Override
    public ResponseEntity<ResponseDto> hostSignUp(HostSignUpRequestDto dto) {
        
        String hostId = dto.getHostId();
        String hostPw = dto.getHostPw();
        String hostTelNumber = dto.getHostTelNumber();
        String hostAuthNumber = dto.getHostAuthNumber();
        String hostBusinessNumber = dto.getHostBusinessNumber();

        try {

            boolean isMatchedHostId = hostRepository.existsByHostId(hostId);
            if(isMatchedHostId) return ResponseDto.duplicatedId();

            boolean isMatchedTelNumber = hostRepository.existsByHostTelNumber(hostTelNumber);
            if(isMatchedTelNumber) return ResponseDto.duplicatedTelNumber();
            
            boolean isMatchedTelAuth = telAuthNumberRepository.existsByTelNumberAndAuthNumber(hostTelNumber, hostAuthNumber);
            if(!isMatchedTelAuth) return ResponseDto.telAuthFail();

            boolean isMatchedHostBusinessNumber = hostRepository.existsByHostBusinessNumber(hostBusinessNumber);
            if (isMatchedHostBusinessNumber) return ResponseDto.duplicatedBusinessNumber();

            String encodedPassword = passwordEncoder.encode(hostPw);
            dto.setHostPw(encodedPassword);

            HostEntity hostEntity = new HostEntity(dto);
            hostRepository.save(hostEntity);

            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return ResponseDto.success();
    }

    // 호스트 로그인 메서드
    @Override
    public ResponseEntity<? super HostSignInResponseDto> hostSignIn(HostSignInRequestDto dto) {

        String accessToken = null;
        String hostId = dto.getHostId();
        String hostPw = dto.getHostPw();
        
        try {
            
            HostEntity hostEntity = hostRepository.findByHostId(hostId);
            if(hostEntity == null) return ResponseDto.noExistUserId();

            String encodedPassword = hostEntity.getHostPw();
            boolean isMatchedHostPassword = passwordEncoder.matches(hostPw,encodedPassword);
            if(!isMatchedHostPassword) return ResponseDto.signInFail();

            accessToken = jwtProvider.createHostToken(hostId);
            if(accessToken == null) return ResponseDto.tokenCreateFail();
            

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return HostSignInResponseDto.success(accessToken);
    }


    // ------------------------------------ guest --------------------------------------------------

    @Override
    // 아이디 중복확인 메서드
    public ResponseEntity<ResponseDto> guestIdCheck(GuestIdCheckRequestDto dto) {

        String guestId = dto.getGuestId();

        try {
            boolean isExistedId = guestRepository.existsByGuestId(guestId);
            if (isExistedId) return ResponseDto.duplicatedId();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return ResponseDto.success();
    }

    @Override
    // 전화번호 중복확인 메서드
    public ResponseEntity<ResponseDto> guestTelAuth(GuestTelAuthRequestDto dto) {
        
        String guestTelNumber = dto.getGuestTelNumber();

        try {
            boolean isExistedTelNumber = guestRepository.existsByGuestTelNumber(guestTelNumber);
            if(isExistedTelNumber) return ResponseDto.duplicatedTelNumber();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();   
        }

        String authNumber = AuthNumberCreater.number4();

        boolean isSendSuccess =  smsProvider.sendMessage(guestTelNumber, authNumber);
        if (!isSendSuccess) return ResponseDto.messageSendFail();

        try {
            
            TelAuthNumberEntity telAuthNumberEntity = new TelAuthNumberEntity(guestTelNumber,authNumber);
            telAuthNumberRepository.save(telAuthNumberEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return ResponseDto.success();
    }

    @Override
    // 인증번호 확인 메서드
    public ResponseEntity<ResponseDto> guestTelAuthCheck(TelAuthCheckRequestDto dto) {
        
        String telNumber = dto.getTelNumber();
        String authNumber = dto.getAuthNumber();

        try {
            boolean isMatched = telAuthNumberRepository.existsByTelNumberAndAuthNumber(telNumber, authNumber);
            if(!isMatched) return ResponseDto.telAuthFail();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return ResponseDto.success();
    }

    @Override
    // 회원가입 메서드
    public ResponseEntity<ResponseDto> guestSignUp(GuestSignUpRequestDto dto) {
        
        String guestId = dto.getGuestId();
        String guestTelNumber = dto.getGuestTelNumber();
        String guestAuthNumber = dto.getGuestAuthNumber();
        String guestPassword = dto.getGuestPw();
        
        try {
            
            boolean isExistedId = guestRepository.existsByGuestId(guestId);
            if(isExistedId) return ResponseDto.duplicatedId();

            boolean isExistedTelNumber = guestRepository.existsByGuestTelNumber(guestTelNumber);
            if(isExistedTelNumber) return ResponseDto.duplicatedTelNumber();

            boolean isMatched = telAuthNumberRepository.existsByTelNumberAndAuthNumber(guestTelNumber, guestAuthNumber);
            if(!isMatched) return ResponseDto.telAuthFail();

            String encodedPassword = passwordEncoder.encode(guestPassword);
            dto.setGuestPw(encodedPassword);

            GuestEntity guestEntity = new GuestEntity(dto);
            guestRepository.save(guestEntity);
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return ResponseDto.success();
    }

    @Override
    // 로그인 메서드
    public ResponseEntity<? super GuestSignInResponseDto> guestSignIn(GuestSignInRequestDto dto) {
        
        String guestId = dto.getGuestId();
        String password = dto.getGuestPw();
        String accessToken = null;

        try {
            
            GuestEntity guestEntity = guestRepository.findByGuestId(guestId);
            if(guestEntity == null) return ResponseDto.signInFail();

            String encodedPassword = guestEntity.getGuestPw();
            boolean isMatched = passwordEncoder.matches(password, encodedPassword);
            if(!isMatched) return ResponseDto.signInFail();

            accessToken = jwtProvider.createGuestToken(guestId);
            if(accessToken == null) return ResponseDto.tokenCreateFail();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GuestSignInResponseDto.success(accessToken);
    }
    
}
