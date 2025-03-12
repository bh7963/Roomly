package com.roomly.roomly.dto.request.hostauth;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class HostSignUpRequestDto {
    
    @NotBlank
    @Length(max=20)
    private String hostId;
    @NotBlank
    @Pattern(regexp="^(?=.*[a-zA-Z])(?=.*[0-9]).{8,13}$")
    private String hostPw;
    @NotBlank
    @Length(max=5)
    private String hostName;
    @NotBlank
    @Pattern(regexp="^[0-9]{11}$")
    private String hostTelNumber;
    @NotBlank
    private String hostAuthNumber;
    @NotBlank
    private String hostBusinessNumber;
    @NotBlank
    private String businessName;
    @NotBlank
    private String businessStartDay;
    @NotBlank
    private String businessImage;
    private boolean entryStatus;


}
