package com.roomly.roomly.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.roomly.roomly.entity.UseInformationEntity;
import java.util.List;


@Repository
public interface UseInformationRepository extends JpaRepository<UseInformationEntity, Integer> {

    List<UseInformationEntity> findByAccommodationName(String accommodationName);

    UseInformationEntity findByAccommodationNameAndAutoKey(String accommodationName, Integer autoKey);
    UseInformationEntity findByAutoKey(Integer autoKey);
    
    
}
