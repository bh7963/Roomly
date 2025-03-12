// GetHostAccommodationListResponseDto.ts

import { MyAccommodation } from "./MyAccommodation";
import ResponseDto from "./response.dto";


export interface GetHostAccommodationListResponseDto extends ResponseDto{
  accommodations: MyAccommodation[];
}
