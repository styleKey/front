package com.thekey.stylekey.backend.model.stylepoint.repository;

import com.thekey.stylekey.backend.model.stylepoint.entity.StylePoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StylePointRepository extends JpaRepository<StylePoint, Long> {
    Long findStylePointByTitle(String title);
}
