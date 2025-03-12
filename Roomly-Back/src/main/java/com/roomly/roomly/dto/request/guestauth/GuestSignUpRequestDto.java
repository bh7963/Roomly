package com.roomly.roomly.dto.request.guestauth;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GuestSignUpRequestDto {
    
    @NotBlank
    @Length(max=5)
    private String guestName;
    @NotBlank
    @Length(max=20)
    private String guestId;
    @Pattern(regexp="^(?=.*[a-zA-Z])(?=.*[0-9]).{8,13}$") 
    private String guestPw;
    @NotBlank
    @Pattern(regexp="^[0-9]{11}$") 
    private String guestTelNumber;
    @NotBlank
    private String guestAuthNumber;
    @Pattern(regexp="^(home|kakao|google)$")
    private String joinPath;
    private String snsId;
}
