package com.roomly.roomly.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.roomly.roomly.entity.RoomEntity;
import com.roomly.roomly.repository.resultSet.GetReservationViewResultSet;
import com.roomly.roomly.repository.resultSet.GetRoomResultSet;

import jakarta.transaction.Transactional;

@Repository
public interface RoomRepository extends JpaRepository<RoomEntity, Integer> {
    
    boolean existsByAccommodationNameAndRoomName(String accommodationName, String roomName);
    
    boolean existsByRoomName(String roomName);
    boolean existsByRoomId(Integer roomId);
    boolean existsByRoomMainImage(String roomMainImage);
    @Query(value=
    "SELECT "+
        "R.room_id as room_id,"+
        "R.room_name as room_name," +
        "R.room_main_image as room_main_image,"+
        "R.room_price as room_price," +
        "R.room_check_in as room_check_in," +
        "R.room_check_out as room_check_out," +
        "R.room_total_guest as room_total_guest," +
        "R.room_info as room_info, "+
        "A.accommodation_name as accommodation_name "+
    "FROM accommodation A LEFT JOIN room R "+
    "ON R.accommodation_name = A.accommodation_name "+
    "WHERE A.accommodation_name = :accommodationName ",
    nativeQuery = true
    )
    List<GetRoomResultSet> getRoomList(@Param("accommodationName") String accommodationName);

    boolean existsByAccommodationName(String accommodationName);

    RoomEntity findByAccommodationNameAndRoomId(String accommodationName, Integer roomId);

    RoomEntity findByRoomId(Integer roomId);

    RoomEntity findByAccommodationName(String accommodationName);

    @Query(value=
    "SELECT MIN(room_price), accommodation_name FROM room where accommodation_name = :accomodationName",
    nativeQuery = true
    )
    Integer getMinPrice();

    @Transactional
    void deleteByRoomId(Integer roomId);

    @Query(value=
    "SELECT" +
    "    G.guest_name as GuestName, " + 
    "    G.guest_tel_number as GuestTelNumber, " + 
    "    R.accommodation_name as AccommodationName, " +
    "    R.room_name as RoomName, " + 
    "    R.room_check_in as RoomCheckIn, " + 
    "    R.room_check_out as RoomCheckOut, " + 
    "    R.room_main_image as RoomMainImage, " + 
    "    R.room_price as RoomPrice " + 
    "FROM guest as G JOIN room as R " + 
    "WHERE G.guest_id = :guestId " + 
    "AND R.room_id = :roomId ",
    nativeQuery = true
    )
    GetReservationViewResultSet getReservationView(
        @Param("guestId")String guestId,
        @Param("roomId")Integer roomId);
    

    // 예약된 객실을 제외한 객실들을 가져오기
    @Query(value=
    "SELECT "+
        "R.room_id as room_id,"+
        "R.room_name as room_name," +
        "R.room_main_image as room_main_image,"+
        "R.room_price as room_price," +
        "R.room_check_in as room_check_in," +
        "R.room_check_out as room_check_out," +
        "R.room_total_guest as room_total_guest," +
        "R.room_info as room_info, "+
        "A.accommodation_name as accommodation_name "+
    "FROM accommodation A LEFT JOIN room R "+
    "ON R.accommodation_name = A.accommodation_name "+
    "WHERE A.accommodation_name = :accommodationName "+
    "AND R.room_id NOT IN ( SELECT RV.room_id FROM reservation as RV " +
    "WHERE check_out_day > :CheckInDay AND check_in_day < :checkOutDay )",
    nativeQuery = true
    )
    List<GetRoomResultSet> getList(@Param("accommodationName") String accommodationName,@Param("CheckInDay") String checkInDay, @Param("checkOutDay") String checkOutDay);
}


