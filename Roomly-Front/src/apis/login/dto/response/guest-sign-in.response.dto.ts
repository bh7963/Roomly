import { ResponseDto } from "src/apis/guestmypage";

export default interface GuestSignInResponseDto extends ResponseDto{
    guestAccessToken: string;
    expiration: number;
}