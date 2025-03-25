package com.roomly.roomly.repository;


import com.roomly.roomly.entity.AccommodationEntity;
import com.roomly.roomly.repository.resultSet.AccommodationReviewListResultSet;
import com.roomly.roomly.repository.resultSet.GetAccommodationListResultSet;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AccommodationRepository extends JpaRepository<AccommodationEntity, String> {

    AccommodationEntity findByAccommodationName(String accommodationName);
    List<AccommodationEntity> findByHostId(String hostId);
    boolean existsByAccommodationName(String accommodationName);
    boolean existsByHostId(String hostId);
    boolean existsByAccommodationNameAndAccommodationMainImage(String accommodationName, String accommodationMainImage);
    boolean existsByAccommodationMainImage(String accommodationMainImage);
    boolean existsByAccommodationNameAndAccommodationIntroduce(String accommodationName, String accommodationIntroduce);
    @Query(value=
    "SELECT * FROM accommodation",
    nativeQuery = true
    )
    List<AccommodationEntity> getAccommodationList();

    @Query(value= 
    "SELECT "+ 
    "A.accommodation_name,"+    
    "A.accommodation_main_image,"+
    "AVG(distinct RV.review_grade) as accommodationGradeAverage," +
    "A.accommodation_type,"+
    "A.category_area," +
    "A.category_pet," +
    "A.category_non_smoking_area," +
    "A.category_indoor_spa," +
    "A.category_dinner_party,"+
    "A.category_wifi,"+
    "A.category_car_park,"+
    "A.category_pool,"+
    "A.apply_status,"+
    "MIN(R.room_price) as minRoomPrice,"+
    "COUNT(distinct RV.reservation_id) as countReview " +
    "FROM accommodation A " +
    "LEFT JOIN room R ON A.accommodation_name = R.accommodation_name " +
    "LEFT JOIN reservation RS ON R.room_id = RS.room_id " +
    "LEFT JOIN review RV ON RS.reservation_id = RV.reservation_id " +
    "WHERE A.category_area=:categoryArea "+
    "GROUP BY A.accommodation_name " ,
    nativeQuery = true
    )
    List<GetAccommodationListResultSet> getList(@Param("categoryArea") String categoryArea);

    @Query(value = 
    "SELECT" +
    "    RE.guest_id as guestId, " +
    "    R.review_date as reviewDate, " +
    "    R.review_content as reviewContent, " +
    "    R.review_grade as reviewGrade " +
    "FROM review as R join reservation as RE " +
    "ON R.reservation_id = RE.reservation_id " +
    "JOIN room as OM ON RE.room_id = OM.room_id " +
    "WHERE OM.accommodation_name= :accommodationName ",
    nativeQuery = true)
    List<AccommodationReviewListResultSet> getAccommodationReviewList(@Param("accommodationName") String accommodationName);

    
    
}