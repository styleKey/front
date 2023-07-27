package com.thekey.stylekey.backend.model.item.entity;

import com.thekey.stylekey.backend.model.base.BaseTimeEntity;
import com.thekey.stylekey.backend.model.brand.entity.Brand;
import com.thekey.stylekey.backend.model.coordilook.entity.CoordiLook;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "item")
public class Item extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id", nullable = false)
    private Long id;

    @Column(name = "item_title", nullable = false)
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

    @OneToMany(mappedBy = "item", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Item_Category> category = new ArrayList<>();

    @Builder
    public Item(String title, String sales_link, String image, Brand brand, CoordiLook coordilook) {
        this.title = title;
        this.sales_link = sales_link;
        this.image = image;
        this.brand = brand;
        this.coordilook = coordilook;
    }
}
