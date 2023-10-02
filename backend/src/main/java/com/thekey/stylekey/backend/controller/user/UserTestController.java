package com.thekey.stylekey.backend.controller.user;

import com.thekey.stylekey.backend.model.test.entity.TestResult;
import com.thekey.stylekey.backend.model.test.repository.TestResultRepository;
import com.thekey.stylekey.backend.service.user.TestUserService;
import com.thekey.stylekey.backend.service.user.dto.CreateTestResultRequestDto;
import com.thekey.stylekey.backend.service.user.dto.CreateTestResultResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Slf4j
public class UserTestController {
    private final TestUserService testUserService;

    @PostMapping("/testResult/save")
    public ResponseEntity<CreateTestResultResponseDto> saveTestResult(@RequestBody CreateTestResultRequestDto requestDto) {
        TestResult savedResult = testUserService.saveTestResult(requestDto);

        CreateTestResultResponseDto responseDto = CreateTestResultResponseDto.builder()
                .highest_stylepoint(savedResult.getHighest_stylepoint())
                .lowest_stylepoint(savedResult.getLowest_stylepoint())
                .build();
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("testResult/{id}")
    public ResponseEntity<TestResult> getTestResultById(@PathVariable Long id) {
        TestResult testResult = testUserService.findById(id);
        return ResponseEntity.ok(testResult);
    }

    @GetMapping("testResults")
    public ResponseEntity<List<TestResult>> getAllTestResult() {
        return ResponseEntity.ok(testUserService.findAll());
    }

}
