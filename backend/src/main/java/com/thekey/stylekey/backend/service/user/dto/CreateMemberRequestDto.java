package com.thekey.stylekey.backend.service.user.dto;

import com.thekey.stylekey.backend.model.member.entity.Member;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateMemberRequestDto {
    private String name;

    @Builder
    public CreateMemberRequestDto(String name) {
        this.name = name;
    }

    public Member toEntity() {
        return Member.builder()
                .name(name)
                .build();
    }
}
