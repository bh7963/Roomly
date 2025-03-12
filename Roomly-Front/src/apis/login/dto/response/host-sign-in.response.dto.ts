import { ResponseDto } from "src/apis/guestmypage";

export default interface HostSignInResponseDto extends ResponseDto{
    hostAccessToken: string;
    expiration: number;
}