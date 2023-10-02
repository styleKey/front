package com.thekey.stylekey.backend.controller.user;

import com.thekey.stylekey.backend.model.member.entity.Member;
import com.thekey.stylekey.backend.model.member.repository.MemberRepository;
import com.thekey.stylekey.backend.service.user.dto.CreateMemberRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Slf4j
public class UserMemberController {
    private final MemberRepository memberRepository;

    @PostMapping("/member/save")
    public Member save(@RequestBody CreateMemberRequestDto requestDto) {
        return memberRepository.save(requestDto.toEntity());

    }
}
