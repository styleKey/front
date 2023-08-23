package com.thekey.stylekey.backend.service.admin;

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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;

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
        Category category = categoryRepository.findById(requestDto.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + requestDto.getCategoryId()));

        Brand brand = brandRepository.findById(requestDto.getBrandId())
                .orElseThrow(() -> new EntityNotFoundException("Brand not found with id: " + requestDto.getBrandId()));

        CoordiLook coordiLook = coordiLookRepository.findById(requestDto.getCoordilookId())
                .orElseThrow(() -> new EntityNotFoundException("CoordiLook not found with id: " + requestDto.getCoordilookId()));

        return itemRepository.save(requestDto.toEntity(brand, coordiLook, category));

    }

    @Override
    public Item findById(Long id) {
        return itemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("item does not exist: " + id));
    }

    @Override
    public Page<Item> findAll(Pageable pageable) {
        return itemRepository.findAll(pageable);
    }

    @Override
    public Item updateItem(Long id, UpdateItemRequestDto requestDto) {

        Category category = categoryRepository.findById(requestDto.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + requestDto.getCategoryId()));

        Brand brand = brandRepository.findById(requestDto.getBrandId())
                .orElseThrow(() -> new EntityNotFoundException("Brand not found with id: " + requestDto.getBrandId()));

        CoordiLook coordiLook = coordiLookRepository.findById(requestDto.getCoordilookId())
                .orElseThrow(() -> new EntityNotFoundException("CoordiLook not found with id: " + requestDto.getCoordilookId()));


        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("item does not exist: " + id));

        Item updatedItem = requestDto.toEntity(brand, coordiLook, category);

        item.update(requestDto.getTitle(), requestDto.getSales_link(), requestDto.getImage(), updatedItem.getBrand(), updatedItem.getCoordilook(),
                updatedItem.getCategory());

        return item;
    }

    @Override
    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }

}
