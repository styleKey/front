package com.thekey.stylekey.backend.service.user;

import com.thekey.stylekey.backend.model.member.entity.Member;
import com.thekey.stylekey.backend.model.member.repository.MemberRepository;
import com.thekey.stylekey.backend.service.user.dto.CreateMemberRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberUserServiceImpl implements MemberUserService {
    private final MemberRepository memberRepository;
    @Override
    public Member save(CreateMemberRequestDto requestDto) {
        Member member = new Member(requestDto.getName());
        return memberRepository.save(member);
    }
}
