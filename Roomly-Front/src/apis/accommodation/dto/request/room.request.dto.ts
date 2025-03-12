// interface: room request dto //

export interface RoomDTO {
  roomPrice: number;
  roomName: string;
  checkInTime: string; 
  checkOutTime: string; 
  maxOccupancy: number;
  description: string;
  images: string[];
}
