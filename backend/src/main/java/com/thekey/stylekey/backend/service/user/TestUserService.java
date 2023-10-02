package com.thekey.stylekey.backend.service.user;

import com.thekey.stylekey.backend.model.test.entity.TestResult;
import com.thekey.stylekey.backend.service.user.dto.CreateTestResultRequestDto;
import com.thekey.stylekey.backend.service.user.dto.CreateTestResultResponseDto;

import java.util.List;
import java.util.Map;

public interface TestUserService {

    TestResult saveTestResult(CreateTestResultRequestDto requestDto);
    TestResult findById(Long id);
    List<TestResult> findAll();
}
