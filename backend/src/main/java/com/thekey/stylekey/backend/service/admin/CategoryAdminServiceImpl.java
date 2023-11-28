package com.thekey.stylekey.backend.service.admin;

import com.thekey.stylekey.backend.common.ErrorMessage;
import com.thekey.stylekey.backend.model.category.entity.Category;
import com.thekey.stylekey.backend.model.category.repository.CategoryRepository;
import com.thekey.stylekey.backend.model.item.entity.Item;
import com.thekey.stylekey.backend.model.item.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CategoryAdminServiceImpl implements CategoryAdminService {

    private final ItemRepository itemRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category findById(Long id) {
        return findCategory(id);
    }

    @Override
    public List<Item> getItemsByCategoryId(Long categoryId) {
        Category category = findCategory(categoryId);
        return itemRepository.findByCategory(category);
    }

    private Category findCategory(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(ErrorMessage.NOT_FOUND_CATEGORY.get() + id));
    }
}
