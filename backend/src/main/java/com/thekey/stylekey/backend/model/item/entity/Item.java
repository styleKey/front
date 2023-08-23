package com.thekey.stylekey.backend.model.item.entity;

import com.thekey.stylekey.backend.model.base.BaseTimeEntity;
import com.thekey.stylekey.backend.model.brand.entity.Brand;
import com.thekey.stylekey.backend.model.category.entity.Category;
import com.thekey.stylekey.backend.model.coordilook.entity.CoordiLook;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "item")
public class Item extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id", nullable = false)
    private Long id;

    @Column(name = "item_title", nullable = false, columnDefinition = "VARCHAR(255) CHARACTER SET UTF8")
    private String title;

    @Column(name = "item_sales_link", nullable = false)
    private String sales_link;

    @Column(name = "item_image", nullable = false)
    private String image;

    // Item : Brand (N : 1)
    // 다대일 양방향 연관관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id")
    private Brand brand;

    // Item : CoordiLook (N : 1)
    // 다대일 양방향 연관관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coordilook_id")
    private CoordiLook coordilook;

    // Item : Category (N : 1)
    // 다대일 양방향 연관관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    // Item : StylePoint (N : 1)
    // 다대일 단방향 연관관계
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "stylepoint_id")
//    private StylePoint stylePoint;

    @Builder
    public Item(String title, String sales_link, String image, Brand brand, CoordiLook coordilook, Category category) {
        this.title = title;
        this.sales_link = sales_link;
        this.image = image;
        this.brand = brand;
        this.coordilook = coordilook;
        this.category = category;
    }

    public void update(String title, String sales_link, String image, Brand brand, CoordiLook coordilook, Category category) {
        this.title = title;
        this.sales_link = sales_link;
        this.image = image;
        this.brand = brand;
        this.coordilook = coordilook;
        this.category = category;
    }
}
