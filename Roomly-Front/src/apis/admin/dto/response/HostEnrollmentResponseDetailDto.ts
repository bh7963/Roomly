export default interface HostEnrollmentResponseDetailDto {
    status: "pending" | "approved";


    hostName: string;
    hostId: string;
    businessLicenseNumber: string;
    hostTelNumber: string | number;
    ownerName: string; // 사업자 대표 성명
    businessOpenDay: string; // 개업 날짜
    businessLicenseImg: string; 
  }