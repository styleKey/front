package com.thekey.stylekey.backend.service.admin;

import com.thekey.stylekey.backend.model.category.entity.Category;
import com.thekey.stylekey.backend.model.item.entity.Item;

import java.util.List;

public interface CategoryAdminService {

    List<Category> findAll();
    Category findById(Long id);
    List<Item> getItemsByCategoryId(Long categoryId);

}
