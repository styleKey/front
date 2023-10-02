package com.thekey.stylekey.backend.service.user;

import com.thekey.stylekey.backend.model.brand.entity.Brand;
import com.thekey.stylekey.backend.model.brand.repository.BrandRepository;
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
public class BrandUserServiceImpl implements BrandUserService {
    private final StylePointRepository stylePointRepository;

    private final BrandRepository brandRepository;

    @Override
    public List<Brand> findAll() {
        return brandRepository.findAll();
    }

    @Override
    public Brand findById(Long id) {
        return brandRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("brand does not exist: " + id));
    }

    @Override
    public List<Brand> findBrandByStylepointId(Long stylepointId) {
        StylePoint stylePoint = stylePointRepository.findById(stylepointId)
                .orElseThrow(() -> new IllegalArgumentException("StylePoint not found with id: " + stylepointId));
        return brandRepository.findByStylepoint(stylePoint);
    }
}
