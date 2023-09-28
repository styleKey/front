package com.thekey.stylekey.backend.service.user;

import com.thekey.stylekey.backend.model.category.entity.Category;

import java.util.List;

public interface CategoryUserService {
    List<Category> findAll();
    Category findById(Long id);
}
