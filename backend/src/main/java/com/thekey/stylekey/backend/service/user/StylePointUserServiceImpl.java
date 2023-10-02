package com.thekey.stylekey.backend.service.user;

import com.thekey.stylekey.backend.model.stylepoint.entity.StylePoint;
import com.thekey.stylekey.backend.model.stylepoint.repository.StylePointRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class StylePointUserServiceImpl implements StylePointUserService {
    private final StylePointRepository stylePointRepository;

    @Override
    public StylePoint findById(Long id) {
        return stylePointRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("stylepoint does not exist: " + id));
    }

    @Override
    public List<StylePoint> findAll() {
        return stylePointRepository.findAll();
    }
}
