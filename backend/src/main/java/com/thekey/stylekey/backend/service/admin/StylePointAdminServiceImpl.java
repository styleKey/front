package com.thekey.stylekey.backend.service.admin;

import com.thekey.stylekey.backend.model.brand.entity.Brand;
import com.thekey.stylekey.backend.model.brand.repository.BrandRepository;
import com.thekey.stylekey.backend.model.coordilook.entity.CoordiLook;
import com.thekey.stylekey.backend.model.coordilook.repository.CoordiLookRepository;
import com.thekey.stylekey.backend.model.stylepoint.entity.StylePoint;
import com.thekey.stylekey.backend.model.stylepoint.repository.StylePointRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class StylePointAdminServiceImpl implements StylePointAdminService {

    private final StylePointRepository stylePointRepository;
    private final BrandRepository brandRepository;
    private final CoordiLookRepository coordiLookRepository;

    @Override
    public StylePoint findById(Long id) {
        return stylePointRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("stylepoint does not exist: " + id));
    }

    @Override
    public List<StylePoint> findAll() {
        return stylePointRepository.findAll();
    }

    @Override
    public List<Brand> getBrandsByStylePointId(Long stylepointId) {
        StylePoint stylePoint = stylePointRepository.findById(stylepointId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid StylePoint ID: " + stylepointId));

        return brandRepository.findByStylepoint(stylePoint);
    }

    @Override
    public List<CoordiLook> getCoordilooksStylePointId(Long stylePointId) {
        StylePoint stylePoint = stylePointRepository.findById(stylePointId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid StylePoint ID: " + stylePointId));

        return coordiLookRepository.findByStylepoint(stylePoint);
    }
}
