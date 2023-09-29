package com.thekey.stylekey.backend.service.admin;

import com.thekey.stylekey.backend.model.category.entity.Category;

import java.util.List;

public interface CategoryAdminService {

    List<Category> findAll();
    Category findById(Long id);

}
