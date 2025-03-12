// interface: searched customer request body dto //

import SearchedAccommodation from "src/types/accommodation/search-accommodation-list.interface";

// 메인 화면에서 검색 눌렀을 때 받을 request dto //
export default interface SearchedAccommodationRequestDto {
  type: SearchedAccommodation[];
}
