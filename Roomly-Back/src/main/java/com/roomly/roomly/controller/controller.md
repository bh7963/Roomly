##### controller 폴더
- 클라이언트의 요청을 처리하는 곳
- 사용자의 요청을 받고, 비즈니스 로직을 처리한 후, 응답을 반환하는 역할을 하는 클래스들이 위치함.
---
###### AuthController Class
:  '/api/v1/auth/id-check' 엔드포인트로 들어오는 POST 요청을 처리하여 사용자 ID의 중복 여부를 확인하는 역할.
: @RequestBody로 JSON 데이터를 받아 IdCheckRequestDto 객체로 반환하고, 유효성 검사를 거친 후 AuthService를 통해 비즈니스 로직을 처리함. 최종적으로, 결과 처리는 ResponseEntity<ResponseDto>형태로 클라이언트에 반환
