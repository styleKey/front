package com.thekey.stylekey.backend.model.stylepoint.entity;

import com.thekey.stylekey.backend.model.base.BaseTimeEntity;
import com.thekey.stylekey.backend.model.brand.entity.Brand;
import com.thekey.stylekey.backend.model.coordilook.entity.CoordiLook;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "stylepoint")
public class StylePoint extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stylepoint_id", nullable = false)
    private Long id;

    @Column(name = "stylepoint_title", nullable = false)
    private String title;

    @Column(name = "stylepoint_description", nullable = false)
    private String description;

    @Column(name = "stulepoint_image", nullable = false)
    private String image;

    @OneToMany(mappedBy = "stylepoint", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<CoordiLook> coordiLookList = new ArrayList<>();

    @OneToMany(mappedBy = "stylepoint", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Brand> brandList = new ArrayList<>();

    @Builder
    public StylePoint(String title, String description, String image) {
        this.title = title;
        this.description = description;
        this.image = image;
    }
}
