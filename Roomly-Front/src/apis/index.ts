import axios, { AxiosResponse } from "axios";

import { GetHostAccommodationListResponseDto } from "./hostmypage/dto/response/GetHostAccommodationListResponseDto";
import { GET_ACCOMMODATION_API_URL, GET_ACCOMMODATION_DETAIL_API_URL, GET_ACCOMMODATION_LIST_API_URL, GET_BOOKMARK_LIST_API_URL, GET_RESERVATION_LIST_API_URL, GET_RESERVATION_STATUS_LIST_API_URL, HOST_ACCOMMODATION_LIST_API_URL, POST_ACCOMMODATION_MAIN_IMAGE_API_URL, POST_REVIEW_API_URL } from "src/constants";

import { GetAccommodationListResponseDto } from "./hostmypage/dto/response";
import GetAccommodationResponseDto from "./hostmypage/dto/response/GetAccommodationResponseDto";
import { ResponseDto } from "./guestmypage";
import { GetReservationListResponseDto } from "./guestmypage/dto/response/get-reservationlist.response.dto";
import { GetBookMarkListResponseDto } from "./guestmypage/dto/response/get-bookmarklist.response.dto";
import PostReviewRequestDto from './hostmypage/dto/request/post-review.request.dto';
import { GetReservationStatusListResponseDto } from "./hostmypage/dto/response/GetReservationStatusListResponseDto";


// variable: API URL 상수 //
const ROOMLY_API_DOMAIN = process.env.REACT_APP_API_URL;

const ACCOMMODATION_MODULE_URL = `${ROOMLY_API_DOMAIN}/api/roomly/accommodation`;
const multipart = {headers: { 'Content-Type': 'multipart/form-data' } };



// function: Authorization Bearer Header //
const bearerAuthorization = (accessToken: string) => ({ headers: { 'Authorization': `Bearer ${accessToken}` }});

// function: response data 처리 함수 //
const responseDataHandler = <T>(response: AxiosResponse<T, any>) => {
    const { data } = response;
    return data;
};

// function: response error 처리 함수 //
const responseErrorHandler = (error: any) => {
    if (!error.response) return null;
    const { data } = error.response;
    return data as ResponseDto;
};

// function: Get host accommodation list 처리함수 //
export const getHostAccommodationListRequest = async(hostId: string, accessToken: string) => {
    const responseBody = await axios.get(HOST_ACCOMMODATION_LIST_API_URL(hostId), bearerAuthorization(accessToken))
        .then(responseDataHandler<GetHostAccommodationListResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: Get accommodation List 처리 함수
export const getAccommodationListRequest = (accessToken:string)=> {
    const responseBody = axios.get(GET_ACCOMMODATION_LIST_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<GetAccommodationListResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// 이소진 작성
// function: Get accommodation detail List 처리 함수
export const getAccommodationDetailRequest = (accommodationName: string, checkInDay:string, checkOutDay: string, accessToken:string )=> {
    const responseBody = axios.get(GET_ACCOMMODATION_DETAIL_API_URL(accommodationName,checkInDay,checkOutDay ), bearerAuthorization(accessToken))
        .then(responseDataHandler<GetAccommodationResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: post accommodation Main image file upload 처리 함수 //
export const accommodationMainFileUploadRequest = async(requestBody:FormData)=>{
    const url = await axios.post(POST_ACCOMMODATION_MAIN_IMAGE_API_URL, requestBody, multipart)
        .then(responseDataHandler<string>)
        .catch(error => null);
    return url;
}

// 옥진서 작성
// function: get 숙소 예약 현황 처리 함수//
export const getReservationListRequest = async(userId: string, accessToken:string) => {
    const responseBody = axios.get(GET_RESERVATION_LIST_API_URL(userId), bearerAuthorization(accessToken))
    .then(responseDataHandler<GetReservationListResponseDto>)
    .catch(responseErrorHandler)
    return responseBody;
}

export const getBookMarkListRequest = async(userId: string, accessToken:string) => {
    const responseBody = axios.get(GET_BOOKMARK_LIST_API_URL(userId), bearerAuthorization(accessToken))
    .then(responseDataHandler<GetBookMarkListResponseDto>)
    .catch(responseErrorHandler)
    return responseBody;
}

export const PostReviewRequest = async(userId: string, requestBody: PostReviewRequestDto, accessToken:string) => {
    const responseBody = await axios.post(POST_REVIEW_API_URL(userId), requestBody, bearerAuthorization(accessToken))
    .then(responseDataHandler<ResponseDto>)
    .catch(responseErrorHandler)
    return responseBody;
}

// function: get (호스트) 숙소 예약 현황 처리 함수//
export const getHostReservationStatusListRequest = async(userId: string, accessToken:string) => {
    const responseBody = axios.get(GET_RESERVATION_STATUS_LIST_API_URL(userId), bearerAuthorization(accessToken))
    .then(responseDataHandler<GetReservationStatusListResponseDto>)
    .catch(responseErrorHandler)
    return responseBody;
}

