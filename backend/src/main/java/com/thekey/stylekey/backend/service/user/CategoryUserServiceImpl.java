package com.thekey.stylekey.backend.service.user;

import com.thekey.stylekey.backend.model.category.entity.Category;
import com.thekey.stylekey.backend.model.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CategoryUserServiceImpl implements CategoryUserService {
    private final CategoryRepository categoryRepository;

    @Override
    public Category findById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("category does not exist:" + id));
    }
    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }
}
