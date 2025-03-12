import axios, { AxiosResponse } from "axios";
import ResponseDto from "./dto/response/response.dto";
import GuestIdCheckRequestDto from "./dto/request/guest/g-id-check.requst.dto";
import HostIdCheckRequestDto from "./dto/request/host/h-id-check.requst.dto";
import GuestSignUpRequestDto from "./dto/request/guest/g-sign-up.request.dto";
import HostSignUpRequestDto from "./dto/request/host/h-sign-up.request.dto";
import TelAuthRequestDto from "./dto/request/common/tel-auth.request.dto";
import TelAuthCheckRequestDto from "./dto/request/common/tel-auth-check.request.dto";
import BusinessNumberCheckRequestDto from "./dto/request/host/h-business-number-check.request.dto";
import { GET_GUEST_SIGN_IN, GET_HOST_SIGN_IN, GUEST_ID_FIND_API_URL, GUEST_ID_FIND_TEL_AUTH_CHECK_API_URL, GUEST_SIGN_IN_API_URL, HOST_ID_CHECK, HOST_SIGN_UP_API_MODULE } from "src/constants";
import GetSignInResponseDto from "../login/dto/response/get-guest-sign-in.response.dto";
import GetGuestSignInResponseDto from "../login/dto/response/get-guest-sign-in.response.dto";
import { GetHostSignInResponseDto } from "../login/dto";
import Accommodation from './../../types/accommodation/accommodation.interface';
import GuestIdFindRequestDto from "./dto/request/common/guest-id-find-request.dto";
import GuestIdFindSuccessResponseDto from "../login/dto/response/guest-id-find-success-response-dto";
import GuestTelAuthCheckRequestDto from "./dto/request/common/guest-tel-auth-check-request.dto";

// variable: API URL 상수 //
const ROOMLY_API_DOMAIN = process.env.REACT_APP_API_URL;

const AUTH_MODULE_URL = `${ROOMLY_API_DOMAIN}/api/roomly/auth/guest`;
const GUEST_ID_CHECK_API_URL = `${AUTH_MODULE_URL}/id-check`;
const TEL_AUTH_API_URL = `${AUTH_MODULE_URL}/tel-auth`;
const TEL_AUTH_CHECK_API_URL = `${AUTH_MODULE_URL}/tel-auth-check`;
const GUEST_SIGN_UP_API_URL = `${AUTH_MODULE_URL}/sign-up`;
const BUSINESS_NUMBER_CHECK_API_URL = `${ROOMLY_API_DOMAIN}/api/validate-business`;
const GUEST_FIND_TEL_AUTH_CHECK_API_URL = `${AUTH_MODULE_URL}/id-find-tel-auth-check`;

// function : Authorization Bearer 헤더 //
const bearerAuthorization = (accessToken: string) => ({
    headers: { Authorization: `Bearer ${accessToken}` },
});


// function : response data 처리 함수 //
const responseDataHandler = <T>(response: AxiosResponse<T>) => {
    const { data } = response;
    return data;
};

// function : Response Error 처리 함수 //
const responseErrorHandler = (error: any) => {
    if (!error.response) return null;
    const { data } = error.response;
    return data as ResponseDto;
};

// function : guest id check api 요청함수 //
export const guestIdCheckRequest = async (
    requestBody: GuestIdCheckRequestDto
) => {
    const responseBody = await axios
        .post(GUEST_ID_CHECK_API_URL, requestBody)
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function : host id check api 요청함수 //
export const hostIdCheckRequest = async (
    requestBody: HostIdCheckRequestDto
) => {
    const responseBody = await axios
        .post(HOST_ID_CHECK, requestBody)
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function : tel auth api 요청 함수 //
export const telAuthRequest = async (requestBody: TelAuthRequestDto) => {
    const responseBody = await axios
        .post(TEL_AUTH_API_URL, requestBody)
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: guestId 찾기 tel auth api 요청함수 //
export const guestIdFind = async (requestBody: GuestIdFindRequestDto) => {
    const responseBody = await axios
        .post(GUEST_ID_FIND_API_URL, requestBody)
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
        return responseBody;
};

// function: guestId 찾기 인증번호 확인 요청 함수 //
export const guestIdFindAuth = async (
    requestBody: TelAuthCheckRequestDto
) => {
    const responseBody = await axios
        .post(GUEST_ID_FIND_TEL_AUTH_CHECK_API_URL, requestBody)
        .then(responseDataHandler<GuestIdFindSuccessResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: tel auth check 요청 함수 //
export const telAuthCheckRequest = async (
    requestBody: TelAuthCheckRequestDto
) => {
    const responseBody = await axios
        .post(TEL_AUTH_CHECK_API_URL, requestBody)
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};


// function : guest sign up 요청 함수//
export const guestSignUpRequest = async (
    requestBody: GuestSignUpRequestDto
) => {
    const responseBody = await axios
    .post(GUEST_SIGN_UP_API_URL, requestBody)
    .then(responseDataHandler<ResponseDto>)
    .catch(responseErrorHandler);
    return responseBody;
};

// function : host sign up 요청 함수//
export const hostSignUpRequest = async (
    requestBody: HostSignUpRequestDto
) => {
    const responseBody = await axios
        .post(HOST_SIGN_UP_API_MODULE, requestBody)
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function : business number check api 요청함수 //
export const businessNumberCheckRequest = async (
    requestBody: BusinessNumberCheckRequestDto
) => {
    const responseBody = await axios
        .post(BUSINESS_NUMBER_CHECK_API_URL, requestBody)
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// 로그인 관련

// function: get sign in 요청 함수 //
export const getSignInRequest = async (accessToken: string) => {
    const responseBody = await axios.get(GET_GUEST_SIGN_IN, bearerAuthorization(accessToken))
    .then(responseDataHandler<GetGuestSignInResponseDto>)
    .catch(responseErrorHandler);
    return  responseBody
}
// function: get sign in host 요청 함수 //
export const getSignInHostRequest = async (accessToken: string) => {
    const responseBody = await axios.get(GET_HOST_SIGN_IN, bearerAuthorization(accessToken))
        .then(responseDataHandler<GetHostSignInResponseDto>)
        .catch(responseErrorHandler)
        return responseBody;
}