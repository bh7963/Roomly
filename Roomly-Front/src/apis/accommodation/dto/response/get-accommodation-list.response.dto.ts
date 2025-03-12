import { AccommodationListType } from "src/types";
import ResponseDto from "./response.dto";

// interface: get customer list response body dto //
export default interface GetAccommodationListResponseDto extends ResponseDto {
  type: AccommodationListType[];
}
