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
                .title("TOP")
                .build();

        Category category_2 = Category.builder()
                .title("OUTER")
                .build();

        Category category_3 = Category.builder()
                .title("DRESS")
                .build();

        Category category_4 = Category.builder()
                .title("BOTTOM")
                .build();

        Category category_5 = Category.builder()
                .title("BAG")
                .build();

        Category category_6 = Category.builder()
                .title("SHOES")
                .build();

        Category category_7 = Category.builder()
                .title("ACC")
                .build();

        categoryRepository.save(category_1);
        categoryRepository.save(category_2);
        categoryRepository.save(category_3);
        categoryRepository.save(category_4);
        categoryRepository.save(category_5);
        categoryRepository.save(category_6);
        categoryRepository.save(category_7);

    }
}
