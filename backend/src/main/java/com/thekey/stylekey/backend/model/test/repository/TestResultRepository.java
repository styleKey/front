package com.thekey.stylekey.backend.model.test.repository;

import com.thekey.stylekey.backend.model.test.entity.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestResultRepository extends JpaRepository<TestResult, Long> {
}
