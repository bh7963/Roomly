
import AccommodationInfo from "src/types/accommodation/accommodationInfo";
import Rooms from "src/types/accommodation/rooms.interface";
import UseInformations from "src/types/accommodation/use-informaion.interface";


export interface PostAccommodationRequestDto{

    accommodation:AccommodationInfo;
    accommodationImages:string[]
    useInformations:UseInformations[];
    rooms:Rooms[];
}