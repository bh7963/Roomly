package com.roomly.roomly.dto.request.payment;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PaymentSuccessRequestDto{
    
    
    private Long totalPrice; // 결제가격(숙박일수*객실1박가격)
    @NotBlank
    @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$")
    private String checkInDate; // 체크인날짜
    @NotBlank
    @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$")
    private String checkOutDate; // 체크아웃날짜
    private Integer reservationTotalPeople; // 예약 총 인원
    @NotBlank
    private String createdAt; // 예약 생성일
    private Integer totalNight; // x박 수 
    @NotBlank
    private String guestId; // 게스트
    private Integer roomId; // 객실 고유 번호
    
}
