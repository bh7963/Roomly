
// interface: 결제 성공 후 예약 정보 전송 request dto //
export default interface PostReservationRequestDto {
    totalPrice:number;
    checkInDate:string;
    checkOutDate:string;
    reservationTotalPeople:number;
    createdAt:string;
    totalNight:number;
    guestId:string;
    roomId:number;
}