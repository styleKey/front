package com.thekey.stylekey.backend.service.user;

import com.thekey.stylekey.backend.model.member.entity.Member;
import com.thekey.stylekey.backend.service.user.dto.CreateMemberRequestDto;

public interface MemberUserService {
    Member save(CreateMemberRequestDto requestDto);
}
