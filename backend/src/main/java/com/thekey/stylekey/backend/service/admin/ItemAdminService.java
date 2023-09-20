package com.thekey.stylekey.backend.service.admin;

import com.thekey.stylekey.backend.model.item.entity.Item;
import com.thekey.stylekey.backend.service.admin.dto.CreateItemRequestDto;
import com.thekey.stylekey.backend.service.admin.dto.UpdateItemRequestDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ItemAdminService {

    // create
    Item createItem(CreateItemRequestDto requestDto);

    // read only one
    Item findById(Long id);

    // read all
    List<Item> findAll();

    // update
    Item updateItem(Long id, UpdateItemRequestDto requestDto);

    // delete
    void deleteItem(Long id);
}
