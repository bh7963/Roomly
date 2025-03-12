##### repository 폴더
- 데이터베이스와의 상호작용을 담당하는 인터페이스 또는 클래스들이 위치.
- JPA를 사용하여 데이터 조회, 삽입, 삭제 등의 작업을 처리하는 DAO(Data Access Object) 역할을 한다.
---
###### JPARepository 사용방법
1. <b>Entity 클래스 정의</b> : JPARepository를 사용하여 액세스할 엔티티 클래스를 정의해야 함 
2. <b>JpaRepository 인터페이스 상속받는 인터페이스 생성</b> : JpaRepository 인터페이스를 상속받아, 커스텀 해야한다.
4. <b>JPARepository method 사용</b> : JPARepository 인터페이스에 정의된 메서드를 호출하거나 구현한 메서드를 호출
3. <b>Spring Bean 등록</b> : JapRepository를 사용하여 데이터 액세서를 수행하는 EntityManager 가 필요하므로 JpaRepository를 사용하는 클래스는 빈으로 등록해야함

Entitiy클래스정의 >> JpaRepository 인터페이스 상속받는 인터페이스 생성 >> Spring Bean 등록 >> JPARepository method 사용
####