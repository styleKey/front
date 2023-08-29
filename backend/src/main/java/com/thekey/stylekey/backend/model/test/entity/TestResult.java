package com.thekey.stylekey.backend.model.test.entity;

import com.thekey.stylekey.backend.model.base.BaseTimeEntity;
import lombok.AccessLevel;
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

    @Column(name = "active_score")
    private int active;

    @Column(name = "glam_score")
    private int glam;

    @Column(name = "lovely_score")
    private int lovely;

    @Column(name = "modern_score")
    private int modern;

    @Column(name = "normal_score")
    private int normal;

    @Column(name = "retro_score")
    private int retro;

    @Column(name = "street_score")
    private int street;

    @Column(name = "uique_score")
    private int unique;

}



