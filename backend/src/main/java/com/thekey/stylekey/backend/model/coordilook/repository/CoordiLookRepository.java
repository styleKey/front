package com.thekey.stylekey.backend.model.coordilook.repository;

import com.thekey.stylekey.backend.model.coordilook.entity.CoordiLook;
import com.thekey.stylekey.backend.model.stylepoint.entity.StylePoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoordiLookRepository extends JpaRepository<CoordiLook, Long> {
    List<CoordiLook> findByStylepoint(StylePoint stylePoint);
}
