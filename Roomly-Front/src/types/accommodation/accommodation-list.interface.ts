// interface: 숙소 검색 결과 리스트 //
export default interface AccommodationDetailListType {
  accommodationName: string;
  accommodationMainImage: string;
  accommodationAddress: string;
  accommodationType: string;
  accommodationGradeSum: number;

  categoryPet: boolean;
  categoryNonSmokingArea: boolean;
  categoryIndoorSpa: boolean;
  categoryDinnerParty: boolean;
  categoryWifi: boolean;
  categoryCarPark: boolean;
  categoryPool: boolean;
}
