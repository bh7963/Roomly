// interface: 숙소 리스트에서 숙소 선택 시 불러올 숙소 상세 리스트 dto//

import { RoomDTO } from "./room.request.dto";

export interface AccommodationDetailRequestDTO {
    accommodation_name: string;
    introduction: string;
    usage_info: string;
    rooms: RoomDTO[];
}
