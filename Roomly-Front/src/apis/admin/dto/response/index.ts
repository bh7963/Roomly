// interface: admin request dto //

export interface AdminResponseDTO {
    
    hostId: string;                   // 호스트 아이디(pk)
    host_name: string;            // 호스트 이름
    accommodation_name: string;   // 숙소 이름
    // request_date: string;         // 요청 날짜는 데이터 프론트 엔드에서 어떻게 처리해야 할지 알아봐야 함

}
