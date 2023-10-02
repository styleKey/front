package com.thekey.stylekey.backend.service.user;

import com.thekey.stylekey.backend.model.item.entity.Item;

import java.util.List;

public interface ItemUserService {
    List<Item> findAll();

    Item findById(Long id);

    List<Item> findItemByCoordiLookId(Long coordilookId);

    List<Item> findItemByBrandId(Long brandId);
}
