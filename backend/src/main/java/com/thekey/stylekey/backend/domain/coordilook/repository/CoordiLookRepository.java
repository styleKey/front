package com.thekey.stylekey.backend.domain.coordilook.repository;

import com.thekey.stylekey.backend.domain.coordilook.entity.CoordiLook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoordiLookRepository extends JpaRepository<CoordiLook, Long> {
}
