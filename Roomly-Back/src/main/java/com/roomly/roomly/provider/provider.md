##### provider 폴더
- 주로 인증과 관련된 로직을 처리하는 클래스들이 포함됨.
- OAuth나 JWT를 사용할 떄, 인증을 처리하는 클래스를 여기에 둘 수 있다.

---

###### SmsProvider Class
: <b>CoolSMS API를 사용하여 SMS 메시지를 전송하는 SmsProvider.</b> 사용자에게 인증번호를 전송하는 기능을 담당하며, 메시지 전송에 필요한 설정 값은 application.properties 또는 application.yml 파일에서 가져옴. sendMessage 메서드를 호출하면, 해당 수신자에게 인증번호가 포함된 메시지를 보낸다.