package com.thekey.stylekey.backend.service.admin;

import com.thekey.stylekey.backend.model.brand.entity.Brand;
import com.thekey.stylekey.backend.service.admin.dto.CreateBrandRequestDto;
import com.thekey.stylekey.backend.service.admin.dto.UpdateBrandRequestDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BrandAdminService {

    // create
    Brand createBrand(CreateBrandRequestDto requestDto);

    // read only one
    Brand findById(Long id);

    // read all
    Page<Brand> findAll(Pageable pageable);

    // update
    Brand updateBrand(Long id, UpdateBrandRequestDto requestDto);

    // delete
    void deleteBrand(Long id);

}
