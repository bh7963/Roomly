import { ResponseDto } from "src/apis/guestmypage";
import ReservationList from "src/types/accommodation/reservationstatus-list.interface";

export default interface GetReservationStatusListResponseDto extends ResponseDto{
  reservationList: ReservationList[];
}
