// interface: 회원가입 Reuqest Body Dto //

export default interface HostSignUpRequestDto {
    hostId: string;
    hostPw: string;
    hostName: string;   
    hostTelNumber: string;
    hostAuthNumber: string;
    businessName: string;
    businessStartDay: string;
    hostBusinessNumber: string;
    businessType: string;
}