package com.roomly.roomly.entity;

import com.roomly.roomly.dto.request.guest.PatchGuestAuthRequestDto;
import com.roomly.roomly.dto.request.host.PatchHostTelNumberRequestDto;

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
@Entity(name="telAuthNumber")
@Table(name="tel_auth_number")
public class TelAuthNumberEntity {
    
    @Id
    private String telNumber;
    private String authNumber;

    public void patch(PatchHostTelNumberRequestDto dto){
        this.telNumber = dto.getTelNumber();
        this.authNumber = dto.getAuthNumber();
    }

    public void patchTelNumberAndAuthNumber(PatchGuestAuthRequestDto dto){
        this.telNumber = dto.getGuestTelNumber();
        this.authNumber = dto.getGuestAuthNumber();
    }

}
