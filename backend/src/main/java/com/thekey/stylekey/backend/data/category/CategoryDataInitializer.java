package com.thekey.stylekey.backend.data.category;

import com.thekey.stylekey.backend.model.category.entity.Category;
import com.thekey.stylekey.backend.model.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
@RequiredArgsConstructor
public class CategoryDataInitializer {

    private final CategoryRepository categoryRepository;

    @PostConstruct
    public void init() {
        Category category_1 = Category.builder()
                .title(com.thekey.stylekey.backend.common.Category.TOP.getTitle())
                .build();
        categoryRepository.save(category_1);

        Category category_2 = Category.builder()
                .title(com.thekey.stylekey.backend.common.Category.OUTER.getTitle())
                .build();
        categoryRepository.save(category_2);

        Category category_3 = Category.builder()
                .title(com.thekey.stylekey.backend.common.Category.DRESS.getTitle())
                .build();
        categoryRepository.save(category_3);

        Category category_4 = Category.builder()
                .title(com.thekey.stylekey.backend.common.Category.BOTTOM.getTitle())
                .build();
        categoryRepository.save(category_4);

        Category category_5 = Category.builder()
                .title(com.thekey.stylekey.backend.common.Category.BAG.getTitle())
                .build();
        categoryRepository.save(category_5);

        Category category_6 = Category.builder()
                .title(com.thekey.stylekey.backend.common.Category.SHOES.getTitle())
                .build();
        categoryRepository.save(category_6);

        Category category_7 = Category.builder()
                .title(com.thekey.stylekey.backend.common.Category.ACC.getTitle())
                .build();
        categoryRepository.save(category_7);
    }
}
