package com.roomly.roomly.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.roomly.roomly.entity.AccImageEntity;
import com.roomly.roomly.entity.pk.AccImagePk;
import java.util.List;


@Repository
public interface AccImageRepository extends JpaRepository<AccImageEntity, AccImagePk> {
    
    List<AccImageEntity> findByAccommodationName(String accommodationName);
    AccImageEntity findByAccommodationNameAndAccommodationImage(String accommodationName, String accommodationImage);
    boolean existsByAccommodationImage(String accommodationImage);
    AccImageEntity findByAccommodationImage(String accommodationImage);


    @Modifying //-> ddl dml curd
    @Transactional// -> update/delete 
    @Query(value = 
        "UPDATE acc_image SET accommodation_image = :accommodationChangeImage WHERE accommodation_name= :accommodationName AND "+
        "accommodation_image = :accommodationImage",
        nativeQuery = true
    )
    void patchAccommodationImage(@Param("accommodationChangeImage") String accommodationChangeImage, @Param("accommodationImage") String accommodationImage, @Param("accommodationName") String accommodationName);

}
