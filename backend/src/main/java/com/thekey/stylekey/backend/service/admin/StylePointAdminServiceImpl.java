package com.thekey.stylekey.backend.service.admin;

import com.thekey.stylekey.backend.model.brand.entity.Brand;
import com.thekey.stylekey.backend.model.brand.repository.BrandRepository;
import com.thekey.stylekey.backend.model.coordilook.entity.CoordiLook;
import com.thekey.stylekey.backend.model.coordilook.repository.CoordiLookRepository;
import com.thekey.stylekey.backend.model.stylepoint.entity.StylePoint;
import com.thekey.stylekey.backend.model.stylepoint.repository.StylePointRepository;
import com.thekey.stylekey.backend.service.admin.dto.UpdateStylePointRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class StylePointAdminServiceImpl implements StylePointAdminService {

    private final StylePointRepository stylePointRepository;
    private final BrandRepository brandRepository;
    private final CoordiLookRepository coordiLookRepository;

    @Transactional
    @Override
    public StylePoint findById(Long id) {
        return stylePointRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("stylepoint does not exist: " + id));
    }

    @Transactional
    @Override
    public List<StylePoint> findAll() {
        return stylePointRepository.findAll();
    }

    @Transactional
    @Override
    public List<Brand> getBrandsByStylePointId(Long stylepointId) {
        StylePoint stylePoint = stylePointRepository.findById(stylepointId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid StylePoint ID: " + stylepointId));

        return brandRepository.findByStylepoint(stylePoint);
    }

    @Transactional
    @Override
    public StylePoint updateStylePoint(Long stylepointId, UpdateStylePointRequestDto requestDto) {
        StylePoint stylePoint = stylePointRepository.findById(stylepointId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid StylePoint ID: " + stylepointId));

        stylePoint.update(requestDto.getTitle(), requestDto.getDescription(), requestDto.getImage());
        return stylePoint;

    }

    @Transactional
    @Override
    public List<CoordiLook> getCoordilooksStylePointId(Long stylePointId) {
        StylePoint stylePoint = stylePointRepository.findById(stylePointId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid StylePoint ID: " + stylePointId));

        return coordiLookRepository.findByStylepoint(stylePoint);
    }
}
