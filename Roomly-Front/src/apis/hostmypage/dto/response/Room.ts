// room dto //

export default interface Room {
  roomId: number;
  roomName: string;
  roomMainImage: string;
  roomPrice: number;
  roomCheckIn: string;
  roomCheckOut: string;
  roomInfo: string;
  roomImages: string[];
  roomTotalGuest: number;
}
