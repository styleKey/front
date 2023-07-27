package com.thekey.stylekey.backend.model.brand.entity;

import com.thekey.stylekey.backend.model.base.BaseTimeEntity;
import com.thekey.stylekey.backend.model.item.entity.Item;
import com.thekey.stylekey.backend.model.stylepoint.entity.StylePoint;
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
@Table(name = "brand")
public class Brand extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "brand_id", nullable = false)
    private Long id;

    @Column(name = "brand_title", nullable = false)
    private String title;

    @Column(name = "brand_title_eng", nullable = false)
    private String title_eng;

    @Column(name = "brand_description", nullable = false)
    private String description;

    @Column(name = "brand_site_url", nullable = false)
    private String site_url;

    @Column(name = "brand_image", nullable = false)
    private String image;

    @OneToMany(mappedBy = "brand", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Item> items = new ArrayList<>();

    // Brand : StylePoint (N : 1)
    // 다대일 양방향 연관관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stylepoint_id")
    private StylePoint stylepoint;

    @Builder
    public Brand(String title, String title_eng, String description, String site_url, String image, StylePoint stylePoint) {
        this.title = title;
        this.title_eng = title_eng;
        this.description = description;
        this.site_url = site_url;
        this.image = image;
        this.stylepoint = stylePoint;
    }

    public void update(String title, String title_eng, String description, String site_url, String image, StylePoint stylePoint) {
        this.title = title;
        this.title_eng = title_eng;
        this.description = description;
        this.site_url = site_url;
        this.image = image;
        this.stylepoint = stylePoint;
    }
}
