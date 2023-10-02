package com.thekey.stylekey.backend.service.user;

import com.thekey.stylekey.backend.model.member.entity.Member;
import com.thekey.stylekey.backend.model.member.repository.MemberHistoryRepository;
import com.thekey.stylekey.backend.model.member.repository.MemberRepository;
import com.thekey.stylekey.backend.model.stylepoint.repository.StylePointRepository;
import com.thekey.stylekey.backend.model.test.entity.TestResult;
import com.thekey.stylekey.backend.model.test.repository.TestResultRepository;
import com.thekey.stylekey.backend.service.user.dto.CreateTestResultRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class TestUserServiceImpl implements TestUserService {
    private final TestResultRepository testResultRepository;
    private final MemberRepository memberRepository;
    private final StylePointRepository stylePointRepository;
    private final MemberHistoryRepository memberHistoryRepository;

    @Override
    public TestResult saveTestResult(CreateTestResultRequestDto requestDto) {
        Member member = memberRepository.findById(requestDto.getMemberId())
                .orElseThrow(() -> new EntityNotFoundException("Member not found with id: " + requestDto.getMemberId()));

        Map<String, Integer> stylepoints = new HashMap<>();
        stylepoints.put("Unique", requestDto.getUnique());
        stylepoints.put("Street", requestDto.getStreet());
        stylepoints.put("Modern", requestDto.getModern());
        stylepoints.put("Normal", requestDto.getNormal());
        stylepoints.put("Lovely", requestDto.getLovely());
        stylepoints.put("Retro", requestDto.getRetro());
        stylepoints.put("Glam", requestDto.getGlam());
        stylepoints.put("Active", requestDto.getActive());

        Map<String, Integer> sortedStylePoints = stylepoints.entrySet()
                .stream()
                .sorted(Collections.reverseOrder(Map.Entry.comparingByValue()))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e2, LinkedHashMap::new));

        log.info(sortedStylePoints.toString());

        TestResult testResult = requestDto.toEntity(member);
        testResultRepository.save(testResult);
        testResult.setResult(getHighest_stylepoint(sortedStylePoints), getLowest_stylepoint(sortedStylePoints));
        return testResult;
    }

    @Override
    public TestResult findById(Long id) {
        return testResultRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("TestResult not found with id: " + id));
    }

    @Override
    public List<TestResult> findAll() {
        return testResultRepository.findAll();
    }

    public String getHighest_stylepoint(Map<String, Integer> sortedStylePoints) {
        Map.Entry<String, Integer> highestScoreEntry = sortedStylePoints.entrySet().iterator().next();
        return highestScoreEntry.getKey();
    }

    public String getLowest_stylepoint(Map<String, Integer> sortedStylePoints) {
        Map.Entry<String, Integer> lowestScoreEntry = sortedStylePoints.entrySet().stream()
                .reduce((first, second) -> second)
                .orElseThrow(() -> new NoSuchElementException("No lowest score found"));
        return lowestScoreEntry.getKey();
    }

}
