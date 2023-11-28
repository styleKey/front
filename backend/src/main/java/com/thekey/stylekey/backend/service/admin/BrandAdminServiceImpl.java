package com.thekey.stylekey.backend.service.admin;

import com.thekey.stylekey.backend.common.ErrorMessage;
import com.thekey.stylekey.backend.model.brand.entity.Brand;
import com.thekey.stylekey.backend.model.brand.repository.BrandRepository;
import com.thekey.stylekey.backend.model.item.entity.Item;
import com.thekey.stylekey.backend.model.item.repository.ItemRepository;
import com.thekey.stylekey.backend.model.stylepoint.entity.StylePoint;
import com.thekey.stylekey.backend.model.stylepoint.repository.StylePointRepository;
import com.thekey.stylekey.backend.service.admin.dto.CreateBrandRequestDto;
import com.thekey.stylekey.backend.service.admin.dto.UpdateBrandRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class BrandAdminServiceImpl implements BrandAdminService {
    private final BrandRepository brandRepository;
    private final StylePointRepository stylePointRepository;
    private final ItemRepository itemRepository;

    @Override
    public Brand createBrand(CreateBrandRequestDto requestDto) {
        StylePoint stylePoint = findStylePoint(requestDto.getStylepointId());
        return brandRepository.save(requestDto.toEntity(stylePoint));
    }

    @Override
    public Brand findById(Long id) {
        return findBrand(id);
    }

    @Override
    public List<Brand> findAll() {
        return brandRepository.findAll();
    }

    @Override
    public Brand updateBrand(Long id, UpdateBrandRequestDto requestDto) {
        Brand brand = findBrand(id);
        StylePoint stylePoint = findStylePoint(requestDto.getStylepointId());

        brand.update(requestDto.getTitle(), requestDto.getTitle_eng(), requestDto.getDescription(),
                requestDto.getSite_url(), requestDto.getImage(), requestDto.toEntity(stylePoint).getStylepoint());

        return brand;
    }

    @Override
    public void deleteBrand(Long id) {
        brandRepository.deleteById(id);
    }

    @Override
    public List<Item> getItemsByBrandId(Long brandId) {
        Brand brand = findBrand(brandId);
        return itemRepository.findByBrand(brand);
    }

    private Brand findBrand(Long id) {
        return brandRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(ErrorMessage.INVALID_BRAND_ID.get() + id));
    }

    private StylePoint findStylePoint(Long id) {
        return stylePointRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        ErrorMessage.NOT_FOUND_STYLEPOINT.get() + id));
    }
}
