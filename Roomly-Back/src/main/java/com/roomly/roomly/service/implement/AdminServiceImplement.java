package com.roomly.roomly.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;

import com.roomly.roomly.dto.request.admin.PatchEntryStatusRequestDto;
import com.roomly.roomly.dto.response.ResponseDto;
import com.roomly.roomly.dto.response.admin.EntryHostRespnoseDto;
import com.roomly.roomly.dto.response.admin.GetAccommodationListResponseDto;
import com.roomly.roomly.dto.response.admin.GetGuestListResponseDto;
import com.roomly.roomly.dto.response.admin.GetHostListResponseDto;
import com.roomly.roomly.entity.AccommodationEntity;
import com.roomly.roomly.entity.GuestEntity;
import com.roomly.roomly.entity.HostEntity;
import com.roomly.roomly.repository.AccommodationRepository;
import com.roomly.roomly.repository.GuestRepository;
import com.roomly.roomly.repository.HostRepository;

import com.roomly.roomly.service.AdminService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImplement implements AdminService {

    private final GuestRepository guestRepository;
    private final HostRepository hostRepository;
    private final AccommodationRepository accommodationRepository;
    
    // 게스트 리스트 조회 메서드
    @Override
    public ResponseEntity<? super GetGuestListResponseDto> getGuestList() {
        
        List<GuestEntity> guestEntities = new ArrayList<>();

        try {
            guestEntities = guestRepository.getList();
            if (guestEntities == null) return ResponseDto.noExistGuest();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetGuestListResponseDto.success(guestEntities);
    }

    // 호스트 리스트 조회 메서드
    @Override
    public ResponseEntity<? super GetHostListResponseDto> getHostList() {
        List<HostEntity> hostEntities = new ArrayList<>();

        try {
            hostEntities = hostRepository.getList();
            if(hostEntities == null) return ResponseDto.noExistHost();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetHostListResponseDto.success(hostEntities);
    }

    // 호스트 상세 정보 조회 메서드
    @Override
    public ResponseEntity<? super EntryHostRespnoseDto> getHost(String hostId) {
        
        HostEntity hostEntity = null;

        try {
            hostEntity = hostRepository.findByHostId(hostId);
            if(hostEntity == null) return ResponseDto.noExistHost();
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return EntryHostRespnoseDto.success(hostEntity);
    }

    // 호스트 계정 승인상태 변경 메서드
    @Override
    public ResponseEntity<ResponseDto> patchEntryStatus(PatchEntryStatusRequestDto dto, String hostId) {
        
        try {

            HostEntity hostEntity = hostRepository.findByHostId(hostId);
            if (hostEntity == null ) return ResponseDto.noExistHost();

            if(hostEntity.getEntryStatus() == true) return ResponseDto.entryFail();
            
            hostEntity.setEntryStatus(true);
            hostRepository.save(hostEntity);
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return ResponseDto.success();
    }

    // 숙소 리스트 조회 메서드
    @Override
    public ResponseEntity<? super GetAccommodationListResponseDto> getAccommodationList() {
        List<AccommodationEntity> accommodationEntities = new ArrayList<>();

        try {

            accommodationEntities = accommodationRepository.getAccommodationList();
            if (accommodationEntities == null ) return ResponseDto.noExistAccommodation();
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetAccommodationListResponseDto.success(accommodationEntities);
    }

    // 숙소 승인 상태 변경 메서드
    @Override
    public ResponseEntity<ResponseDto> patchApplyStatus(String accommodationName) {
        
        try {

            AccommodationEntity accommodationEntity = accommodationRepository.findByAccommodationName(accommodationName);
            if (accommodationEntity == null) return ResponseDto.noExistAccommodation();
            if(accommodationEntity.getApplyStatus() == true) return ResponseDto.entryFail();
            

            accommodationEntity.setApplyStatus(true);
            accommodationRepository.save(accommodationEntity);
            accommodationEntity.getEntryTime();

            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return ResponseDto.success();
    }
    
}
