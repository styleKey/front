package com.thekey.stylekey.backend.model.item.repository;

import com.thekey.stylekey.backend.model.item.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
}
