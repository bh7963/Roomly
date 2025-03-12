import axios, { AxiosResponse } from "axios";

import { AccommodationDTO } from "./dto/response/accommodation.response.dto";
import { PostAccommodationRequestDto } from "./dto/request/post-accommodation.request.dto";
import { POST_ACCOMMODATION_API_URL } from "src/constants";
import { ResponseDto } from "../guestmypage";

// variable: API URL 상수 //
const ROOMLY_API_DOMAIN = process.env.REACT_APP_API_URL;

// API 기본 설정
const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// function : Authorization Bearer 헤더 //
const bearerAuthorization = (accessToken: string) => ({
  headers: { Authorization: `Bearer ${accessToken}` },
});

// function : response data 처리 함수 //
const responseDataHandler = <T>(response: AxiosResponse<T, any>) => {
  const { data } = response;
  return data;
};

// function : Response Error 처리 함수 //
const responseErrorHandler = (error: any) => {
  if (!error.response) return null;
  const { data } = error.response;
  return data as ResponseDto;
};

// function: 숙소 검색 리스트 가져오기 요청 API 함수 //
const GET_ACCOMMODATION_LIST_API_URL = `${ROOMLY_API_DOMAIN}/accommodationList`;

export const fetchAccommodationList = async (): Promise<AccommodationDTO[]> => {
  try {
    const response = await api.get<AccommodationDTO[]>(
      GET_ACCOMMODATION_LIST_API_URL
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch accommodations:", error);
    throw error;
  }

};

  // function: 숙소 등록 요청 api 함수 //
  export const postAccommodationRequest = async(requestBody: PostAccommodationRequestDto, accessToken:string) => {
    const responseBody = await axios.post(POST_ACCOMMODATION_API_URL, requestBody, bearerAuthorization(accessToken))
      .then(responseDataHandler<ResponseDto>)
      .catch(responseErrorHandler)
    return responseBody;

  }
  
const multipart = { headers: { 'Content-Type': 'multipart/form-data' } };

  export const fileUploadRequest = async (requestBody: FormData) => {
    const url = await axios.post("http://localhost:4000/api/roomly/file/upload/accommodationMain", requestBody, multipart)
        .then(responseDataHandler<string>)
        .catch(error => null);
    return url;
};
