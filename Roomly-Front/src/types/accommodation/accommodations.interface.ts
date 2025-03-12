export default interface Accommodations {

    accommodationName: string; 
    accommodationMainImage: string; 
    accommodationType: string; 
    accommodationGradeAverage: number; 

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