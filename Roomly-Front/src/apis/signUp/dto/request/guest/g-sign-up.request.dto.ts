// interface: 회원가입 Reuqest Body Dto //

export default interface GuestSignUpRequestDto {
    guestName: string;
    guestId: string;
    guestPw: string;
    guestTelNumber: string;
    guestAuthNumber: string;
    snsId: string | null;
}