import ResponseDto from "./response.dto";

export default interface GuestIdFindSuccessResponseDto extends ResponseDto {
    guestId: string;
}