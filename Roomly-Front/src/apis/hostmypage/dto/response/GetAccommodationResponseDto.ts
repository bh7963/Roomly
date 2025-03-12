// interface: dto//
import { ResponseDto } from "src/apis/accommodation/dto/response";

import { UseInformation } from "./UseInformation";
import Room from "./Room";
import UseInformations from "src/types/accommodation/use-informaion.interface";


export default interface GetAccommodationResponseDto extends ResponseDto {

  accommodationName: string;
  accommodationMainImage: string;
  accSubImages: string[];
  accommodationAddress: string;
  accommodationType: string;
  accommodationIntroduce: string;
  useInformations: UseInformation[];
  roomList: Room[];
  categoryArea: string;
  categoryPet: boolean;
  categoryNonSmokingArea: boolean;
  categoryIndoorSpa: boolean;
  categoryDinnerParty: boolean;
  categoryWifi: boolean;
  categoryCarPark: boolean;
  categoryPool: boolean;

}


  