package com.roomly.roomly.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.roomly.roomly.entity.TelAuthNumberEntity;

import jakarta.transaction.Transactional;

@Repository
public interface TelAuthNumberRepository extends JpaRepository<TelAuthNumberEntity, String> {
    
    boolean existsByTelNumberAndAuthNumber(String telNumber, String authNumber);
    TelAuthNumberEntity findByTelNumberAndAuthNumber(String telNumber, String authNumber);
    TelAuthNumberEntity findByTelNumber(String telNumber);

    @Transactional
    void deleteByTelNumber(String telNumber);
    // TelAuthNumberEntity findByTelNumber(String telNumber);
}
