// import { useState } from "react";
// import { useCookies } from "react-cookie";
// import Rooms from "src/types/accommodation/rooms.interface";
// import UseInformations from "src/types/mypage/reservationList.interface";

// // component: 숙소 정보 수정 화면 컴포넌트 //
// export default function AccommodationUpdate() {

//     // state: 로그인 유저 상태 //
//     const { signInUser } = signInHostStore();

//      // state: cookie 상태 //
//      const [cookies] = useCookies();


//      // state: 프로필 미리보기 URL 상태 //
//     const [previewUrl, setPreviewUrl] = useState<string>(defaultProfileImageUrl);

//         // state: 숙소 정보 입력 상태 //
//     const [accommodationName, setAccommodationName] = useState<string>('');
//     const [accommodationMainImageFile, setAccommodaitonMainImageFile] = useState<File | null>(null);
//     const [accommodationType, setAccommodationType] = useState<string>('')
//     const [accommodationIntroduce, setAccommodationIntroduce] = useState<string>('');
//     const [accommodationImages, setAccommodaitonImages] = useState<string[]>([]);
//     const [accommodationAddress, setAccommodationAddress] = useState<string>('');
//     const [roomList, setRoomList] = useState<Rooms[]>([])
//     const [roomImages, setRoomImages] = useState<string[]>([]);
//     const [useInformations, setUseInfomaitons] = useState<UseInformations[]>([]);
    
//     const [categoryArea, setCategoryArea] = useState<string>('');
//     const [categoryPet, setCategoryPet] = useState<boolean>(false);
//     const [categoryNonSmokingArea, setCategoryNonSmoking] = useState<boolean>(false);
//     const [categoryIndoorSpa, setCategoryIndoorSpa] = useState<boolean>(false);
//     const [categoryDinnerParty, setCategoryDinnerParty] = useState<boolean>(false);
//     const [categoryWifi, setCategoryWifi] = useState<boolean>(false);
//     const [categoryCarPark, setCategoryCarPark] = useState<boolean>(false);
//     const [categoryPool, setCategoryPool] = useState<boolean>(false);



// // render: 숙소 정보 수정 화면 컴포넌트 렌더링 //
// return (
//     <div id="registration-wrapper">
//       <form onSubmit={handleSubmit}>
//         <h2>숙소 등록</h2>

//         {/* 숙소명 입력 필드 */}
//         <div>
//           <label>
//             숙소명:
//             <input
//               type="text"
//               name="name"
//               value={accommodationName}
//               onChange={handleChange}
//               required
//               maxLength={45} // HTML 레벨에서도 제한
//             />
//           </label>
//           {nameError && <p style={{ color: "red" }}>{nameError}</p>}
//         </div>

//         {/* 설명 입력 필드 */}
//         <div>
//           <label>
//             설명:
//             <textarea
//               name="description"
//               value={accommodationIntroduce}
//               onChange={handleChange}
//               required
//               maxLength={1500} // HTML 레벨에서도 제한
//             />
//           </label>
//           {descriptionError && (
//             <p style={{ color: "red" }}>{descriptionError}</p>
//           )}
//         </div>

//         {/* 위치 입력 필드 */}
//         <div>
//           <label>
//             위치:
//             <input
//               type="text"
//               name="location"
//               value={accommodationAddress}
//               onChange={onAccommodationChangeEventHandler}
//               required
//             />
//             <button className="address-search-button" type="button">
//               위치 검색
//             </button>
//           </label>
//         </div>

//         {/* 숙소 대표 이미지 업로드 */}
//         <div>
//           <label>
//             숙소 대표 이미지:
//             <input
//               type="file"
//               onChange={handleMainImageChange}
//               accept="image/*"
//             />
//           </label>
//           {accommodation.selectedImage && (
//             <img
//               src={URL.createObjectURL(accommodation.selectedImage)}
//               alt="숙소 대표 이미지"
//               style={{ width: "100px", height: "100px" }}
//             />
//           )}
//         </div>

//         {/* 숙소 이미지 업로드 */}
//         <div>
//           <label>
//             숙소 이미지 업로드:
//             <input
//               type="file"
//               onChange={handleFileChange}
//               multiple
//               accept="image/*"
//             />
//           </label>
//           {imageError && <p style={{ color: "red" }}>{imageError}</p>}
//           <div className="image-wrapper">
//             {imagePreviews.map((preview, index) => (
//               <div key={index}>
//                 <img
//                   src={preview}
//                   alt={`Accommodation Preview ${index}`}
//                   style={{ width: "100px", height: "100px" }}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => handleSelectImage(accommodation.images[index])}
//                 >
//                   대표 이미지로 변경
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     const updatedImages = accommodation.images.filter(
//                       (_, i) => i !== index
//                     );
//                     setAccommodation((prev) => ({
//                       ...prev,
//                       images: updatedImages,
//                     }));
//                     setImagePreviews((prevPreviews) =>
//                       prevPreviews.filter((_, i) => i !== index)
//                     );
//                   }}
//                   className="delete-image-button"
//                 >
//                   삭제
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* 숙소 종류 선택 */}
//         <div>
//           <label>숙소 종류:</label>
//           {accommodationTypes.map((type) => (
//             <div key={type}>
//               <label>
//                 <input
//                   type="radio"
//                   name="type"
//                   checked={accommodation.type === type}
//                   onChange={() => handleTypeChange(type)}
//                 />
//                 {type}
//               </label>
//             </div>
//           ))}
//         </div>

//         {/* 시설 선택 */}
//         <div>
//           <label>시설:</label>
//           {facilitiesOptions.map((facility) => (
//             <div key={facility}>
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={accommodation.facilities.includes(facility)}
//                   onChange={() => handleFacilityToggle(facility)}
//                 />
//                 {facility}
//               </label>
//             </div>
//           ))}
//         </div>

//         {/* 객실 등록 */}
//         <div>
//           <h2>객실 등록</h2>
//           <button type="button" onClick={handleAddRoom}>
//             객실 추가
//           </button>
//           {accommodation.rooms.map((room, index) => (
//             <RoomRegister
//               key={index}
//               room={room}
//               onChange={(updatedRoom) => handleRoomChange(index, updatedRoom)}
//               onDelete={() => handleDeleteRoom(index)}
//               onCopy={() => handleCopyRoom(index)} // 복사 기능 추가
//             />
//           ))}
//           {roomErrors && <p style={{ color: "red" }}>{roomErrors}</p>}
//         </div>

//         <button type="submit" onClick={handleSubmit}>
//           등록하기
//         </button>
//       </form>

//       {/* 관리자만 볼 수 있는 승인/거절 버튼 */}
//       {isAdmin && (
//         <div>
//           <button className="approval-button" type="button">
//             승인
//           </button>
//           <button className="rejection-button" type="button">
//             거절
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

export{}