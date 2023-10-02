package com.thekey.stylekey.backend.model.test.entity;

import com.thekey.stylekey.backend.model.base.BaseTimeEntity;
import com.thekey.stylekey.backend.model.member.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "testResult")
public class TestResult extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "test_result_id")
    private Long id;

    @Column(name = "active_point")
    private int active;

    @Column(name = "glam_point")
    private int glam;

    @Column(name = "lovely_point")
    private int lovely;

    @Column(name = "modern_point")
    private int modern;

    @Column(name = "normal_point")
    private int normal;

    @Column(name = "retro_point")
    private int retro;

    @Column(name = "street_point")
    private int street;

    @Column(name = "unique_point")
    private int unique;

    @Column(name = "highest_stylepointId", columnDefinition = "VARCHAR(255) CHARACTER SET UTF8")
    private String highest_stylepoint;

    @Column(name = "lowest_stylepointId", columnDefinition = "VARCHAR(255) CHARACTER SET UTF8")
    private String lowest_stylepoint;

    // TestResult : Member (N : 1)
    // 다대일 양방향 관계
    @ManyToOne()
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Builder
    public TestResult(int active, int glam, int lovely, int modern, int normal, int retro, int street, int unique, Member member) {
        this.active = active;
        this.glam = glam;
        this.lovely = lovely;
        this.modern = modern;
        this.normal = normal;
        this.retro = retro;
        this.street = street;
        this.unique = unique;
        this.member = member;
    }

    public void setResult(String highest_stylepoint, String lowest_stylepoint) {
        this.highest_stylepoint = highest_stylepoint;
        this.lowest_stylepoint = lowest_stylepoint;
    }
}



