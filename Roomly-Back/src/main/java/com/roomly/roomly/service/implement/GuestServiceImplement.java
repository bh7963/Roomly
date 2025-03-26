package com.roomly.roomly.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.roomly.roomly.common.util.AuthNumberCreater;
import com.roomly.roomly.dto.request.guest.PatchGuestAuthRequestDto;
import com.roomly.roomly.dto.request.guest.PatchGuestPwRequestDto;
import com.roomly.roomly.dto.request.host.TelAuthCheckRequestDto;
import com.roomly.roomly.dto.request.guest.GuestIdFindRequestDto;
import com.roomly.roomly.dto.request.guest.GuestInformationRequestDto;
import com.roomly.roomly.dto.request.guest.GuestPwFindRequestDto;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.guest.GetGuestMyPageResponseDto;
import com.roomly.roomly.dto.response.guest.GetGuestSignInResponseDto;
import com.roomly.roomly.dto.response.guest.GuestIdFindSuccessResponseDto;
import com.roomly.roomly.entity.GuestEntity;
import com.roomly.roomly.entity.TelAuthNumberEntity;
import com.roomly.roomly.provider.SmsProvider;
import com.roomly.roomly.repository.GuestRepository;
import com.roomly.roomly.repository.TelAuthNumberRepository;
import com.roomly.roomly.service.GuestService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GuestServiceImplement implements GuestService {

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final SmsProvider smsProvider;
    private final GuestRepository guestRepository;
    private final TelAuthNumberRepository telAuthNumberRepository;

    // 게스트Id에 관한 MyPageList 메서드
    @Override
    public ResponseEntity<? super GetGuestMyPageResponseDto> getGuestMyPage(String guestId, GuestInformationRequestDto dto) {

        GuestEntity guestEntity = null;
        String guestPw = dto.getGuestPw();

        try {

            guestEntity = guestRepository.findByGuestId(guestId);
            if (guestEntity == null) return ResponseDto.noExistUserId();
            
            String basicPw = guestEntity.getGuestPw();
            
            boolean isMatched = passwordEncoder.matches(guestPw,basicPw);
            if(!isMatched) return ResponseDto.noPermission();
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        
        return GetGuestMyPageResponseDto.success(guestEntity);
    }

    // 비밀번호 수정 메서드(로그인)
    @Override
    public ResponseEntity<ResponseDto> patchGuestPw(
            PatchGuestPwRequestDto dto, String guestId) {

        String currentGuestPw = dto.getCurrentGuestPw();
        String changeGuestPw = dto.getChangeGuestPw();

        try {

            GuestEntity guestEntity = guestRepository.findByGuestId(guestId);
            if (guestEntity == null)
                return ResponseDto.noExistUserId();
    
            String basicPw = guestEntity.getGuestPw();
            boolean isMatched = passwordEncoder.matches(currentGuestPw, basicPw);
            if (!isMatched) return ResponseDto.notMatchValue();

            String encodedPassword = passwordEncoder.encode(changeGuestPw);
            dto.setChangeGuestPw(encodedPassword);
            guestEntity.patchPw(dto);
            guestRepository.save(guestEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return ResponseDto.success();
    }

    // 전화번호 수정 및 기존번호 삭제 메서드
    @Override
    @Transactional
    public ResponseEntity<ResponseDto> patchGuestAuth(
            PatchGuestAuthRequestDto dto, String guestId) {

        String telNumber = dto.getGuestTelNumber();
        String authNumber = dto.getGuestAuthNumber();

        try {

            GuestEntity guestEntity = guestRepository.findByGuestId(guestId);
            if (guestEntity == null)
                return ResponseDto.noExistUserId();
            
                boolean isMatchedAuth = telAuthNumberRepository.existsByTelNumberAndAuthNumber(telNumber, authNumber);
            if (!isMatchedAuth)
                return ResponseDto.telAuthFail();

            String oldTelNumber = guestEntity.getGuestTelNumber();

            guestEntity.patchTelNumber(dto);
            guestRepository.save(guestEntity);

            telAuthNumberRepository.deleteByTelNumber(oldTelNumber);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return ResponseDto.success();
    }

    @Override
    // 아이디 찾기위한 이름과 전화번호 입력받기
    public ResponseEntity<ResponseDto> guestIdFind(GuestIdFindRequestDto dto) {
        String guestName = dto.getGuestName();
        String guestTelNumber = dto.getGuestTelNumber();

        try {

            boolean isMatched = guestRepository.existsByGuestNameAndGuestTelNumber(guestName, guestTelNumber);
            if (!isMatched)
                return ResponseDto.notMatchValue();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        String authNumber = AuthNumberCreater.number4();

        boolean isSendSuccess = smsProvider.sendMessage(guestTelNumber, authNumber);
        if (!isSendSuccess)
            return ResponseDto.messageSendFail();

        try {
            TelAuthNumberEntity telAuthNumberEntity = new TelAuthNumberEntity(guestTelNumber, authNumber);
            telAuthNumberRepository.save(telAuthNumberEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return ResponseDto.success();

    }

    @Override
    // 전화번호 및 인증번호 확인
    public ResponseEntity<? super GuestIdFindSuccessResponseDto> guestTelAuthCheck(TelAuthCheckRequestDto dto) {
        String telNumber = dto.getTelNumber();
        String authNumber = dto.getAuthNumber();
        String userId;
        try {

            TelAuthNumberEntity telAuthNumberEntity = telAuthNumberRepository.findByTelNumberAndAuthNumber(telNumber,authNumber);
            if (telAuthNumberEntity == null)
                return ResponseDto.telAuthFail();

            GuestEntity guestEntity = guestRepository.findByGuestTelNumber(telNumber);
            userId = guestEntity.getGuestId();
            if (userId == null)
                return ResponseDto.noExistUserId();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GuestIdFindSuccessResponseDto.success(userId);
    }

    @Override
    // 비밀변호 변경(로그아웃)
    public ResponseEntity<ResponseDto> guestPwFind(GuestPwFindRequestDto dto) {
        
        String guestId = dto.getGuestId();
        String guestPw = dto.getGuestPw();

        try {
            // id 유효성 검사
            GuestEntity guestEntity = guestRepository.findByGuestId(guestId);
            if(guestEntity == null) return ResponseDto.noExistUserId();


            // 해당 아이디에 비밀번호 값 변경
            String encodedPassword = passwordEncoder.encode(guestPw);
            guestEntity.setGuestPw(encodedPassword);
            guestRepository.save(guestEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();   
        }

        return ResponseDto.success();

    }

    @Override
    // 게스트 정보 불러오기
    public ResponseEntity<? super GetGuestSignInResponseDto> getGuestSignIn(String userId) {
        
        GuestEntity guestEntity = null;

        try {
            
            guestEntity = guestRepository.findByGuestId(userId);
            if(guestEntity == null) return ResponseDto.noExistUserId();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetGuestSignInResponseDto.success(guestEntity);
    }

}