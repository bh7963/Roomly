<h1 style='background-color: rgba(55, 55, 55, 0.4); text-align: center'> 이소진 front-end  API 설계(명세)서</h1>

백엔드가 준비 안된 상황에서 front-end에서 구현한 API가 정상 작동 할지 명세서로 1차 확인 하기 위함 

api는 페이지별, 기능별 생성하였음

- frontend-Domain : <http://localhost:3000>  

##### 담당 페이지 :
-  ###### 숙소 리스트
   1. 검색 결과 숙소 리스트 페이지
   2. 숙소 상세 리스트 페이지 
- ###### 관리자 페이지
   1. 호스트 계정 승인 요청 페이지
   2. 호스트 숙소 승인 요청 페이지
- ###### 호스트 마이페이지
  1. 내 정보 관리
  2. 예약 현황
  3. 내 숙소 정보 관리
- ###### FAQ
  1. FAQ 페이지 

***
<h2 style='background-color: rgba(55, 55, 55, 0.2); text-align: center'>Accommodation 모듈</h2>
Accommodation 모듈은 인증 없이 요청할 수 있다.  
<h5> API 종류: </h5>
- 숙소 조회(메인-> 숙소리스트), </br>
- 숙소 디테일 조회(숙소 리스트 -> 숙소 디테일 리스트) </br>

</br>

- url : /api/v1/accommodationList

***

#### - 숙소 조회 (메인 -> 숙소 리스트) 
  
##### 설명

1. 클라이언트는 홈 화면에서 '검색창(지역, 숙박 일자, 인원)'을 통해 숙소 조회 리스트로 들어올 수 있다. URL에 클라이언트가 검색한 지역, 숙박일자, 인원 정보를 포함한 상태(useParam)에서 리스트를 요청한다.(api를 호출한다.)
</br>

##### 요청 및 응답 받는 내용

    숙소 타입

    숙소 이름
    숙소 카테고리 7개
    숙소 주소
    숙소 입실 가능 일자
    숙소 퇴실 일자
    숙소 대표 사진

    객실 가격들 => (room price 가져옴 but front end에서는 최소값으로 데이터 가공하여 사용)
    숙소 평균 평점
    리뷰 리스트 => (room contents 가져옴 but front end에서는 개수로 데이터 가공하여 사용)



2. 클라이언트는 홈 화면에서 '국내 인기 여행지' 옵션을 눌러 숙소 조회 리스트로 들어올 수 있다.
    URL에 지역, 숙박일자, 인원 정보를 포함하여 요청한다.
        -요청 내용은 위 내용과 상동

3. 클라이언트는 홈 화면에서 '여행 추천 숙소' 옵션을 눌러 숙소 조회 리스트로 들어올 수 있다.
    -요청 내용은 위 내용과 상동


- method : **GET**  
- end point : **/accommodationList**  

##### Request
###### Request Body

none

###### Example

```bash
curl -v -X GET "http://localhost:3000/api/v1/accommodationList"{지역}&{날짜}&{인원}
```

##### Response

###### Header

| name | description | required |
|---|:---:|:---:|
| Content-Type | 반환되는 Response Body의 Content type (application/json) | O |

###### Response Body

| name | type | description | required |
|---|:---:|:---:|:---:|
| code | String | 결과 코드 | O |
| message | String | 결과 코드에 대한 설명 | O |
| accommodations[] | String | 숙소 리스트 | O |


###### accommodations
| name | type | description | required |
|---|:---:|:---:|:---:|
| accommodationType | String | 숙소 타입(호텔, 펜션, 리조트) | O |
| accommodationGradeSum | number | 숙소 평점 합 | O |
| accommodation_name | String | 숙소 이름 | O |
 category_area | string | 카테고리 숙소 지역 | O |
| category_pet | boolean | 카테고리 펫 동반 | O |
| category_non_smoking_area | boolean | 카테고리 흡연 객실 | O |
| category_indoor_spa | boolean | 카테고리 실내 스파 | O |
| category_dinner_party | boolean | 카테고리 바베큐 파티 | O |
| category_wifi | boolean | 카테고리 와이파이 | O |
| category_car_park | boolean | 카테고리 주차장 | O |
| category_pool | String | 카테고리 수영장 | O |
| accommodation_address | String | 호텔 주소 | O |
| room_in_day | DATE | 입실 가능 날짜 | O |
| room_out_day | DATE | 퇴실 날짜 | O |
| accommodation_main_image | string | 숙소 대표 이미지 | O |
| rooms |  RoomDTO[] | 숙소의 객실 최소 가격(객실 가격을 가져와서 최소 값만 추려서 사용) | O |
| review_content | number | 리뷰 개수(리뷰 작성 내용을 가져와서 개수로 변환) | O |


###### Example

**응답 성공**
```bash
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "code": "SU",
  "message": "Success.",
}

```
<h3 style="color:#2D3748; background-color:#fff5b1;"> 응답 실패에 대한 내용은 전달 받은게 없어서 내 맘대로 일단 해놨습니다.(아래 내용은 무시 해주세요) </h3>

**응답 실패 (데이터 유효성 검사 실패)**
```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8

{
  "code": "VF",
  "message": "Validation failed."
}
```

**응답 실패 (로그인 정보 불일치)**
```bash
HTTP/1.1 401 Unauthorized
Content-Type: application/json;charset=UTF-8

{
  "code": "SF",
  "message": "Sign in failed."
}
```

**응답 실패 (토큰 생성 실패)**
```bash
HTTP/1.1 500 Internal Server Error
Content-Type: application/json;charset=UTF-8

{
  "code": "TCF",
  "message": "Token creation failed."
}
```

**응답 실패 (데이터베이스 에러)**
```bash
HTTP/1.1 500 Internal Server Error
Content-Type: application/json;charset=UTF-8

{
  "code": "DBE",
  "message": "Database error."
}
```

***

#### - 숙소 상세 리스트 보기
  
##### 설명

클라이언트가 검색된 숙소리스트에서 특정 숙소를 선택하게 되면 보여질 화면.
원하는 숙소를 클릭하여 들어온 화면에 필요한 요청 및 응답 받을 데이터는 아래와 같다. 

##### 요청 및 응답 받는 내용
    **<숙소 관련>**
      -숙소 사진
      -숙소 이름 
      -카테고리 7개
      -숙소 주소

    **<객실 관련>**
      -객실 사진
      -객실 타입
      -입실 시간
      -퇴실 시간
      -최대 수용 인원
      -객실 가격

    **<숙소 소개 관련>**
      -숙소 소개
      -숙소 이용 정보

    **<리뷰 관련>**
      -게스트 명
      -작성일자
      -작성 내용

- method : **GET**  
- URL : **/api/v1/accommodationList/detail**

##### Request

###### Header

| name | description | required |
|---|:---:|:---:|
| Authorization | Bearer 토큰 인증 헤더 | O |

###### Example

```bash
curl -X GET "http://localhost:3000/api/v1/accommodationList/detail" 
```

##### Response

###### Header

| name | description | required |
|---|:---:|:---:|
| Content-Type | 반환되는 Response Body의 Content type (application/json) | O |

###### Response Body

| name | type | description | required |
|---|:---:|:---:|:---:|
| code | String | 결과 코드 | O |
| message | String | 결과 코드에 대한 설명 | O |
| detail | Detail[] | 숙소 상세 리스트 | O |
  

**Detail**  
| name | type | description | required |
|---|:---:|:---:|:---:|
| accommodation_main_image | string | 숙소 대표 이미지 | O |
| accommodationType | String | 숙소 타입(호텔, 펜션, 리조트) | O |
| accommodation_name | String | 숙소 이름 | O |
| accommodationGradeSum | number | 숙소 평점 합 | O |
| category_pet | boolean | 카테고리 펫 동반 | O |
| category_non_smoking_area | boolean | 카테고리 흡연 객실 | O |
| category_indoor_spa | boolean | 카테고리 실내 스파 | O |
| category_dinner_party | boolean | 카테고리 바베큐 파티 | O |
| category_wifi | boolean | 카테고리 와이파이 | O |
| category_car_park | boolean | 카테고리 주차장 | O |
| category_pool | String | 카테고리 수영장 | O |
| accommodation_address | String | 호텔 주소 | O |
| room_name | String | 객실 이름 | O |
| room_image | String | 객실 사진 | O |
| room_check_in | String | 체크인  | O |
| room_check_out | String | 체크아웃 | O |
| room_total_guest | number | 최대 수용 인원 | O |
| room_price | number | 객실 가격 | O |
| title | String | 이용시설에 대한 정보 제목 | O |
| context | String | 이용시설에 대한 정보 내용 | O |
| guest_name | String | 리뷰 작성자 이름 | O |
| review_content | String | 리뷰 작성 내용 | O |
| review_grade | number | 평점 | O |

###### Example

**응답 성공**
```bash
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "code": "SU",
  "message": "Success.",
  "nurses": [
    {
      "nurseId": "qwer1234",
      "name": "홍길동",
      "telNumber": "01011112222"
    },
    ...
  ]
}
```

**응답 : 실패 (인증 실패)**
```bash
HTTP/1.1 401 Unauthorized
Content-Type: application/json;charset=UTF-8

{
  "code": "AF",
  "message": "Authentication fail."
}
```

**응답 실패 (데이터베이스 에러)**
```bash
HTTP/1.1 500 Internal Server Error
Content-Type: application/json;charset=UTF-8

{
  "code": "DBE",
  "message": "Database error."
}
```

***

<h2 style='background-color: rgba(55, 55, 55, 0.2); text-align: center'>Admin 모듈</h2>

호스트 계정 승인, 호스트 숙소 등록 승인 요청을 관리하기 위한 Admin 모듈입니다.  
Admin 모듈은 인증이 필요하지 않습니다. 

<h5> API 종류: </h5>
- 호스트 계정 승인 요청 조회 </br>
- 호스트 계정 승인 요청 정보 상세 조회</br>
- 호스트 숙소 등록 승인 요청 조회 </br>
- 호스트 숙소 등록 승인 요청 상세 조회 </br>
</br>

- url : /api/v1/adminHost

***

#### - 호스트 계정 승인 요청 조회 등록  
  
##### 설명

관리자는 호스트 계정 승인 페이지에 접속하면 호스트가 요청한 회원가입 요청을 리스트로 조회할 수 있습니다. 
##### 요청 및 응답 받는 내용


- method : **GET**  
- end point : **/**  

##### Request

###### Header

| name | description | required |
|---|:---:|:---:|
| Authorization | Bearer 토큰 인증 헤더 | O |

###### Request Body

| name | type | description | required |
|---|:---:|:---:|:---:|
| hostId | String | 호스트 아이디 | O |
| businessLicenseNumber | String | 사업자 등록번호 | O |
| status | "pending", "approved", "rejected" | "rejected" | O |


###### Example

```bash
curl -v -X POST "http://localhost:4000/api/v1/customer" \
 -h "Authorization=Bearer XXXX" \
 -d "profileImage=https://~~" \
 -d "name=홍길동" \
 -d "birth=1960-08-30" \
 -d "charger=qwer1234" \
 -d "address=부산광역시 중구 ~~~" \
 -d "location=부산광역시 중구"
```

##### Response

###### Header

| name | description | required |
|---|:---:|:---:|
| Content-Type | 반환되는 Response Body의 Content type (application/json) | O |

###### Response Body

| name | type | description | required |
|---|:---:|:---:|:---:|
| code | String | 결과 코드 | O |
| message | String | 결과 코드에 대한 설명 | O |

###### Example

**응답 성공**
```bash
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "code": "SU",
  "message": "Success."
}
```

**응답 실패 (데이터 유효성 검사 실패)**
```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8

{
  "code": "VF",
  "message": "Validation failed."
}
```

**응답 : 실패 (존재하지 않는 아이디)**
```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8

{
  "code": "NI",
  "message": "No exist user id."
}
```

**응답 : 실패 (인증 실패)**
```bash
HTTP/1.1 401 Unauthorized
Content-Type: application/json;charset=UTF-8

{
  "code": "AF",
  "message": "Authentication fail."
}
```

**응답 실패 (데이터베이스 에러)**
```bash
HTTP/1.1 500 Internal Server Error
Content-Type: application/json;charset=UTF-8

{
  "code": "DBE",
  "message": "Database error."
}
```

***

#### - 고객 리스트 보기
  
##### 설명

클라이언트는 요청 헤더에 Bearer 인증 토큰을 포함하여 요청하고 조회가 성공적으로 이루어지면 성공에 대한 응답을 받습니다. 네트워크 에러, 서버 에러, 인증 실패, 데이터베이스 에러가 발생할 수 있습니다.  

- method : **GET**  
- URL : **/**  

##### Request

###### Header

| name | description | required |
|---|:---:|:---:|
| Authorization | Bearer 토큰 인증 헤더 | O |

###### Example

```bash
curl -X GET "http://localhost:4000/api/v1/customer" \
 -h "Authorization=Bearer XXXX"
```

##### Response

###### Header

| name | description | required |
|---|:---:|:---:|
| Content-Type | 반환되는 Response Body의 Content type (application/json) | O |

###### Response Body

| name | type | description | required |
|---|:---:|:---:|:---:|
| code | String | 결과 코드 | O |
| message | String | 결과 코드에 대한 설명 | O |
| customers | Customer[] | 고객 리스트 | O |
  
**Customer**  
| name | type | description | required |
|---|:---:|:---:|:---:|
| customerNumber | Integer | 고객 번호 | O |
| name | String | 고객 이름 | O |
| birth | String | 고객 생년월일 | O |
| location | String | 지역 | O |
| chargerName | String | 담당자 이름 | O |
| chargerId | String | 담당자 아이디 | O |

###### Example

**응답 성공**
```bash
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "code": "SU",
  "message": "Success.",
  "customers": [
    {
      "customerNumber": 1,
      "name": "홍길동",
      "birth": "600301",
      "location": "부산광역시 부산진구",
      "chargerName": "김철수",
      "chargerId": "qwer1234"
    },
    ...
  ]
}
```

**응답 : 실패 (인증 실패)**
```bash
HTTP/1.1 401 Unauthorized
Content-Type: application/json;charset=UTF-8

{
  "code": "AF",
  "message": "Authentication fail."
}
```

**응답 실패 (데이터베이스 에러)**
```bash
HTTP/1.1 500 Internal Server Error
Content-Type: application/json;charset=UTF-8

{
  "code": "DBE",
  "message": "Database error."
}
```

***

#### - 고객 정보 보기
  
##### 설명

클라이언트는 요청 헤더에 Bearer 인증 토큰을 포함하고 URL에 고객번호를 포함하여 요청하고 조회가 성공적으로 이루어지면 성공에 대한 응답을 받습니다. 만약 존재하지 않는 고객일 경우 존재하지 않는 용품에 해당하는 응답을 받습니다. 네트워크 에러, 서버 에러, 인증 실패, 데이터베이스 에러가 발생할 수 있습니다. 

- method : **GET**  
- URL : **/{customerNumber}**  

##### Request

###### Header

| name | description | required |
|---|:---:|:---:|
| Authorization | Bearer 토큰 인증 헤더 | O |

###### Example

```bash
curl -X GET "http://localhost:4000/api/v1/customer/1" \
 -h "Authorization=Bearer XXXX"
```

##### Response

###### Header

| name | description | required |
|---|:---:|:---:|
| Content-Type | 반환되는 Response Body의 Content type (application/json) | O |

###### Response Body

| name | type | description | required |
|---|:---:|:---:|:---:|
| code | String | 결과 코드 | O |
| message | String | 결과 코드에 대한 설명 | O |
| customerNumber | Integer | 고객 번호 | O |
| profileImage | String | 고객 프로필 사진 | O |
| name | String | 고객 이름 | O |
| birth | String | 고객 생년월일 | O |
| chargerName | String | 담당자 이름 | O |
| chargerId | String | 담당자 아이디 | O |
| address | String | 주소 | O |

###### Example

**응답 성공**
```bash
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "code": "SU",
  "message": "Success.",
  "customerNumber": 1,
  "profileImage": "https://~~",
  "name": "홍길동",
  "birth": "600301",
  "chargerName": "김철수",
  "chargerId": "qwer1234",
  "address": "부산광역시 부산진구"
}
```

**응답 실패 (데이터 유효성 검사 실패)**
```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8

{
  "code": "VF",
  "message": "Validation failed."
}
```

**응답 : 실패 (존재하지 않는 고객)**
```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8

{
  "code": "NC",
  "message": "No exist customer."
}
```

**응답 : 실패 (인증 실패)**
```bash
HTTP/1.1 401 Unauthorized
Content-Type: application/json;charset=UTF-8

{
  "code": "AF",
  "message": "Authentication fail."
}
```

**응답 실패 (데이터베이스 에러)**
```bash
HTTP/1.1 500 Internal Server Error
Content-Type: application/json;charset=UTF-8

{
  "code": "DBE",
  "message": "Database error."
}
```

***

#### - 고객 수정  
  
##### 설명

클라이언트는 요청 헤더에 Bearer 인증 토큰을 포함하고 URL에 고객번호를 포함하고 고객 프로필 이미지, 고객 이름, 고객 생년월일, 담당자, 주소, 지역을 입력하여 요청하고 용품 수정이 성공적으로 이루어지면 성공에 대한 응답을 받습니다. 만약 존재하지 않는 고객일 경우 존재하지 않는 고객에 대한 응답을 받습니다. 네트워크 에러, 서버 에러, 인증 실패, 데이터베이스 에러가 발생할 수 있습니다.  

- method : **PATCH**  
- end point : **/{customerNumber}**  

##### Request

###### Header

| name | description | required |
|---|:---:|:---:|
| Authorization | Bearer 토큰 인증 헤더 | O |

###### Request Body

| name | type | description | required |
|---|:---:|:---:|:---:|
| profileImage | String | 고객 프로필 사진 | O |
| name | String | 고객 이름 | O |
| birth | String | 고객 생년월일 | O |
| charger | String | 담당자 아이디 | O |
| address | String | 주소 | O |
| location | String | 지역 | O |

###### Example

```bash
curl -v -X PATCH "http://localhost:4000/api/v1/customerNumber/1" \
 -h "Authorization=Bearer XXXX" \
 -d "profileImage=https://~~" \
 -d "name=홍길동" \
 -d "birth=1960-08-30" \
 -d "charger=qwer1234" \
 -d "address=부산광역시 중구 ~~~" \
 -d "location=부산광역시 중구"
```

##### Response

###### Header

| name | description | required |
|---|:---:|:---:|
| Content-Type | 반환되는 Response Body의 Content type (application/json) | O |

###### Response Body

| name | type | description | required |
|---|:---:|:---:|:---:|
| code | String | 결과 코드 | O |
| message | String | 결과 코드에 대한 설명 | O |

###### Example

**응답 성공**
```bash
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "code": "SU",
  "message": "Success."
}
```

**응답 실패 (데이터 유효성 검사 실패)**
```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8

{
  "code": "VF",
  "message": "Validation failed."
}
```

**응답 : 실패 (존재하지 않는 고객)**
```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8

{
  "code": "NC",
  "message": "No exist customer."
}
```

**응답 : 실패 (인증 실패)**
```bash
HTTP/1.1 401 Unauthorized
Content-Type: application/json;charset=UTF-8

{
  "code": "AF",
  "message": "Authentication fail."
}
```

**응답 : 실패 (권한 없음)**
```bash
HTTP/1.1 403 Forbidden
Content-Type: application/json;charset=UTF-8

{
  "code": "NP",
  "message": "No permission."
}
```

**응답 실패 (데이터베이스 에러)**
```bash
HTTP/1.1 500 Internal Server Error
Content-Type: application/json;charset=UTF-8

{
  "code": "DBE",
  "message": "Database error."
}
```

***

#### - 고객 삭제  
  
##### 설명

클라이언트는 요청 헤더에 Bearer 인증 토큰을 포함하고 URL에 고객번호를 포함하여 요청하고 고객 삭제가 성공적으로 이루어지면 성공에 대한 응답을 받습니다. 만약 존재하지 않는 고객일 경우 존재하지 않는 고객에 대한 응답을 받습니다. 네트워크 에러, 서버 에러, 인증 실패, 데이터베이스 에러가 발생할 수 있습니다.  

- method : **DELETE**  
- end point : **/{customerNumber}**  

##### Request

###### Header

| name | description | required |
|---|:---:|:---:|
| Authorization | Bearer 토큰 인증 헤더 | O |

###### Example

```bash
curl -v -X DELETE "http://localhost:4000/api/v1/customer/1" \
 -h "Authorization=Bearer XXXX"
```

##### Response

###### Header

| name | description | required |
|---|:---:|:---:|
| Content-Type | 반환되는 Response Body의 Content type (application/json) | O |

###### Response Body

| name | type | description | required |
|---|:---:|:---:|:---:|
| code | String | 결과 코드 | O |
| message | String | 결과 코드에 대한 설명 | O |

###### Example

**응답 성공**
```bash
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "code": "SU",
  "message": "Success."
}
```

**응답 실패 (데이터 유효성 검사 실패)**
```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8

{
  "code": "VF",
  "message": "Validation failed."
}
```

**응답 : 실패 (존재하지 않는 고객)**
```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8

{
  "code": "NC",
  "message": "No exist customer."
}
```

**응답 : 실패 (인증 실패)**
```bash
HTTP/1.1 401 Unauthorized
Content-Type: application/json;charset=UTF-8

{
  "code": "AF",
  "message": "Authentication fail."
}
```

**응답 : 실패 (권한 없음)**
```bash
HTTP/1.1 403 Forbidden
Content-Type: application/json;charset=UTF-8

{
  "code": "NP",
  "message": "No permission."
}
```

**응답 실패 (데이터베이스 에러)**
```bash
HTTP/1.1 500 Internal Server Error
Content-Type: application/json;charset=UTF-8

{
  "code": "DBE",
  "message": "Database error."
}
```

***

#### - 기록 작성  
  
##### 설명

클라이언트는 요청 헤더에 Bearer 인증 토큰을 포함하고 URL에 고객번호를 포함하여 내용, 사용 용품 이름, 개수를 입력하여 요청하고 기록 작성이 성공적으로 이루어지면 성공에 대한 응답을 받습니다. 담당자가 아닐 경우 권한 없음에 대한 응답을 받습니다. 네트워크 에러, 서버 에러, 인증 실패, 데이터베이스 에러가 발생할 수 있습니다.  

- method : **POST**  
- end point : **/{customerNumber}/care-record**  

##### Request

###### Header

| name | description | required |
|---|:---:|:---:|
| Authorization | Bearer 토큰 인증 헤더 | O |

###### Request Body

| name | type | description | required |
|---|:---:|:---:|:---:|
| contents | String | 내용 | O |
| usedToolNumber | Integer | 사용 용품 번호 | X |
| count | Integer | 개수 | X |

###### Example

```bash
curl -v -X POST "http://localhost:4000/api/v1/customer/1/care-record" \
 -h "Authorization=Bearer XXXX" \
 -d "contents=허리가 불편하셔서 안다치시게 조심히 이동하기 위해 용품 사용됨 " \
 -d "usedToolName=휠체어" \
 -d "count=1"
```

##### Response

###### Header

| name | description | required |
|---|:---:|:---:|
| Content-Type | 반환되는 Response Body의 Content type (application/json) | O |

###### Response Body

| name | type | description | required |
|---|:---:|:---:|:---:|
| code | String | 결과 코드 | O |
| message | String | 결과 코드에 대한 설명 | O |

###### Example

**응답 성공**
```bash
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "code": "SU",
  "message": "Success."
}
```

**응답 실패 (데이터 유효성 검사 실패)**
```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8

{
  "code": "VF",
  "message": "Validation failed."
}
```

**응답 실패 (용품 개수 부족)**
```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8

{
  "code": "TI",
  "message": "This tool is insufficient in number."
}
```

**응답 : 실패 (인증 실패)**
```bash
HTTP/1.1 401 Unauthorized
Content-Type: application/json;charset=UTF-8

{
  "code": "AF",
  "message": "Authentication fail."
}
```

**응답 : 실패 (권한 없음)**
```bash
HTTP/1.1 403 Forbidden
Content-Type: application/json;charset=UTF-8

{
  "code": "NP",
  "message": "No permission."
}
```

**응답 실패 (데이터베이스 에러)**
```bash
HTTP/1.1 500 Internal Server Error
Content-Type: application/json;charset=UTF-8

{
  "code": "DBE",
  "message": "Database error."
}
```

***

#### - 관리 기록 리스트 보기
  
##### 설명

클라이언트는 요청 헤더에 Bearer 인증 토큰을 포함하여 URL에 고객번호를 포함하여 요청하고 조회가 성공적으로 이루어지면 성공에 대한 응답을 받습니다. 네트워크 에러, 서버 에러, 인증 실패, 데이터베이스 에러가 발생할 수 있습니다.  

- method : **GET**  
- URL : **/{customerNumber}/care-records**  

##### Request

###### Header

| name | description | required |
|---|:---:|:---:|
| Authorization | Bearer 토큰 인증 헤더 | O |

###### Example

```bash
curl -X GET "http://localhost:4000/api/v1/customer/1/care-records" \
 -h "Authorization=Bearer XXXX"
```

##### Response

###### Header

| name | description | required |
|---|:---:|:---:|
| Content-Type | 반환되는 Response Body의 Content type (application/json) | O |

###### Response Body

| name | type | description | required |
|---|:---:|:---:|:---:|
| code | String | 결과 코드 | O |
| message | String | 결과 코드에 대한 설명 | O |
| careRecords | CareRecord[] | 관리 기록 리스트 | O |
  
**CareRecord**  
| name | type | description | required |
|---|:---:|:---:|:---:|
| recordNumber | Integer | 관리 기록 번호 | O |
| recordDate | String | 기록 날짜 | O |
| contents | String | 내용 | O |
| usedToolName | String | 사용된 용품 이름 | X |
| count | String | 용품 사용 개수 | X |

###### Example

**응답 성공**
```bash
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "code": "SU",
  "message": "Success.",
  "tools": [
    {
      "recordNumber": 1,
      "recordDate": "2024-09-24",
      "contents": "허리가 불편하셔서 안다치시게 조심히 이동하기 위해 용품 사용됨",
      "usedToolName": "휠체어",
      "count": 1
    },
    ...
  ]
}
```

**응답 : 실패 (인증 실패)**
```bash
HTTP/1.1 401 Unauthorized
Content-Type: application/json;charset=UTF-8

{
  "code": "AF",
  "message": "Authentication fail."
}
```

**응답 실패 (데이터베이스 에러)**
```bash
HTTP/1.1 500 Internal Server Error
Content-Type: application/json;charset=UTF-8

{
  "code": "DBE",
  "message": "Database error."
}
```