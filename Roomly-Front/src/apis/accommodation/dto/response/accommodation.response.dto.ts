// interface: 메인에서 숙소 검색 시 불러올 숙소 검색 리스트 dto//

export interface AccommodationDTO {
  accommodationName: string; 
  accommodationMainImage: string; 
  accommodationType: string; 
  accommodationGradeAverage: number; 
  // 이거 삭제 해야 하는건지 벡엔드 형제들에게 물어보기 
  accommodationAddress: string;

  categoryArea: string; 
  categoryPet: boolean;
  categoryNonSmokingArea: boolean;
  categoryIndoorSpa: boolean;
  categoryDinnerParty: boolean;
  categoryWifi: boolean;
  categoryCarPark: boolean;
  categoryPool: boolean;

  applyStatus: boolean;

  minRoomPrice: number;
  countReview: number;

}
