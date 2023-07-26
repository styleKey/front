package com.thekey.stylekey.backend.domain.coordilook.entity;

import com.thekey.stylekey.backend.domain.item.entity.Item;
import com.thekey.stylekey.backend.domain.stylepoint.entity.StylePoint;
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
@Table(name = "coordilook")
public class CoordiLook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "coordilook_id", nullable = false)
    private Long id;

    @Column(name = "coordilook_title", nullable = false)
    private String title;

    @Column(name = "coordilook_image", nullable = false)
    private String image;

    // CoordiLook : StylePoint (N : 1)
    // 다대일 양방향 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stylepoint_id")
    private StylePoint stylepoint;

    @OneToMany(mappedBy = "coordilook", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Item> itemList = new ArrayList<>();

    @Builder
    public CoordiLook(String title, String image, StylePoint stylepoint) {
        this.title = title;
        this.image = image;
        this.stylepoint = stylepoint;
    }
}
