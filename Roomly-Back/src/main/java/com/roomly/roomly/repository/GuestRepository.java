package com.roomly.roomly.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.roomly.roomly.entity.GuestEntity;
import com.roomly.roomly.repository.resultSet.GuestReviewListResultSet;

@Repository
public interface GuestRepository extends JpaRepository<GuestEntity, String> {

    @Query(value =
    "SELECT * FROM guest ",
    nativeQuery = true 
    )
    List<GuestEntity> getList();

    boolean existsByGuestNameAndGuestTelNumber(String guestName, String guestTelNumber);
    GuestEntity findByGuestTelNumber(String guestTelNumber);
    
    boolean existsByGuestId(String guestId);
    boolean existsByGuestTelNumber(String guestTelNumber);
    GuestEntity findByGuestId(String guestId);
    // sns 가입할때 필요한 snsid 와 가입경로
    GuestEntity findBySnsIdAndJoinPath(String sns, String joinPath);

    @Query(value = 
    "SELECT" +
    "    R.reservation_id as reservationId, " +
    "    OM.accommodation_name as accommodationName, " +
    "    R.review_date as reviewDate, " +
    "    R.review_content as reviewContent, " +
    "    R.review_grade as reviewGrade " +
    "FROM review as R join reservation as RE " +
    "ON R.reservation_id = RE.reservation_id " +
    "JOIN room as OM ON RE.room_id = OM.room_id " +
    "WHERE RE.guest_id = :guestId ",
    nativeQuery = true)
    List<GuestReviewListResultSet> getReviewList(@Param("guestId") String guestId);
}
