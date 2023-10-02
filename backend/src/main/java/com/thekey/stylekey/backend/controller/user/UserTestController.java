package com.thekey.stylekey.backend.controller.user;

import com.thekey.stylekey.backend.model.test.entity.TestResult;
import com.thekey.stylekey.backend.model.test.repository.TestResultRepository;
import com.thekey.stylekey.backend.service.user.TestUserService;
import com.thekey.stylekey.backend.service.user.dto.CreateTestResultRequestDto;
import com.thekey.stylekey.backend.service.user.dto.CreateTestResultResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.weaver.ast.Test;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Slf4j
public class UserTestController {
    private final TestResultRepository testResultRepository;

    private final TestUserService testUserService;

    @PostMapping("/test/save")
    public ResponseEntity<CreateTestResultResponseDto> saveTestResult(@RequestBody CreateTestResultRequestDto requestDto) {
        TestResult savedResult = testUserService.saveTestResult(requestDto);

        // CreateTestResultResponseDto를 생성하고 필요한 데이터를 설정
        CreateTestResultResponseDto responseDto = CreateTestResultResponseDto.builder()
                .highest_stylepoint(savedResult.getHighest_stylepoint())
                .lowest_stylepoint(savedResult.getLowest_stylepoint())
                .build();

        log.info("최고 점수:" + String.valueOf(savedResult.getHighest_stylepoint()));
        log.info("최저 점수:" + String.valueOf(savedResult.getLowest_stylepoint()));
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("test/result/{id}")
    public ResponseEntity<TestResult> getTestResultById(@PathVariable Long id) {
        TestResult testResult = testUserService.findById(id);
        return ResponseEntity.ok(testResult);
    }

    @GetMapping("test/results")
    public ResponseEntity<List<TestResult>> getAllTestResult() {
        return ResponseEntity.ok(testUserService.findAll());
    }

}
