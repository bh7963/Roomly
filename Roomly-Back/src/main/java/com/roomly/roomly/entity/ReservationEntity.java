package com.roomly.roomly.entity;

import com.roomly.roomly.dto.request.payment.PaymentSuccessRequestDto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
@Entity(name="reservation")
@Table(name="reservation")
public class ReservationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reservationId; // 예약번호
    private String guestId; // 게스트 아이디
    private Integer roomId; // 객실 고유번호
    private String checkInDay; // 체크인 날
    private String checkOutDay; // 체크아웃 날
    private Integer reservationTotalPeople; // 객실 최대인원수
    private String createdAt; // 생성일
    private Integer totalNight; // 총 박수
    private Long totalPrice; // 총 가격

    public ReservationEntity(PaymentSuccessRequestDto dto){
        this.guestId = dto.getGuestId();
        this.roomId = dto.getRoomId();
        this.checkInDay = dto.getCheckInDate();
        this.checkOutDay = dto.getCheckOutDate();
        this.reservationTotalPeople = dto.getReservationTotalPeople();
        this.createdAt = dto.getCreatedAt();
        this.totalNight = dto.getTotalNight();
        this.totalPrice = dto.getTotalPrice();
    }

    
}
