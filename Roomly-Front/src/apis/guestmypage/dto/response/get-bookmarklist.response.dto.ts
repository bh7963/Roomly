import { BookMarkListType } from "src/types";
import ResponseDto from "./response.dto";

// UseInformation 인터페이스 정의
export interface GetBookMarkListResponseDto extends ResponseDto{
  bookMarkResultSets : BookMarkListType[];
}
