package com.thekey.stylekey.backend.model.category.entity;

import com.thekey.stylekey.backend.model.item.entity.Item_Category;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id", nullable = false)
    private Long id;

    @Column(name = "category_title", nullable = false)
    private String title;

    @OneToMany(mappedBy = "item")
    private List<Item_Category> itemList = new ArrayList<>();

    @Builder
    public Category(String title) {
        this.title = title;
    }
}
