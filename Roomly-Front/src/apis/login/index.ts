import GuestLogInRequestDto from './dto/request/guest/login.request.dto';
import axios, { AxiosResponse } from 'axios';
import { GET_GUEST_SIGN_IN, GUEST_SIGN_IN_API_URL, HOST_SIGN_IN_API_URL, PATCH_GUEST_PASSWORD_API_URL, PATCH_HOST_PASSWORD_API_URL } from 'src/constants';

import MypageAuthRequestDto from './dto/request/guest/mypageauth.request.dto';
import GetGuestSignInResponseDto from './dto/response/get-guest-sign-in.response.dto';
import HostLogInRequestDto from './dto/request/host/login.request.dto';
import GuestPwChangeRequestDto from './dto/request/guest/guestpwchange.request.dto';
import HostLogInResponseDto from './dto/response/host-sign-in.response.dto';

import { ResponseDto } from '../guestmypage';

import HostPwChangeRequestDto from './dto/request/host/hostpwchange.request.dto';
import GuestSignInResponseDto from './dto/response/guest-sign-in.response.dto';

// function : Authorization Bearer 헤더 //
const bearerAuthorization = (accessToken: string) => ({
    headers: { Authorization: `Bearer ${accessToken}` }});

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

// function: 게스트 로그인 처리 함수 //
export const GuestLogInRequest = async (requestBody: GuestLogInRequestDto) => {
    const responseBody = await axios.post(GUEST_SIGN_IN_API_URL, requestBody)
        .then(responseDataHandler<GuestSignInResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 호스트 로그인 처리 함수 //
export const HostLogInRequest = async (requestBody: HostLogInRequestDto) => {
    const responseBody = await axios.post(HOST_SIGN_IN_API_URL, requestBody)
        .then(responseDataHandler<HostLogInResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 게스트 비밀번호 처리 함수 //
export const ChangeGuestPwRequest = async (userId: string, requestBody: GuestPwChangeRequestDto, accessToken: string) => {
    
    const responseBody = await axios.patch(PATCH_GUEST_PASSWORD_API_URL(userId), requestBody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 호스트 비밀번호 처리 함수 //
export const ChangeHostPwRequest = async (requestBody: HostPwChangeRequestDto, userId: string, accessToken:string) => {
    
    const responseBody = await axios.patch(PATCH_HOST_PASSWORD_API_URL, requestBody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

export const MypageAuthRequest = async (requestBody: MypageAuthRequestDto) => {
    const responseBody = await axios.delete('http://localhos:4000/api/romly/bookmark/delete-bookmark/&{}/&{}')
}

export const getGuestSignInRequest = async(accessToken: string) => {
    const responseBody = await axios.get(GET_GUEST_SIGN_IN, bearerAuthorization(accessToken))
        .then(responseDataHandler<GetGuestSignInResponseDto>)
        .catch(responseErrorHandler)
    return responseBody;
}
