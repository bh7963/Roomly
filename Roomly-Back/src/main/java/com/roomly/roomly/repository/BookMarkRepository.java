package com.roomly.roomly.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.roomly.roomly.entity.BookmarkEntity;
import com.roomly.roomly.entity.pk.BookmarkPk;
import com.roomly.roomly.repository.resultSet.GetBookMarkResultSet;

@Repository
public interface BookMarkRepository extends JpaRepository<BookmarkEntity, BookmarkPk>{
    
    @Query(value= 
    "SELECT" +
    "    B.guest_id as guestId, " +
    "    A.accommodation_main_image as AccommodationMainImage, " +
    "    A.accommodation_name as AccommodationName, " +
    "    A.accommodation_address as AccommodationAddress, " +
    "    A.accommodation_grade_sum as AccommodationGradeSum " +
    "FROM bookmark as B JOIN accommodation as A " +
    "ON B.accommodation_name = A.accommodation_name " +
    "WHERE B.guest_id= :guestId ",
    nativeQuery = true
    )
    List<GetBookMarkResultSet> getBookmarkList(
        @Param("guestId") String guestId
    );

    boolean existsByGuestId(String guestId);
    boolean existsByAccommodationName(String accommodationName);
    boolean existsByGuestIdAndAccommodationName(String guestId, String accommodationName);

    BookmarkEntity findByGuestIdAndAccommodationName(String guestId, String accommodationName);
    
}
