package com.thekey.stylekey.backend.model.stylepoint.entity;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "stylepoint")
@DynamicUpdate
public class StylePoint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stylepoint_id", nullable = false)
    private Long id;

    @Column(name = "stylepoint_title", nullable = false, columnDefinition = "VARCHAR(255) CHARACTER SET UTF8")
    private String title;

    @Column(name = "stylepoint_description", nullable = false, columnDefinition = "VARCHAR(255) CHARACTER SET UTF8")
    private String description;

    @Column(name = "stulepoint_image", nullable = false)
    private String image;

//    @OneToMany(mappedBy = "stylepoint", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    private List<CoordiLook> coordiLookList = new ArrayList<>();

//    @OneToMany(mappedBy = "stylepoint", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    private List<Brand> brandList = new ArrayList<>();

    @Builder
    public StylePoint(String title, String description, String image) {
        this.title = title;
        this.description = description;
        this.image = image;
    }

    public void update(String title, String description, String image) {
        this.title = title;
        this.description = description;
        this.image = image;
    }
}
