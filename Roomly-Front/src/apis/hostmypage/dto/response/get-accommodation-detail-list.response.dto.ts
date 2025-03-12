import { Accommodations } from "src/types";
import ResponseDto from "./response.dto";
import GetAccommodationResponseDto from "./GetAccommodationResponseDto";

export interface GetAccommodationDetailListResponseDto extends ResponseDto{

    accommodationsDetail: GetAccommodationResponseDto[];
}