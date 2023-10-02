package com.thekey.stylekey.backend.service.user;

import com.thekey.stylekey.backend.model.brand.entity.Brand;

import java.util.List;

public interface BrandUserService {

    List<Brand> findAll();
    Brand findById(Long id);
    List<Brand> findBrandByStylepointId(Long stylepointId);
}
