package com.thekey.stylekey.backend.model.category.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.thekey.stylekey.backend.model.item.entity.Item;
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

    @Column(name = "category_title", nullable = false, columnDefinition = "VARCHAR(255) CHARACTER SET UTF8")
    private String title;

    @Builder
    public Category(String title) {
        this.title = title;
    }
}
