// interface: 호스트 계정 승인 요청 페이지 response body dto //
export default interface HostEnrollmentResponseDto {

    // 리스트에 보여질 정보
    hostName: string;
    hostId: string;
    businessLicenseNumber: string;
    status: 'pending' | 'approved'; // 상태
  }