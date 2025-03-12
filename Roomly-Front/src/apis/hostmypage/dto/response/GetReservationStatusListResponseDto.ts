import ReservationStatusList from "src/types/accommodation/reservationstatus-list.interface";
import ResponseDto from "./response.dto";


export interface GetReservationStatusListResponseDto extends ResponseDto{
  reservationStatusList: ReservationStatusList[];
}
