package com.thekey.stylekey.backend.domain.brand.repository;

import com.thekey.stylekey.backend.domain.brand.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {

}
