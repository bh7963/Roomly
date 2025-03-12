import { ResponseDto } from "src/apis/guestmypage";


export default interface GuestLogInResponseDto extends ResponseDto {
    guestAccessToken: string;
    expiration: number;
}