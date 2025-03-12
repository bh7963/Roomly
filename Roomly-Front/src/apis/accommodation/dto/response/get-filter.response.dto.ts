import AccommodationListType from "src/types/accommodation/accommodation-list.interface";

// interface: get filter response body dto //
export default interface GetFillterResponseDto {
  type: AccommodationListType[];
}

// 특정 숙소 가격 범위에 대한 requestDto를 만들때는 min,maxPrice로 요청해라고 답변 해주었는데 그럼 해당 데이터를 서버에 요청한 뒤 응답 받는 responseDto에는 그냥
