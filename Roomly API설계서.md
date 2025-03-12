<h1 style='background-color: rgba(55, 55, 55, 0.4); text-align: center'>Roomly Guest API 설계(명세)서</h1>

해당 API 명세서는 'Roomly ERP - Roomly'의 REST API를 명세하고 있습니다.  

- Domain : <http://localhost:4000>  

***
  
<h2 style='background-color: rgba(55, 55, 55, 0.2); text-align: center'>Auth(호스트) 모듈</h2>

Roomly 서비스의 인증 및 인가와 관련된 REST API 모듈입니다.  
로그인, 회원가입, 사업자 정보 확인 등의 API가 포함되어 있습니다.  
Auth 모듈은 인증 없이 요청할 수 있습니다.  
  
- url : /api/roomly/auth/guest  

***
<h2 style= 'text-align: center'> 호스트 </h2>

#### 로그인  
  
##### 설명

클라이언트는 사용자 아이디와 평문의 비밀번호를 입력하여 요청하고 아이디와 비밀번호가 일치한다면 인증에 사용될 token과 해당 token의 만료 기간을 응답 데이터로 전달 받습니다. 만약 아이디 혹은 비밀번호가 하나라도 틀린다면 로그인 정보 불일치에 해당하는 응답을 받게됩니다. 네트워크 에러, 서버 에러, 데이터베이스 에러, 토큰 생성 에러가 발생할 수 있습니다.  

- method : **POST**  
- end point : **/sign-in**  

##### Request

###### Request Body

| name | type | description | required |
|---|:---:|:---:|:---:|
| guestId | String | 사용자의 아이디 | O |
| guestPw | String | 사용자의 비밀번호 | O |

###### Example
```bash
curl -v -X POST "http://localhost:4000//api/roomly/auth/host/sign-in" \
 - "guestId=qwer1234"
 - "guestPw=P!ssw0rd"
```

##### Response

###### Headers

| name | description | required |
|---|:---:|:---:|
| Content-Type | 반환되는 Response Body의 Content type (application/json) | O |

###### Response Body

| name | type | description | required |
|---|:---:|:---:|:---:|
| code | String | 결과 코드 | O |
| message | String | 결과 코드에 대한 설명 | O |
| accessToken | String | Bearer token 인증 방식에 사용될 JWT | O |
| expiration | Integer | JWT 만료 기간 (초단위) | O |

###### Example

**응답 성공**
```bash
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "code": "SU",
  "message": "Success.",
  "accessToken": "${ACCESS_TOKEN}",
  "expiration": 32400
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

#### - 아이디 중복 확인  
  
##### 설명

클라이언트는 사용할 아이디를 입력하여 요청하고 중복되지 않는 아이디라면 성공 응답을 받습니다. 만약 아이디가 중복된다면 아이디 중복에 해당하는 응답을 받게됩니다. 네트워크 에러, 서버 에러, 데이터베이스 에러가 발생할 수 있습니다.  

- method : **POST**  
- end point : **/id-check** 

##### Request

###### Request Body

| name | type | description | required |
|---|:---:|:---:|:---:|
| GuestId | String | 중복확인 할 사용자의 아이디 | O |

###### Example

```bash
curl -v -X POST "http://localhost:4000/api/roomly/auth/guest/id-check" \
 -d "guestId=qwer1234"
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

**응답 : 실패 (중복된 아이디)**
```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8

{
  "code": "DI",
  "message": "Duplicated user id."
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

#### - 전화번호 인증  
  
##### 설명

클라이언트는 숫자로만 이루어진 11자리 전화번호를 입력하여 요청하고 이미 사용중인 전화번호인지 확인 후 4자리의 인증번호를 해당 전화번호에 문자를 전송합니다. 인증번호가 정상적으로 전송이 된다면 성공 응답을 받습니다. 만약 중복된 전화번호를 입력한다면 중복된 전화번호에 해당하는 응답을 받게됩니다. 네트워크 에러, 서버 에러, 데이터베이스 에러, 문자 전송 실패가 발생할 수 있습니다.  

- method : **POST**  
- URL : **/tel-auth**  

##### Request

###### Request Body

| name | type | description | required |
|---|:---:|:---:|:---:|
| guestTelNumber | String | 인증 번호를 전송할 사용자의 전화번호 (11자리 숫자) | O |

###### Example

```bash
curl -v -X POST "http://localhost:4000/api/roomly/auth/guest/tel-auth" \
 -d "telNumber=01011112222"
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

**응답 : 실패 (중복된 전화번호)**
```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8

{
  "code": "DT",
  "message": "Duplicated tel number."
}
```

**응답 실패 (인증번호 전송 실패)**
```bash
HTTP/1.1 500 Internal Server Error
Content-Type: application/json;charset=UTF-8

{
  "code": "TF",
  "message": "Auth number send failed."
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

#### - 인증번호 확인  
  
##### 설명

클라이언트는 사용자 전화번호와 인증번호를 입력하여 요청하고 해당하는 전화번호와 인증번호가 서로 일치하는지 확인합니다. 일치한다면 성공에 대한 응답을 받습니다. 만약 일치하지 않는 다면 전화번호 인증 실패에 대한 응답을 받습니다. 네트워크 에러, 서버 에러, 데이터베이스 에러가 발생할 수 있습니다.  

- method : **POST**  
- end point : **/tel-auth-check**  

##### Request

###### Request Body

| name | type | description | required |
|---|:---:|:---:|:---:|
| telNumber | String | 인증 번호를 확인할 사용자 전화번호 | O |
| authNumber | String | 인증 확인에 사용할 인증 번호 | O |

###### Example

```bash
curl -v -X POST "http://localhost:4000/api/roomly/auth/guest/tel-auth-check" \
 -d "telNumber=01011112222" \
 -d "authNumber=1234"
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

**응답 : 실패 (전화번호 인증 실패)**
```bash
HTTP/1.1 401 Unauthorized
Content-Type: application/json;charset=UTF-8

{
  "code": "TAF",
  "message": "Tel number authentication fail."
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

#### - 회원가입  
  
##### 설명

클라이언트는 사용자(게스트)의 이름, 아이디, 비밀번호, 전화번호, 인증번호, 가입경로를 입력하여 요청하고 회원가입이 성공적으로 이루어지면 성공에 대한 응답을 받습니다. 만약 존재하는 아이디일 경우 중복된 아이디에 대한 응답을 받고, 만약 존재하는 전화번호일 경우 중복된 전화번호에 대한 응답을 받고, 전화번호와 인증번호가 일치하지 않으면 전화번호 인증 실패에 대한 응답을 받습니다. 네트워크 에러, 서버 에러, 데이터베이스 에러가 발생할 수 있습니다.  

- method : **POST**  
- end point : **/sign-up  

##### Request

###### Request Body

| name | type | description | required |
|---|:---:|:---:|:---:|
| guestName | String | 게스트의 이름 | O |
| guestId | String | 사용자의 아이디 | O |
| guestPw | String | 사용자의 비밀번호 (8~13자의 영문 + 숫자) | O |
| telNumber | String | 사용자의 전화번호 (11자의 숫자) | O |
| authNumber | String | 전화번호 인증번호 | O |
| joinPath | String | 회원가입 경로 (기본: 'HOME', 구글: 'GOOGLE', 네이버: 'NAVER') | O |
| snsId | String | SNS 가입시 sns oauth2 ID | X |

###### Example

```bash
curl -v -X POST "http://localhost:4000/api/roomly/auth/guest/sign-up" \
 -d "guestName"= "홍길동"\
 -d "guestId"= "qwer1234"\
 -d "guestPw"= "qwer1234"\
 -d "telNumber" = "01011112222"\
 -d "authNumber"= "1234"\
 -d "joinPath"= "HOME"
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

**응답 : 실패 (중복된 아이디)**
```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8

{
  "code": "DI",
  "message": "Duplicated id."
}
```

**응답 : 실패 (중복된 전화번호)**
```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8

{
  "code": "DT",
  "message": "Duplicated tel number."
}
```

**응답 : 실패 (전화번호 인증 실패)**
```bash
HTTP/1.1 401 Unauthorized
Content-Type: application/json;charset=UTF-8

{
  "code": "TAF",
  "message": "Tel number authentication failed."
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

#### - SNS 회원가입 및 로그인  
  
##### 설명

클라이언트는 OAuth 인증서버를 입력하여 요청하고 해당하는 Redirect 응답을 받습니다. 회원가입이 되어있는 사용자의 경우 쿼리 매개변수로 접근 토큰과 토큰 만료 기간을 반환하며 회원가입이 되어있지 않은 사용자의 경우 쿼리 매개변수로 sns 아이디와 해당하는 sns 서비스의 이름을 반환합니다. 

- method : **GET**  
- end point : **/sns-sign-in/{registerId}**  

##### Request

###### Path Variable

| name | type | description | required |
|---|:---:|:---:|:---:|
| registerId | String | 사용 SNS (카카오: 'kakao', 네이버: 'naver') | O |

###### Example

```bash
curl -X POST "http://localhost:4000/api/roomly/auth/sns-sign-in/{kakao}" 
```

##### Response

###### Example

**응답 성공 (회원 O)**
```bash
HTTP/1.1 302 Found 
Location: http://localhost:3000/sns-success?accessToken=${accessToken}&expiration=36000
```

**응답 성공 (회원 X)**
```bash
HTTP/1.1 302 Found 
Location: http://localhost:3000/auth?snsId=${snsId}&joinPath=${joinPath}
```

***

<h2 style='background-color: rgba(55, 55, 55, 0.2); text-align: center'>Guest 모듈</h2>

Roomly 서비스의 게스트와 관련된 REST API 모듈입니다.  
게스트 마이페이지를 통해 내정보 확인 및 수정, 예약 현황 보기, 즐겨찾기등록 및 삭제 등의 API가 포함되어 있습니다.  
마이페이지로 가기 위해 비밀번호 확인인증을 받습니다. 
  
- url : /api/roomly/guest

***

#### 내정보 확인
  
##### 설명
로그인후 마이페이지를 가기 위해 비밀번호 인증을 통해 갈 수 있으며 비밀번호 인증이 되면 MyPage에서 나의 개인 정보를 볼수 있습니다. 회원가입 했을때 기입했던 비밀번호를 제외한 모든 정보를 볼 수 있습니다.

- method : **GET**  
- end point : **/MyPage/{guestId}**

##### Request

###### Request Body

| name | type | description | required |
|---|:---:|:---:|:---:|
| name | String | 이름 | O |
| guestTelNumber | String | 전화번호 | O |
| guestId | String | 아이디 | O |
| joinPath | String | 가입경로 | O |
| snsId | boolean | Sns 아이디 | O |

###### Example

```bash
curl -v -X POST "http://localhost:4000/api/roomly/guest/MyPage/{guestId}" \
 -d "name" = "안성준"\
 -d "guestTelNumber"= "01000000000"\
 -d "guestId"= "qwer1234"\
 -d "joinPath"= "Google"\
 -d "snsId" = "qwer1234.." \
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

**응답 : 실패 (중복된 아이디)**
```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8

{
  "code": "NI",
  "message": "No Exist user id."
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
#### 내정보(비밀번호) 수정
  
##### 설명
게스트 회원가입을 통해 입력된 정보중 비밀번호와 전화번호를 수정할수 있습니다. 비밀번호는 기존의 인코딩된 비밀번호와 새로 입력받는 비밀번호를 비교하여 동일한 비밀번호를 입력한 것에 대한 유효성 검사를 하며 새로 입력받은 비밀번호를 인코딩하여 데이터베이스에 저장합니다. 비밀번호는 알파벳 소문자와 대문자 숫자 를 포함하여 생성할수 있도록 하였습니다.
회원정보가 수정되면 로그아웃이 되며 메인 페이지로 이동됩니다.

- method : **PATCH**  
- end point : **/pw/{guestId}**

##### Request

###### Request Body

| name | type | description | required |
|---|:---:|:---:|:---:|
| guestPw | String | 비밀번호 | O |

###### Example

```bash
curl -v -X POST "http://localhost:4000/api/roomly/guest/pw/{guestId}" \
 -d "guestPw" = "qwer1234"\
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

**응답 : 실패 (중복된 아이디)**
```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8

{
  "code": "NI",
  "message": "No Exist user id."
}
```

**응답 : 실패 (중복된 비밀번호)**
```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8

{
  "code": "DP",
  "message": "Duplicated Password."
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
#### 내정보(전화번호) 수정
  
##### 설명
마이페이지에서 전화번호를 수정할수 있으며 전화번호를 입력하여 중복확인 절차를 걸처 중복되지 않은 전화번호에 대해서 인증번호를 발송할수 있게 해 주었습니다. 전화번호 패턴으로는 0~9까지의 숫자, 11자로만 입력받을수 있도록 했습니다.

- method : **PATCH**  
- end point : **/telNumber/{guestId}**

##### Request

###### Request Body

| name | type | description | required |
|---|:---:|:---:|:---:|
| guestPw | String | 비밀번호 | O |

###### Example

```bash
curl -v -X POST "http://localhost:4000/api/roomly/guest/telNumber/{guestId}" \
 -d "telNumber" = "01000000000"\
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

**응답 : 실패 (중복된 전화번호)**
```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8
{
  "code": "DT",
  "message": "Duplicated Telnumber."
}
```

**응답 : 실패 (인증번호 전송실패)**
```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8

{
  "code": "MSF",
  "message": "Auth number send failed."
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
#### 인증번호 수정 및 기존 전화번호 삭제
  
##### 설명
전화번호 수정 버튼을 통해 해당 번호로 인증번호가 발송되며, 게스트가 회원정보 수정 버튼클 클릭하면 수정 전 전화번호를 DB에서 삭제할수 있도록 하였습니다.

- method : **PATCH**  
- end point : **/auth/{guestId}**

##### Request

###### Request Body

| name | type | description | required |
|---|:---:|:---:|:---:|
| guestTelNumber | String | 전화번호 | O |
| guestAuthNumber | String | 인증번호 | O |

###### Example

```bash
curl -v -X POST "http://localhost:4000/api/roomly/guest/auth/{guestId}" \
 -d "guestTelNumber" = "01000000000"\
 -d "guestAuthNumber" = "0000"\
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

**응답 : 실패 (확인되지 않은 인증번호)**
```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8
{telAuthFail
  "code": "TAF",
  "message": "Tel number authentication fail."
}
```

**응답 : 실패 (인증번호 전송실패)**
```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8

{
  "code": "MSF",
  "message": "Auth number send failed."
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
#### 아이디 찾기
  
##### 설명
로그인에 대한 정보를 잃어버렸을 경우 이름과 전화번호인증을 통해 아이디 찾기를 할수 있습니다. 유효성 검사를 통과한 후 해당 아이디를 보여주는것으로 나타냈습니다.

- method : **POST**  
- end point : **/id-find**

##### Request

###### Request Body

| name | type | description | required |
|---|:---:|:---:|:---:|
| guestName | String | 이름 | O |
| gusetTelNumber | String | 전화번호 | O |

###### Example

```bash
curl -v -X POST "http://localhost:4000/api/roomly/guest/id-find" \
 -d "guestName" = "홍길동"\
 -d "gusetTelNumber" = "01000000000"\
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

**응답 : 실패 (일치하지 않은 정보)**
```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8

{
  "code": "NMV",
  "message": "Not match value."
}
```

**응답 : 실패 (인증번호 전송실패)**
```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8

{
  "code": "MSF",
  "message": "Auth number send failed."
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

<h2 style='background-color: rgba(55, 55, 55, 0.2); text-align: center'>즐겨찾기 모듈</h2>

Roomly 서비스의 게스트와 관련된 REST API 모듈입니다.  
게스트 마이페이지를 통해 내정보 확인 및 수정, 예약 현황 보기, 즐겨찾기등록 및 삭제 등의 API가 포함되어 있습니다.  
마이페이지로 가기 위해 비밀번호 확인인증을 받습니다. 
  
- url : /api/roomly/guest

***

#### 즐겨찾기

##### 설명


- method : **POST**  
- end point : **/tel-auth-check**

##### Request

###### Request Body

| name | type | description | required |
|---|:---:|:---:|:---:|
| telNumber | String | 전화번호 | O |
| authNumber | String | 인증번호 | O |
    
###### Example

```bash
curl -v -X POST "http://localhost:4000/api/roomly/guest/tel-auth-check" \
 -d "telNumber" = "01000000000"\
 -d "authNumber" = "0000"\
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

**응답 : 실패 (전화번호 및 인증번호 유효성 검사 실패)**
```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8

{
  "code": "TAF",
  "message": "Tel number authentication fail."
}
```

**응답 : 실패 (전화번호 유효성 검사)**
```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8

{
  "code": "NET",
  "message": "No exist Telnumber."
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