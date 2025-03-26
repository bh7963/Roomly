import { useState } from "react";
import { useCookies } from "react-cookie";
import signInHostStore from "src/stores/sign-in-host.store";
import Rooms from "src/types/accommodation/rooms.interface";
import UseInformations from "src/types/mypage/reservationList.interface";

// component: 숙소 정보 수정 화면 컴포넌트 //
export default function AccommodationUpdate() {

    // state: 로그인 유저 상태 //
    const { signInHost } = signInHostStore();

    // state: cookie 상태 //
    const [cookies] = useCookies();


    // state: 프로필 미리보기 URL 상태 //
    const [previewUrl, setPreviewUrl] = useState<string>('');

    // state: 숙소 정보 입력 상태 //
    const [accommodationName, setAccommodationName] = useState<string>('');
    const [accommodationMainImageFile, setAccommodaitonMainImageFile] = useState<File | null>(null);
    const [accommodationType, setAccommodationType] = useState<string>('')
    const [accommodationIntroduce, setAccommodationIntroduce] = useState<string>('');
    const [accommodationImages, setAccommodaitonImages] = useState<string[]>([]);
    const [accommodationAddress, setAccommodationAddress] = useState<string>('');
    const [roomList, setRoomList] = useState<Rooms[]>([])
    const [roomImages, setRoomImages] = useState<string[]>([]);
    const [useInformations, setUseInfomaitons] = useState<UseInformations[]>([]);

    const [categoryArea, setCategoryArea] = useState<string>('');
    const [categoryPet, setCategoryPet] = useState<boolean>(false);
    const [categoryNonSmokingArea, setCategoryNonSmoking] = useState<boolean>(false);
    const [categoryIndoorSpa, setCategoryIndoorSpa] = useState<boolean>(false);
    const [categoryDinnerParty, setCategoryDinnerParty] = useState<boolean>(false);
    const [categoryWifi, setCategoryWifi] = useState<boolean>(false);
    const [categoryCarPark, setCategoryCarPark] = useState<boolean>(false);
    const [categoryPool, setCategoryPool] = useState<boolean>(false);



}