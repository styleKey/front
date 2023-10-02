package com.thekey.stylekey.backend.service.user;

import com.thekey.stylekey.backend.model.brand.entity.Brand;
import com.thekey.stylekey.backend.model.brand.repository.BrandRepository;
import com.thekey.stylekey.backend.model.coordilook.entity.CoordiLook;
import com.thekey.stylekey.backend.model.coordilook.repository.CoordiLookRepository;
import com.thekey.stylekey.backend.model.item.entity.Item;
import com.thekey.stylekey.backend.model.item.repository.ItemRepository;
import com.thekey.stylekey.backend.model.stylepoint.repository.StylePointRepository;
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
public class ItemUserServiceImpl implements ItemUserService {

    private final ItemRepository itemRepository;
    private final BrandRepository brandRepository;
    private final CoordiLookRepository coordiLookRepository;
    private StylePointRepository stylePointRepository;

    @Override
    public List<Item> findAll() {
        return itemRepository.findAll();
    }

    @Override
    public Item findById(Long id) {
        return itemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Item does not exist: " + id));
    }

    @Override
    public List<Item> findItemByCoordiLookId(Long coordilookId) {
        CoordiLook coordiLook = coordiLookRepository.findById(coordilookId)
                .orElseThrow(() -> new EntityNotFoundException("CoordiLook does not exist: " + coordilookId));
        return itemRepository.findByCoordilook(coordiLook);
    }


    @Override
    public List<Item> findItemByBrandId(Long brandId) {
        Brand brand = brandRepository.findById(brandId)
                .orElseThrow(() -> new EntityNotFoundException(("Brand does not exist: " + brandId)));
        return itemRepository.findByBrand(brand);
    }
}
