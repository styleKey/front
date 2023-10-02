package com.thekey.stylekey.backend.service.user.dto;

import com.thekey.stylekey.backend.model.member.entity.Member;
import com.thekey.stylekey.backend.model.test.entity.TestResult;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateTestResultRequestDto {
    private int unique;
    private int street;
    private int modern;
    private int normal;
    private int lovely;
    private int retro;
    private int glam;
    private int active;
    private Long memberId;

    public CreateTestResultRequestDto(int unique, int street, int modern, int normal, int lovely, int retro, int glam, int active, Long memberId) {
        this.unique = unique;
        this.street = street;
        this.modern = modern;
        this.normal = normal;
        this.lovely = lovely;
        this.retro = retro;
        this.glam = glam;
        this.active = active;
        this.memberId = memberId;
    }

    @Builder
    public TestResult toEntity(Member member) {
        return TestResult.builder()
                .unique(unique)
                .street(street)
                .modern(modern)
                .normal(normal)
                .lovely(lovely)
                .retro(retro)
                .glam(glam)
                .active(active)
                .member(member)
                .build();
    }
}
