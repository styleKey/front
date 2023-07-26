package com.thekey.stylekey.backend.domain.member.repository;

import com.thekey.stylekey.backend.domain.member.entity.MemberHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberHistoryRepository extends JpaRepository<MemberHistory, Long> {
}
