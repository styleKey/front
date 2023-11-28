package com.thekey.stylekey.backend.service.admin;

import com.thekey.stylekey.backend.common.ErrorMessage;
import com.thekey.stylekey.backend.model.brand.entity.Brand;
import com.thekey.stylekey.backend.model.brand.repository.BrandRepository;
import com.thekey.stylekey.backend.model.category.entity.Category;
import com.thekey.stylekey.backend.model.category.repository.CategoryRepository;
import com.thekey.stylekey.backend.model.coordilook.entity.CoordiLook;
import com.thekey.stylekey.backend.model.coordilook.repository.CoordiLookRepository;
import com.thekey.stylekey.backend.model.item.entity.Item;
import com.thekey.stylekey.backend.model.item.repository.ItemRepository;
import com.thekey.stylekey.backend.service.admin.dto.CreateItemRequestDto;
import com.thekey.stylekey.backend.service.admin.dto.UpdateItemRequestDto;
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
public class ItemAdminServiceImpl implements ItemAdminService {

    private final ItemRepository itemRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;
    private final CoordiLookRepository coordiLookRepository;

    @Override
    public Item createItem(CreateItemRequestDto requestDto) {
        Category category = findCategory(requestDto.getCategoryId());
        Brand brand = findBrand(requestDto.getCategoryId());
        CoordiLook coordiLook = findCoordiLook(requestDto.getCategoryId());

        return itemRepository.save(requestDto.toEntity(brand, coordiLook, category));
    }

    @Override
    public Item findById(Long id) {
        return findItem(id);
    }

    @Override
    public List<Item> findAll() {
        return itemRepository.findAll();
    }

    @Override
    public Item updateItem(Long id, UpdateItemRequestDto requestDto) {

        Category category = findCategory(requestDto.getCategoryId());
        Brand brand = findBrand(requestDto.getCategoryId());
        CoordiLook coordiLook = findCoordiLook(requestDto.getCategoryId());
        Item item = findItem(id);

        Item updatedItem = requestDto.toEntity(brand, coordiLook, category);

        item.update(requestDto.getTitle(), requestDto.getSales_link(), requestDto.getImage(), updatedItem.getBrand(),
                updatedItem.getCoordilook(),
                updatedItem.getCategory());

        return item;
    }

    @Override
    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }

    private Category findCategory(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(ErrorMessage.NOT_FOUND_CATEGORY.get() + id));
    }

    private Brand findBrand(Long id) {
        return brandRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(ErrorMessage.INVALID_BRAND_ID.get() + id));
    }

    private CoordiLook findCoordiLook(Long id) {
        return coordiLookRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(ErrorMessage.NOT_FOUND_COORDILOOK.get() + id));
    }

    private Item findItem(Long id) {
        return itemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(ErrorMessage.NOT_FOUND_ITEM.get() + id));
    }
}
