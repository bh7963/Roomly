// interface: 필터 검색 눌렀을 때 요청할 request dto //

export interface FilterRequestDto {
  price_min: number;         // 최소 가격
  price_max: number;         // 최대 가격
  review_score: number[];    // 선택된 평점 배열 (0부터 5까지 점수로 필터링)
  accommodation_type: string[]; // 선택된 숙소 타입 (호텔, 펜션 등)
  facilities: string[];      // 선택된 시설 배열 (예: Free Wi-Fi, Parking 등)
}
