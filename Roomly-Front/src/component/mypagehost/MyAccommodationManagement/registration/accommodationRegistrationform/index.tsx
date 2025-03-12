import "./style.css";
import React, { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";

import { fileUploadRequest, postAccommodationRequest } from "src/apis/accommodation";
import { PostAccommodationRequestDto } from "src/apis/accommodation/dto/request/post-accommodation.request.dto";
import { accommodationMainFileUploadRequest } from "src/apis";
import UseInformations from "src/types/accommodation/use-informaion.interface";
import {
  ACCOMMODATION_LIST_PATH,
  ACCOMMODATION_MODULE_URL,
  HOST_ACCESS_TOKEN,
} from "src/constants";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { ResponseDto } from "src/apis/guestmypage";

import Rooms from "src/types/accommodation/rooms.interface";
import Accommodation from './../../../../../types/accommodation/accommodation.interface';
import AccommodationInfo from "src/types/accommodation/accommodationInfo";
import RoomRegister from "../roomRegistrationform/indexfinal";

// PostAccommodationRequestDto

// interface Rooms {
//   roomName: string;
//   roomPrice: number;
//   price: number;
//   checkInTime: string;
//   checkOutTime: string;
//   details: string;
//   maxGuests: number;
//   roomImages: File[];
//   selectedRoomImage?: File;
// }

const accommodationTypes = ["호텔", "리조트", "펜션"];
const facilitiesOptions = [
  "금연객실",
  "주차장",
  "와이파이",
  "바베큐 가능",
  "펫 동반 가능",
  "야외 수영장",
  "실내 온수풀",
];

const defaultProfileImageUrl = "https://blog.kakaocdn.net/dn/4CElL/btrQw18lZMc/Q0oOxqQNdL6kZp0iSKLbV1/img.png";

function HostAccommodationRegisterForm() {
  // state: 상태 관리 //
  const [nameError, setNameError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageError, setImageError] = useState<string>("");
  const [roomErrors, setRoomErrors] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [cookies, setCookies] = useCookies();
  // state: 숙소 정보 입력 상태 //
  const [accommodationName, setAccommodationName] = useState<string>("");
  const [accommodationMainImagePreview, setAccommodaitonMainImagePreview] = useState<string>("");
  const [accommodationMainImageFile, setAccommodaitonMainImageFile] = useState<File | null>(null);
  const [accommodationType, setAccommodationType] = useState<string>("");
  const [accommodationIntroduce, setAccommodationIntroduce] = useState<string>("");
  const [accommodationImagesFile, setAccommodationImagesFile] = useState<File[]>([]);
  const [accommodationAddress, setAccommodationAddress] = useState<string>("");

  const [useAccommodationName, setUseAccommodationName] = useState<string>("")

  const [roomName, setroomName] = useState<string>('')
  const [roomPrice, setrromPrice] = useState<number>(0)
  const [roomCheckIn, setroorCheckIn] = useState<string>('')
  const [roomCheckOut, setroomrheckOut] = useState<string>('')
  const [roomInfo, setroomInfo] = useState<string>('')
  const [roomTotalGuest, setroomToralGuest] = useState<number>(0)


  const [useInformations, setUseInformations] = useState<UseInformations[]>([{accommodationName:accommodationName, title:"asdf", context:useAccommodationName}]);
  const [categoryArea, setCategoryArea] = useState<string>("123");
  const [categoryPet, setCategoryPet] = useState<boolean>(false);
  const [categoryNonSmokingArea, setCategoryNonSmokingArea] = useState<boolean>(false);
  const [categoryIndoorSpa, setCategoryIndoorSpa] = useState<boolean>(false);
  const [categoryDinnerParty, setCategoryDinnerParty] = useState<boolean>(false);
  const [categoryWifi, setCategoryWifi] = useState<boolean>(false);
  const [categoryCarPark, setCategoryCarPark] = useState<boolean>(false);
  const [categoryPool, setCategoryPool] = useState<boolean>(false);

  const [rooms, setRooms] = useState<Rooms[]>([]);

  // event handler: 입력값 변경 이벤트 처리 함수 //
  const onAccommodationChangeEventHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setAccommodationAddress(value);
  };

  const handleAccommodationNameChange = (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
      const { value } = event.target;
      setAccommodationName(value);
  };  

  const handleAccommodationIntroduceChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
     setAccommodationIntroduce(value);
  };  

  const handleUseInformationsChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setUseAccommodationName(value)
  };









  
  const handleMainImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) return;
    const file = event.target.files[0];
    setAccommodaitonMainImageFile(file);
    
    console.log(accommodationMainImageFile)

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      setAccommodaitonMainImagePreview(fileReader.result as string);
    };
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const selectedFiles = Array.from(files);
      setAccommodationImagesFile(selectedFiles);
      if (selectedFiles.length < 3) {
        setImageError("최소 3장의 이미지를 선택해야 합니다.");
        return;
      } else {
        setImageError("");
      }

      const previews = selectedFiles.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<string>((resolve) => {
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
        });
      });

      Promise.all(previews).then((results) => {
        setImagePreviews(results);
      });
    }
  };

  const handleSelectImage = (image: File) => {};

  const handleTypeChange = (type: string) => {
    setAccommodationType(type);
  };

  const handleFacilityToggle = (facility: string) => {};

  const handleRoomChange = (index: number, updatedRoom: Rooms) => {
    const newRooms = rooms.map((room, i) => (i === index ? updatedRoom : room));
    setRooms(newRooms);
  };

  // 객실 추가
  const handleAddRoom = async (event:FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
       if (!accommodationMainImageFile) return;
    
    let mainUrl: string | null = null;
    if (accommodationMainImageFile) {
        const formData = new FormData();
        formData.append('file', accommodationMainImageFile);
        mainUrl = await fileUploadRequest(formData);
    }
    
    mainUrl = mainUrl ? mainUrl : defaultProfileImageUrl;

    
    let subUrl1: string | null = null;
    if (accommodationImagesFile) {
        const formData = new FormData();
        formData.append('file', accommodationImagesFile[0]);
        subUrl1 = await fileUploadRequest(formData);
    }
    subUrl1 = subUrl1 ? subUrl1 : defaultProfileImageUrl;
    let subUrl2: string | null = null;
    if (accommodationImagesFile) {
        const formData = new FormData();
        formData.append('file', accommodationImagesFile[1]);
        subUrl2 = await fileUploadRequest(formData);
    }
    subUrl2 = subUrl2 ? subUrl2 : defaultProfileImageUrl;
    let subUrl3: string | null = null;
    if (accommodationImagesFile) {
        const formData = new FormData();
        formData.append('file', accommodationImagesFile[2]);
        subUrl3 = await fileUploadRequest(formData);
    }
    subUrl3 = subUrl3 ? subUrl3 : defaultProfileImageUrl;

    const subUrl : string[] = [];
    
    subUrl[0] =  subUrl1 ;
    subUrl[1] =  subUrl2 ;
    subUrl[2] =  subUrl3 ;


    const room: Rooms = {
   
      roomName ,
      roomPrice ,
      roomCheckIn,
      roomCheckOut,
      roomTotalGuest,
      roomMainImage: mainUrl,
      roomInfo ,
      roomImages: subUrl    
  
    };

    setRooms([...rooms, room]);
    
  };

    // 숙소 이용정보 추가
    const handleAddUseInfomation = () => {
      const useInformation = {
        useInfomation: ""
      };
  
    setUseInformations(useInformations);
  };

  // event handler: 입력값 변경 이벤트 처리 함수 //
  // 룸타입 복사
  const handleDeleteRoom = (index: number) => {};
  // 룸 삭제
  const handleCopyRoom = (index: number) => {};

  // 숙소 이용 정보 추가

  // function: 관리자 권한을 확인하는 함수 (예시로 localStorage를 사용)
  const checkAdmin = () => {
    const userRole = localStorage.getItem("userRole"); // 예를 들어 'admin'이라는 값이 저장되어 있다고 가정
    setIsAdmin(userRole === "admin");
  };

  // effect: 관리자인지 권한 확인 //
  useEffect(() => {
    checkAdmin(); // 컴포넌트가 렌더링될 때 관리자 권한을 확인
  }, []);

  // function: 네비게이트 함수 처리 //
  const navigator = useNavigate();

  // function: post Accommodation Resposne 처리 함수 //
  const postAccommodationResposne = (responseBody: ResponseDto | null) => {
    const message = !responseBody
      ? "서버에 문제가 있습니다. "
      : responseBody.code === "AF"
      ? "잘못된 접근입니다. "
      : responseBody.code === "VF"
      ? "모두 입력해주세요. "
      : responseBody.code === "DAN"
      ? "중복된 숙소 이름입니다. "
      : responseBody.code === "NI"
      ? "존재하지 않는 계정 입니다. "
      : responseBody.code === "NP"
      ? "승인받지 않은 계정 입니다. "
      : responseBody.code === "DBE"
      ? "서버에 문제가 있습니다. "
      : "";
    const isSuccessed = responseBody !== null && responseBody.code === "SU";
    if (!isSuccessed) {
      alert(message);
      return;
    }
    alert('성공!')

  };

  // event handler: 등록 버튼 클릭 이벤트 처리 함수 //
  const handleSubmit = async (event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const hostAccessToken = cookies[HOST_ACCESS_TOKEN];
    if (!accommodationMainImageFile) return;

    let mainUrl: string | null = null;
    if (accommodationMainImageFile) {
        const formData = new FormData();
        formData.append('file', accommodationMainImageFile);
        mainUrl = await fileUploadRequest(formData);
    }
    
    mainUrl = mainUrl ? mainUrl : defaultProfileImageUrl;

    let subUrl1: string | null = null;
    if (accommodationImagesFile) {
        const formData = new FormData();
        formData.append('file', accommodationImagesFile[0]);
        subUrl1 = await fileUploadRequest(formData);
    }
    subUrl1 = subUrl1 ? subUrl1 : defaultProfileImageUrl;
    let subUrl2: string | null = null;
    if (accommodationImagesFile) {
        const formData = new FormData();
        formData.append('file', accommodationImagesFile[1]);
        subUrl2 = await fileUploadRequest(formData);
    }
    subUrl2 = subUrl2 ? subUrl2 : defaultProfileImageUrl;
    let subUrl3: string | null = null;
    if (accommodationImagesFile) {
        const formData = new FormData();
        formData.append('file', accommodationImagesFile[2]);
        subUrl3 = await fileUploadRequest(formData);
    }
    subUrl3 = subUrl3 ? subUrl3 : defaultProfileImageUrl;

    const subUrl : string[] = [];
    
    subUrl[0] =  subUrl1 ;
    subUrl[1] =  subUrl2 ;
    subUrl[2] =  subUrl3 ;

    const accommodation:AccommodationInfo = {
      accommodationName, 
      accommodationMainImage: mainUrl, 
      accommodationAddress,
      accommodationType,
      accommodationIntroduce,
      accommodationImages: subUrl,
      categoryArea,
      categoryPet,
      categoryNonSmokingArea,
      categoryIndoorSpa,
      categoryDinnerParty,
      categoryWifi,
      categoryCarPark,
      categoryPool
    }

      const requestBody: PostAccommodationRequestDto = {

        accommodation : accommodation,
        hostId: 'zxcv1234',
        useInformations: [{accommodationName:accommodationName, title:"asdf", context:useAccommodationName}],
        rooms 
      }
  
      postAccommodationRequest(requestBody, hostAccessToken).then(postAccommodationResposne)
 
    }
    

  

  // event handler: 등록 취소 버튼 클릭 이벤트 처리 함수 //
  const handleCancel = () => {
    const confirmCancle = window.confirm(
      "작성 내용을 취소하고 이전 페이지로 돌아가시겠습니까?"
    );
    if (confirmCancle) {
      navigator(-1);
    }
  };

  return (
    <div id="registration-wrapper">
      <form onSubmit={handleSubmit}>
        <h2>숙소 등록</h2>

        {/* 숙소명 입력 필드 */}
        <div>
          <label>
            숙소명:
            <input
              type="text"
              name="name"
              value={accommodationName}
              onChange={handleAccommodationNameChange}
              required
              maxLength={45} // HTML 레벨에서도 제한
            />
          </label>
          {nameError && <p style={{ color: "red" }}>{nameError}</p>}
        </div>

        {/* 설명 입력 필드 */}
        <div>
          <label>
            숙소 소개:
            <textarea
              name="description"
              value={accommodationIntroduce}
              onChange={handleAccommodationIntroduceChange}
              required
              maxLength={1500} // HTML 레벨에서도 제한
            />
          </label>
          {descriptionError && (
            <p style={{ color: "red" }}>{descriptionError}</p>
          )}
        </div>

        {/* 설명 입력 필드 */}
        <div>
          <label>
            숙소 이용 정보:
            <textarea
              name="description"
              value={useAccommodationName}
              onChange={handleUseInformationsChange}
              required
              maxLength={1500} // HTML 레벨에서도 제한
            />
          </label>
          {descriptionError && (
            <p style={{ color: "red" }}>{descriptionError}</p>
          )}
        </div>

        {/* 숙소 이용 정보 추가 */}
          <button type="button" onClick={handleAddUseInfomation}>
             숙소 이용 정보 추가
          </button>

          <div>
            <label>
              숙소 이용 정보:
              <textarea
                name="description"
                value={useAccommodationName}
               
                required
                maxLength={1500} // HTML 레벨에서도 제한
              />
            </label>
            {descriptionError && (
              <p style={{ color: "red" }}>{descriptionError}</p>)}
          {roomErrors && <p style={{ color: "red" }}>{roomErrors}</p>}
        </div>

        {/* 위치 입력 필드 */}
        <div>
          <label>
            위치:
            <input
              type="text"
              name="location"
              value={accommodationAddress}
              onChange={onAccommodationChangeEventHandler}
              required
            />
            <button className="address-search-button" type="button">
              위치 검색
            </button>
          </label>
        </div>

        {/* 숙소 대표 이미지 업로드 */}
        <div>
          <label>
            숙소 대표 이미지:
            <input
              type="file"
              onChange={handleMainImageChange}
              accept="image/*"
            />
          </label>
          {accommodationMainImagePreview && (
            <img
              src={accommodationMainImagePreview}
              alt="숙소 대표 이미지"
              style={{ width: "100px", height: "100px" }}
            />
          )}
        </div>

        {/* 숙소 이미지 업로드 */}
        <div>
          <label>
            숙소 이미지 업로드:
            <input
              type="file"
              onChange={handleFileChange}
              multiple
              accept="image/*"
            />
          </label>
          {imageError && <p style={{ color: "red" }}>{imageError}</p>}
          <div className="image-wrapper">
            {imagePreviews.map((preview, index) => (
              <div key={index}>
                <img
                  src={preview}
                  alt={`Accommodation Preview ${index}`}
                  style={{ width: "100px", height: "100px" }}
                />
                <button
                  type="button"
                  onClick={() => {
                    setAccommodaitonMainImageFile(
                      accommodationImagesFile[index]
                    );
                    const fileReader = new FileReader();
                    fileReader.readAsDataURL(accommodationImagesFile[index]);
                    fileReader.onloadend = () => {
                      setAccommodaitonMainImagePreview(
                        fileReader.result as string
                      );
                    };
                  }}
                >
                  대표 이미지로 변경
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const updatedImages = accommodationImagesFile.filter(
                      (_, i) => i !== index
                    );
                    setAccommodationImagesFile(updatedImages);
                    setImagePreviews((prevPreviews) =>
                      prevPreviews.filter((_, i) => i !== index)
                    );
                  }}
                  className="delete-image-button"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 숙소 종류 선택 */}
        <div>
          <label>숙소 종류:</label>
          {accommodationTypes.map((type) => (
            <div key={type}>
              <label>
                <input
                  type="radio"
                  name="type"
                  checked={accommodationType === type}
                  onChange={() => handleTypeChange(type)}
                />
                {type}
              </label>
            </div>
          ))}
        </div>

        {/* 시설 선택 */}
        <div>
          <label>시설:</label>
          <div>
            <label>
              <input
                type="checkbox"
                checked={categoryPet}
                onChange={() => setCategoryPet(!categoryPet)}
              />
              애견 동반
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={categoryNonSmokingArea}
                onChange={() =>
                  setCategoryNonSmokingArea(!categoryNonSmokingArea)
                }
              />
              금연 객실
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={categoryIndoorSpa}
                onChange={() => setCategoryIndoorSpa(!categoryIndoorSpa)}
              />
              실내 스파
            </label>
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                checked={categoryDinnerParty}
                onChange={() => setCategoryDinnerParty(!categoryDinnerParty)}
              />
              바베큐 시설
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={categoryWifi}
                onChange={() => setCategoryWifi(!categoryWifi)}
              />
              와이파이
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={categoryCarPark}
                onChange={() => setCategoryCarPark(!categoryCarPark)}
              />
              주차장
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={categoryPool}
                onChange={() => setCategoryPool(!categoryPool)}
              />
              수영장
            </label>
          </div>
        </div>

        {/* 객실 등록 */}
        <div>
          <h2>객실 등록</h2>
          <button type="button" onClick={handleAddRoom}>
            객실 추가
          </button>
          {rooms.map((room, index) => (
            <RoomRegister
              key={index}
              room={room}
              onChange={(updatedRoom) => handleRoomChange(index, updatedRoom)}
              onDelete={() => handleDeleteRoom(index)}
              onCopy={() => handleCopyRoom(index)}


              // 복사 기능 추가
            />
          ))}
          {roomErrors && <p style={{ color: "red" }}>{roomErrors}</p>}
        </div>


        <button type="submit" onClick={handleSubmit}>
          등록하기
        </button>
      </form>

      {/* 관리자만 볼 수 있는 승인/거절 버튼 */}
      {isAdmin && (
        <div>
          <button className="approval-button" type="button">
            승인
          </button>
          <button className="rejection-button" type="button">
            거절
          </button>
        </div>
      )}
      <button className="erollment-cancel-btn" onClick={handleCancel}>
        등록 취소
      </button>
    </div>
  );
}

export default HostAccommodationRegisterForm;
