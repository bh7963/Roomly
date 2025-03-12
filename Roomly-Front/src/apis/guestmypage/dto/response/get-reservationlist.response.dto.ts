import { UseInformation } from "src/types";
import ResponseDto from "./response.dto";

export interface GetReservationListResponseDto extends ResponseDto{

    getReservationStatusResultSets: UseInformation[];
}