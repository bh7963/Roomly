package com.roomly.roomly.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.roomly.roomly.entity.HostEntity;


@Repository
public interface HostRepository extends JpaRepository<HostEntity, String> {
    
    boolean existsByHostId(String hostId);
    boolean existsByHostTelNumber(String hostTelNumber);
    boolean existsByHostBusinessNumber(String hostBusinessNumber);

    HostEntity findByHostId(String hostId);
    HostEntity findByHostTelNumber(String hostTelNumber);
    boolean existsByHostIdAndHostPw(String hostId, String changePassword);

    boolean existsByHostNameAndHostTelNumber(String hostName, String hostTelNumber);
    

    @Query(value=
    "SELECT * FROM host",
    nativeQuery = true
    )
    List<HostEntity> getList();

}
