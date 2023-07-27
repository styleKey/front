package com.thekey.stylekey.backend.service.admin;

import com.thekey.stylekey.backend.model.brand.entity.Brand;
import com.thekey.stylekey.backend.model.brand.repository.BrandRepository;
import com.thekey.stylekey.backend.model.stylepoint.entity.StylePoint;
import com.thekey.stylekey.backend.model.stylepoint.repository.StylePointRepository;
import com.thekey.stylekey.backend.service.admin.dto.CreateBrandRequestDto;
import com.thekey.stylekey.backend.service.admin.dto.UpdateBrandRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;

@Service
@RequiredArgsConstructor
@Slf4j
public class BrandAdminServiceImpl implements BrandAdminService {
    private final BrandRepository brandRepository;
    private final StylePointRepository stylePointRepository;

    @Transactional
    @Override
    public Brand createBrand(CreateBrandRequestDto requestDto) {

        StylePoint stylePoint = stylePointRepository.findById(requestDto.getStylepointId())
                .orElseThrow(() -> new EntityNotFoundException("StylePoint not found with id: " + requestDto.getStylepointId()));

        return brandRepository.save(requestDto.toEntity(stylePoint));
    }

    @Transactional
    @Override
    public Brand findById(Long id) {
        return brandRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("brand does not exist:" + id));
    }

    @Transactional
    @Override
    public Page<Brand> findAll(Pageable pageable) {
        return brandRepository.findAll(pageable);
    }

    @Transactional
    @Override
    public Brand updateBrand(Long id, UpdateBrandRequestDto requestDto) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("brand does not exist: " + id));

        StylePoint stylePoint = stylePointRepository.findById(requestDto.getStylepointId())
                .orElseThrow(() -> new EntityNotFoundException("StylePoint not found with id: " + requestDto.getStylepointId()));


        brand.update(requestDto.getTitle(), requestDto.getTitle_eng(), requestDto.getDescription(),
                requestDto.getSite_url(), requestDto.getSite_url(), requestDto.toEntity(stylePoint).getStylepoint());
        return brand;
    }

    @Transactional
    @Override
    public void deleteBrand(Long id) {
        brandRepository.deleteById(id);
    }
}
