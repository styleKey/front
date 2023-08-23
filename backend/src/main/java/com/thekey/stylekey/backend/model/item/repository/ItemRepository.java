package com.thekey.stylekey.backend.model.item.repository;

import com.thekey.stylekey.backend.model.brand.entity.Brand;
import com.thekey.stylekey.backend.model.category.entity.Category;
import com.thekey.stylekey.backend.model.coordilook.entity.CoordiLook;
import com.thekey.stylekey.backend.model.item.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    @EntityGraph(attributePaths = { "brand", "coordilook", "category" })
    List<Item> findByCategory(Category category);

    @EntityGraph(attributePaths = { "brand", "coordilook", "category" })
    List<Item> findByBrand(Brand brand);

    @EntityGraph(attributePaths = { "brand", "coordilook", "category" })
    List<Item> findByCoordilook(CoordiLook coordiLook);

    @EntityGraph(attributePaths = { "brand", "coordilook", "category" })
    Optional<Item> findById(Long id);

    @EntityGraph(attributePaths = { "brand", "coordilook", "category" })
    Page<Item> findAll(Pageable pageable);
}
