package com.thekey.stylekey.backend.model.member.entity;

import com.thekey.stylekey.backend.model.base.BaseTimeEntity;
import com.thekey.stylekey.backend.model.test.entity.TestResult;
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
@Table(name = "member")
public class Member extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id", nullable = false)
    private Long id;

    @Column(name = "member_name")
    private String name;

//    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    private List<TestResult> testResultList;

//    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    private List<MemberHistory> memberHistoryList = new ArrayList<>();

    @Builder
    public Member(String name) {
        this.name = name;
    }
}
