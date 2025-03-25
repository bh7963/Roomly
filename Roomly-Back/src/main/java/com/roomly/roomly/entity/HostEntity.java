package com.roomly.roomly.entity;

import com.roomly.roomly.dto.request.host.HostIdFindRequestDto;
import com.roomly.roomly.dto.request.host.PatchHostPasswordRequestDto;
import com.roomly.roomly.dto.request.hostauth.HostSignUpRequestDto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="host")
@Table(name="host")
public class HostEntity {

    @Id
    private String hostId;
    
    private String hostPw;
    private String hostName;
    private String hostBusinessNumber;
    private String hostTelNumber;
    private String businessName;
    private String businessStartDay;
    private String businessType;
    private Boolean entryStatus;

    public HostEntity(HostSignUpRequestDto dto){
        this.hostId = dto.getHostId();
        this.hostPw = dto.getHostPw();
        this.hostName = dto.getHostName();
        this.hostTelNumber = dto.getHostTelNumber();
        this.hostBusinessNumber = dto.getHostBusinessNumber();
        this.businessName = dto.getBusinessName();
        this.businessStartDay = dto.getBusinessStartDay();
        this.businessType = dto.getBusinessType();
        this.entryStatus = dto.isEntryStatus();
    }

    public HostEntity(HostIdFindRequestDto dto){
        this.hostName = dto.getHostName();
        this.hostTelNumber = dto.getHostTelNumber();
    }

    public void patchPw(PatchHostPasswordRequestDto dto) {
        this.hostPw = dto.getChangeHostPw();
    }
    

    
}
