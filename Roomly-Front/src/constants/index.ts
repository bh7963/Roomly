// variable: 상대 경로 상수 //

import axios, { AxiosResponse } from "axios";
import GetGuestSignInResponseDto from "src/apis/login/dto/response/get-guest-sign-in.response.dto";
import GetSignInResponseDto from "src/apis/login/dto/response/get-guest-sign-in.response.dto";
import { ResponseDto } from "src/apis/signUp/dto/response";

export const ROOT_PATH = "/";

export const MAIN_PATH = "/main"
export const AUTH_PATH = "/sign-up"
export const PAYMENT_PATH = "/payment";
export const FINDID_PATH = "/find";
export const MODAL3 = "/payment";
export const HOST_MYPAGE_PATH = (hostId:string)=> `/mypage-host/${hostId}`

export const ACCOMMODATION_LIST_PATH = "/accommodationlist";
export const ACCOMMODATION_LIST_DETAIL_PATH = (accommodationName:string)=>`/accommodationlist/detail/${accommodationName}`;
export const ACCOMMODATION_LIST_DETAIL_ACC_SELECT_PATH = (name: string) =>`${ACCOMMODATION_LIST_DETAIL_ACC_SELECT_PATH}/${name}`;

// variable: HTTP BEARER TOKEN COOKIE NAME(토큰 이름 임시 지정) //
export const GUEST_ACCESS_TOKEN = 'guestAccessToken';
export const HOST_ACCESS_TOKEN = 'hostAccessToken';
export const OTHERS_PATH = '*';

// variable: API URL 상수 //
export const ROOMLY_API_DOMAIN = process.env.REACT_APP_API_URL;

// variable: 어드민 모듈
export const ADMIN_MODULE_URL = `${ROOMLY_API_DOMAIN}/api/roomly/admin`;
// 관리자-게스트 정보 리스트
export const GET_GUEST_INFO_LIST_API_URL = `${ADMIN_MODULE_URL}/guest-info/list`;
// 관리자-호스트 정보 리스트
export const GET_HOST_INFO_LIST_API_URL = `${ADMIN_MODULE_URL}/host-info/list`; 
// 관리자-호스트 정보 상세보기(어드민이 회원가입시 확인할때 사용)
export const GET_HOST_INFO_API_URL = (hostId:string)=>`${ADMIN_MODULE_URL}/info/detail/${hostId}`;
// 관리자-호스트 계정 승인상태 변경
export const PATCH_HOST_STATUS_API_URL = (hostId:string)=>`${ADMIN_MODULE_URL}/update/status/${hostId}`;
// 숙소 리스트(숙소 승인 상태에 따라)
export const GET_ACCOMMODATION_STATUS_LIST_API_URL = `${ADMIN_MODULE_URL}/accommodation-list`;
// 숙소 승인 상태 변경
export const PATCH_ACCOMMODATION_STATUS_API_URL = (accommodationName:string)=>`${ADMIN_MODULE_URL}/accommodation-apply/${accommodationName}`;

// variable: 호스트 인증 모듈
export const HOST_AUTH_MODULE_URL = `${ROOMLY_API_DOMAIN}/api/roomly/auth/host`;
// 호스트 아이디 확인
export const HOST_ID_CHECK = `${HOST_AUTH_MODULE_URL}/id-check`;
// 전화번호 중복확인 및 인증번호 발송
export const HOST_TEL_AUTH_API_URL = `${HOST_AUTH_MODULE_URL}/tel-auth`;
// 전화번호 인증번호 확인
export const HOST_TEL_AUTH_CHECK_API_URL = `${HOST_AUTH_MODULE_URL}/tel-auth-check`;
// 사업자 번호 중복 확인
export const BUSINESS_NUMBER_CHECK_API_URL = `${HOST_AUTH_MODULE_URL}/business-number-check`
// 호스트 회원가입
export const HOST_SIGN_UP_API_MODULE = `${HOST_AUTH_MODULE_URL}/sign-up`;
// 호스트 로그인
export const HOST_SIGN_IN_API_URL = `${HOST_AUTH_MODULE_URL}/sign-in`;

// variable: 게스트 인증 모듈 
export const GUEST_AUTH_MODULE_URL = `${ROOMLY_API_DOMAIN}/api/roomly/auth/guest`;
// 게스트 아이디 중복 확인
export const GUEST_ID_CHECK_API_URL = `${GUEST_AUTH_MODULE_URL}/id-check`;
// 전화번호 중복확인 및 인증번호 발송
export const GUEST_TEL_AUTH_API_URL = `${GUEST_AUTH_MODULE_URL}/tel-auth`;
// 전화번호 인증번호 확인
export const GUEST_TEL_AUTH_CHECK_API_URL = `${GUEST_AUTH_MODULE_URL}/tel-auth-check`;
// 게스트 회원가입
export const GUEST_SIGN_UP_API_URL = `${GUEST_AUTH_MODULE_URL}/sign-up`;
// 게스트 로그인
export const GUEST_SIGN_IN_API_URL = `${GUEST_AUTH_MODULE_URL}/sign-in`;
// 로그인전 게스트 아이디 찾기
export const GUEST_ID_FIND_API_URL = `${GUEST_AUTH_MODULE_URL}/id-find`;
// 로그인 전 아이디 찾기에 대한 전화번호 인증확인 및 아이디값 반환
export const GUEST_ID_FIND_TEL_AUTH_CHECK_API_URL = `${GUEST_AUTH_MODULE_URL}/id-find-tel-auth-check`;

// variable: 호스트 모듈 
export const HOST_MODULE_URL = `${ROOMLY_API_DOMAIN}/api/roomly/host`;

// 호스트 정보 상세보기
export const HOST_DETAIL_API_URL = (hostId:string)=>`${HOST_MODULE_URL}/info/${hostId}`;
// 호스트 패스워드 변경
export const PATCH_HOST_PASSWORD_API_URL = (hostId:string)=>`${HOST_MODULE_URL}/update-password/${hostId}`;
// 호스트 전화번호 변경및 삭제
export const PATCH_HOST_TEL_NUMBER_API_URL = (hostId:string)=>`${HOST_MODULE_URL}/update-tel-number/${hostId}`;
// 호스트 아이디별 숙소 리스트
export const HOST_ACCOMMODATION_LIST_API_URL = (hostId:string)=>`${HOST_MODULE_URL}/list/${hostId}`;
// 호스트 숙소별 예약 리스트
export const HOST_RESERVATION_LIST_API_URL = (hostId:string)=>`${HOST_MODULE_URL}/reservation/${hostId}`;
// 호스트 아이디 찾기
export const HOST_ID_FIND_API_URL = (hostId:string)=>`${HOST_MODULE_URL}/id-find`;
// 호스트 아이디 찾기에 사용된 전화번호 인증번호 확인
export const HOST_ID_FIND_TEL_AUTH_CHECK_API_URL = `${HOST_MODULE_URL}/tel-auth-check`;
// 호스트 비밀번호 변경(로그인상태 x)
export const PATCH_HOST_PASSWORD_FIND_API_URL = `${HOST_MODULE_URL}/pw-find`;
// 호스트 로그인 정보 불러오기
export const GET_HOST_SIGN_IN = `${HOST_MODULE_URL}/sign-in`;

// variable: 게스트 모듈
export const GUEST_MODULE_URL = `${ROOMLY_API_DOMAIN}/api/roomly/guest`;

// 게스트 아이디에 대한 게스트 정보보기
export const GUEST_DETAIL_API_URL = (guestId:string)=>`${GUEST_MODULE_URL}/guest-information/${guestId}`;
// 게스트 비밀번호 수정
export const PATCH_GUEST_PASSWORD_API_URL = (guestId:string)=>`${GUEST_MODULE_URL}/pw/${guestId}`;
// 게스트 인증번호 확인 및 전화번호 수정, 삭제
export const PATCH_GUEST_TEL_NUMBER_API_URL = (guestId:string)=>`${GUEST_MODULE_URL}/auth-number/${guestId}`;
// 게스트 비밀번호 변경(로그인 상태 x)
export const PATCH_GUEST_PASSWORD_FIND_API_URL = `${GUEST_MODULE_URL}/pw-find`;
// 게스트 로그인 정보 불러오기
export const GET_GUEST_SIGN_IN = `${GUEST_MODULE_URL}/sign-in`;

// variable: 숙소 모듈
export const ACCOMMODATION_MODULE_URL = `${ROOMLY_API_DOMAIN}/api/roomly/accommodation`;
// 숙소 등록
export const POST_ACCOMMODATION_API_URL = `${ACCOMMODATION_MODULE_URL}/register`;
// 숙소 상세보기(숙소에 해당하는 객실 및 이용정보)
export const GET_ACCOMMODATION_API_URL = (accommodationName: string) =>`${ACCOMMODATION_MODULE_URL}/${accommodationName}`;
// 숙소 정보 수정
export const PATCH_ACCOMMODATION_API_URL = (accommodationName: string) =>`${ACCOMMODATION_MODULE_URL}/update/${accommodationName}`;
// 숙소 이용정보 수정 
export const PATCH_USEINFORMATION_API_URL = (accommodationName: string, autoKey: number) =>`${ACCOMMODATION_MODULE_URL}/information/update/${accommodationName}/${autoKey}`;
// 숙소 서브 이미지 수정
export const PATCH_ACCOMMODATION_SUB_IMAGE_API_URL = (accommodationName: string, accommodationImage: string) =>`${ACCOMMODATION_MODULE_URL}/information/update/${accommodationName}/${accommodationImage}`;
// 숙소 이미지들 상세보기
export const GET_ACCOMMODATION_IMAGE_API_URL = (accommodationImage:string) => `${ACCOMMODATION_MODULE_URL}/image/${accommodationImage}`;
// 숙소 리스트(게스트가 확인하는 리스트)
export const GET_ACCOMMODATION_LIST_API_URL = `${ACCOMMODATION_MODULE_URL}/list`;
// 숙소 삭제 
export const DELETE_ACCOMMODATION_API_URL = (accommodationName:string) =>`${ACCOMMODATION_MODULE_URL}/delete/${accommodationName}`
// 호스트가 등록한 숙소 리스트 조회
export const GET_HOST_ACCOMMODATION_LIST_API_URL = (hostId: string) => `${ACCOMMODATION_MODULE_URL}/${hostId}`;
// 메인페이지에서 넘어가는 숙소 상세보기
export const GET_ACCOMMODATION_DETAIL_API_URL = (accommodationName:string, checkInDay:string, checkOutDay:string) =>`${ACCOMMODATION_MODULE_URL}/${accommodationName}/${checkInDay}/${checkOutDay}`

// variable: 객실 모듈 
export const ROOM_MODULE_URL = `${ROOMLY_API_DOMAIN}/api/roomly/room`;

// 객실 정보 수정
export const PATCH_ROOM_API_URL = (accommodationName:string, roomId:number)=>`${ROOM_MODULE_URL}/update/${accommodationName}/${roomId}`;
// 객실 상세보기 
export const GET_ROOM_API_URL = (roomId:number) => `${ROOM_MODULE_URL}/detail/${roomId}`;
// 객실 이미지 수정 api
export const PATCH_ROOM_IMAGE_API_URL = (accommodationName:string, roomId:number, roomImage:string) => `${ROOM_MODULE_URL}/image/update/${accommodationName}/${roomId}/${roomImage}`;
// 객실 서브 이미지리스트 
export const GET_ROOM_IMAGE_LIST_API_URL = (roomId:number) => `${ROOM_MODULE_URL}/images/{roomId}`;
// 객실 삭제
export const DELETE_ROOM_API_URL = (roomId:number)=> `${ROOM_MODULE_URL}/delete/${roomId}`;

// variable: 즐겨찾기 모듈
export const BOOKMARK_MODULE_URL = `${ROOMLY_API_DOMAIN}/api/roomly/bookmark`
// 즐겨칮기 리스트
export const GET_BOOKMARK_LIST_API_URL = (guestId:string)=>`${BOOKMARK_MODULE_URL}/list-bookmark/${guestId}`;
// 즐겨찾기 추가
export const POST_BOOKMARK_API_URL = (guestId:string) => `${BOOKMARK_MODULE_URL}/add-bookmark/${guestId}`;
// 즐겨찾기 삭제
export const DELETE_BOOKMARK_API_URL = (guestId:string) => `${BOOKMARK_MODULE_URL}/delete-bookmark/${guestId}`;

//variable: 파일 모듈
export const FILE_MODULE_URL = `${ROOMLY_API_DOMAIN}/api/roomly/file`;
// 숙소메인 이미지 파일 업로드 
export const POST_ACCOMMODATION_MAIN_IMAGE_API_URL = `${FILE_MODULE_URL}/upload/accommodationMain`;
// 숙소 서브 이미지 파일 업로드 
export const POST_ACCOMMODATION_SUB_IMAGE_API_URL = `${FILE_MODULE_URL}/upload/accommodationSub`;
// 객실 메인 이미지 파일 업로드
export const POST_ROOM_MAIN_IMAGE_API_URL = `${FILE_MODULE_URL}/upload/roomMain`;
// 객실 서브 이미지 파일 업로드
export const POST_ROOM_SUB_IMAGE_API_URL = `${FILE_MODULE_URL}/upload/roomSub`;
// 사업자 정보 이미지 파일 업로드
export const POST_BUSINESS_IMAGE_API_URL = `${FILE_MODULE_URL}/upload/business`;

// variable: 예약 모듈
export const RESERVATION_MODULE_URL = `${ROOMLY_API_DOMAIN}/api/roomly/reservation`;
// 예약 api
export const POST_RESERVATION_API_URL = `${RESERVATION_MODULE_URL}/createReservation`;

// 게스트 예약 현황 리스트
export const GET_RESERVATION_LIST_API_URL = (guestId:string)=> `${RESERVATION_MODULE_URL}/reservation-status/${guestId}`;

// 호스트 예약 현황 리스트
export const GET_RESERVATION_STATUS_LIST_API_URL = (hostId: string) => `${RESERVATION_MODULE_URL}/host-reservation-status/${hostId}`;

// variable: 리뷰 모듈
export const REVIEW_MODULE_URL = `${ROOMLY_API_DOMAIN}/api/roomly/reviews`
// 리뷰작성
export const POST_REVIEW_API_URL = (guestId:string)=>`${REVIEW_MODULE_URL}/add/${guestId}`;
// 게스트아이디에 관한 리뷰
export const GET_GUEST_REVIEW_LIST_API_URL = (guestId:string)=>`${REVIEW_MODULE_URL}/guest-list/${guestId}`;
// 숙소에 관란 리뷰리스트
export const GET_ACCOMMODATION_REVIEW_LIST_API_URL = (accommodationName:string) => `${REVIEW_MODULE_URL}/acc-list/${accommodationName}`;


