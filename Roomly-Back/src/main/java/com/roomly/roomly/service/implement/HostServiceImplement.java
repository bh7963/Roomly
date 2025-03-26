package com.roomly.roomly.service.implement;

import java.util.List;
import java.util.ArrayList;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.roomly.roomly.common.object.Reservation;
import com.roomly.roomly.common.util.AuthNumberCreater;
import com.roomly.roomly.dto.request.host.HostIdFindRequestDto;
import com.roomly.roomly.dto.request.host.HostMyPageRequestDto;
import com.roomly.roomly.dto.request.host.HostPwFindRequestDto;
import com.roomly.roomly.dto.request.host.PatchHostPasswordRequestDto;
import com.roomly.roomly.dto.request.host.PatchHostTelNumberRequestDto;
import com.roomly.roomly.dto.request.host.TelAuthCheckRequestDto;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.host.GetHostAccommodationListResponseDto;
import com.roomly.roomly.dto.response.host.GetHostResponseDto;
import com.roomly.roomly.dto.response.host.GetHostSignInResponseDto;
import com.roomly.roomly.dto.response.host.HostIdFindSuccessResponseDto;
import com.roomly.roomly.dto.response.reservation.GetReservationResponseDto;
import com.roomly.roomly.entity.AccommodationEntity;
import com.roomly.roomly.entity.HostEntity;
import com.roomly.roomly.entity.TelAuthNumberEntity;
import com.roomly.roomly.provider.SmsProvider;
import com.roomly.roomly.repository.AccommodationRepository;
import com.roomly.roomly.repository.HostRepository;
import com.roomly.roomly.repository.ReservationRepository;
import com.roomly.roomly.repository.TelAuthNumberRepository;
import com.roomly.roomly.repository.resultSet.GetReservationResultSet;
import com.roomly.roomly.service.HostService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HostServiceImplement implements HostService {

    private final HostRepository hostRepository;
    private final TelAuthNumberRepository telAuthNumberRepository;
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final ReservationRepository reservationRepository;
    private final AccommodationRepository accommodationRepository;
    private final SmsProvider smsProvider;

    // 마이페이지 호스트 정보 조회 메서드
    @Override
    public ResponseEntity<? super GetHostResponseDto> getHost(HostMyPageRequestDto dto, String hostId) {

        HostEntity hostEntity;

        try {

            hostEntity = hostRepository.findByHostId(hostId);
            if (hostEntity == null)
                return ResponseDto.noExistUserId();
            String checkPw = hostEntity.getHostPw();
            String hostPw = dto.getHostPw();
            
            boolean isMatched = passwordEncoder.matches(hostPw, checkPw);
            if(!isMatched) return ResponseDto.noPermission();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetHostResponseDto.success(hostEntity);

    }

    // 호스트 비밀번호 수정 메서드
    @Override
    public ResponseEntity<ResponseDto> patchHostPassword(PatchHostPasswordRequestDto dto, String hostId) {

        String currentHostPw = dto. getCurrentHostPw();
        String changePassword = dto.getChangeHostPw();

        try {
            HostEntity hostEntity = hostRepository.findByHostId(hostId);
            if (hostEntity == null)
                return ResponseDto.noExistUserId();

                String basicPw = hostEntity.getHostPw();
                boolean isMatched = passwordEncoder.matches(currentHostPw, basicPw);
                if (!isMatched) return ResponseDto.notMatchValue();
                
                String encodedPassword = passwordEncoder.encode(changePassword);
                dto.setChangeHostPw(encodedPassword);
                hostEntity.patchPw(dto);
                hostRepository.save(hostEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return ResponseDto.success();
    }

    // 호스트 전화번호 수정 및 재인증 메서드
    @Override
    public ResponseEntity<ResponseDto> patchHostTelNumber(PatchHostTelNumberRequestDto dto, String hostId) {

        // 바꿀 전화번호
        String changeTelNumber = dto.getTelNumber();
        String authNumber = dto.getAuthNumber();

        try {
            HostEntity hostEntity = hostRepository.findByHostId(hostId);
            if (hostEntity == null)
                return ResponseDto.noExistUserId();
            String hostTelNumber = hostEntity.getHostTelNumber();

            TelAuthNumberEntity telAuthNumberEntity = telAuthNumberRepository
                    .findByTelNumberAndAuthNumber(changeTelNumber, authNumber);
            if (telAuthNumberEntity == null)
                return ResponseDto.telAuthFail();

            hostEntity.setHostTelNumber(changeTelNumber);
            hostRepository.save(hostEntity);

            telAuthNumberRepository.deleteByTelNumber(hostTelNumber);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return ResponseDto.success();
    }

    // 호스트(숙소) 예약리스트 조회 메서드
    @Override
    public ResponseEntity<? super GetReservationResponseDto> getRerservaitonList(String hostId) {

        List<GetReservationResultSet> resultSets = new ArrayList<>();
        List<Reservation> resrervationList = new ArrayList<>();

        try {

            boolean isExist = accommodationRepository.existsByHostId(hostId);
            if (!isExist)
                return ResponseDto.noExistAccommodation();

            resultSets = reservationRepository.getReservationList(hostId);
            if (resultSets == null)
                return ResponseDto.noExistReservation();

            for (GetReservationResultSet resultSet : resultSets) {
                Reservation reservation = new Reservation(resultSet);
                resrervationList.add(reservation);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetReservationResponseDto.success(resrervationList);
    }

    // 호스트 아이디찾기 및 전화번호 및 인증번호 전송 메서드
    @Override
    public ResponseEntity<ResponseDto> hostIdFind(HostIdFindRequestDto dto) {

        String hostName = dto.getHostName();
        String hostTelNumber = dto.getHostTelNumber();

        try {

            boolean isMatched = hostRepository.existsByHostNameAndHostTelNumber(hostName, hostTelNumber);
            if (!isMatched)
                return ResponseDto.noExistUserId();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        String authNumber = AuthNumberCreater.number4();

        boolean isSendSuccess = smsProvider.sendMessage(hostTelNumber, authNumber);
        if (!isSendSuccess)
            return ResponseDto.messageSendFail();

        try {
            TelAuthNumberEntity telAuthNumberEntity = new TelAuthNumberEntity(hostTelNumber, authNumber);
            telAuthNumberRepository.save(telAuthNumberEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return ResponseDto.success();

    }

    // 아이디 찾기 전화번호 및 인증번호 재인증 메서드
    @Override
    public ResponseEntity<? super HostIdFindSuccessResponseDto> telAuthCheck(TelAuthCheckRequestDto dto) {

        
        String userId = null;

        try {
            
            String telNumber = dto.getTelNumber();
            String authNumber = dto.getAuthNumber();

            TelAuthNumberEntity telAuthNumberEntity = telAuthNumberRepository.findByTelNumberAndAuthNumber(telNumber,authNumber);
            if (telAuthNumberEntity == null)
                return ResponseDto.telAuthFail();

                HostEntity hostEntity = hostRepository.findByHostTelNumber(telNumber);
                if (hostEntity == null) return ResponseDto.noExistHost();
                userId = hostEntity.getHostId();
            if (userId == null)
                return ResponseDto.noExistUserId();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return HostIdFindSuccessResponseDto.success(userId);
    }

    // 비밀번호 변경(로그아웃)
    @Override
    public ResponseEntity<ResponseDto> hostPwFind(HostPwFindRequestDto dto) {
        
        String hostId = dto.getHostId();
        String hostPw = dto.getHostPw();

        try {
            
            HostEntity hostEntity = hostRepository.findByHostId(hostId);
            if(hostEntity == null) return ResponseDto.noExistUserId();

            String encodedPassword = passwordEncoder.encode(hostPw);
            hostEntity.setHostPw(encodedPassword);
            hostRepository.save(hostEntity);

        } catch (Exception e) {
            
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return ResponseDto.success();
    }

    @Override
    public ResponseEntity<? super GetHostAccommodationListResponseDto> getList(String hostId) {
        List<AccommodationEntity> accommodationEntities = new ArrayList<>();
        try {

            accommodationEntities = accommodationRepository.findByHostId(hostId);
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetHostAccommodationListResponseDto.success(accommodationEntities);
    }

    @Override
    // 호스트 정보 불러오기
    public ResponseEntity<? super GetHostSignInResponseDto> getHostSignIn(String hostId) {
        
        HostEntity HostEntity = null;

        try {
            
            HostEntity = hostRepository.findByHostId(hostId);
            if(HostEntity == null) return ResponseDto.noExistUserId();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetHostSignInResponseDto.success(HostEntity);
    }

}
