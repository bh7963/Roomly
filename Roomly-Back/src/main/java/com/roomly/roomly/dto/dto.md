###### dto 폴더
(Data Transfer Object)

###### request\auth 폴더
- 클라이언트로부터 받은 요청 데이터를 캡슐화하는 객체들. 
- 요청 파라미터를 처리하기 위해 사용됨

###### response 폴더
- 서버가 클라이언트에게 응답할 데이터를 캡슐화하는 객체들.
- 클라이언트에게 반환할 데이터 형식을 정의

---
###### dto/response/ ResponseDt클래스 || 클라이언트에게 요청에 대한 응답 전송 
- Spring 프레임워크를 사용하여 HTTP 응답을 반환하는데 도움을 주는 ResponseDto 클래스를 정의
- HTTP 응답 상태 코드와 메시지를 설정할 수 있는 여러 개의 정적 메서드를 포함
- 잘 전달 했는지, 에러가 발생했는지에 대한 내용을 전달
- ResponseCode 와 ResponseMessage 를 통해 전달 

###### ResponseCode : 요청에 대한 응답 헤더 (성공, 실패)
###### ReponseMessage : 요청에 대한 응답 메시지 (성공, 실패)

---
###### request\auth  클라이언트로부터 받은...