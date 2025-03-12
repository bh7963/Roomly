import { Accommodations } from "src/types";
import ResponseDto from "./response.dto";

export interface GetAccommodationListResponseDto extends ResponseDto{

    accommodations: Accommodations[];
}