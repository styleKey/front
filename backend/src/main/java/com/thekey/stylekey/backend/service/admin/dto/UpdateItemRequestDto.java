package com.thekey.stylekey.backend.service.admin.dto;

import com.thekey.stylekey.backend.model.brand.entity.Brand;
import com.thekey.stylekey.backend.model.category.entity.Category;
import com.thekey.stylekey.backend.model.coordilook.entity.CoordiLook;
import com.thekey.stylekey.backend.model.item.entity.Item;
import com.thekey.stylekey.backend.model.stylepoint.entity.StylePoint;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdateItemRequestDto {
    private String title;
    private String sales_link;
    private String image;
    private Long brandId;
    private Long coordilookId;
    private Long categoryId;

    @Builder
    public UpdateItemRequestDto(String title, String sales_link, String image, Long brandId, Long coordilookId, Long categoryId) {
        this.title = title;
        this.sales_link = sales_link;
        this.image = image;
        this.brandId = brandId;
        this.coordilookId = coordilookId;
        this.categoryId = categoryId;
    }

    public Item toEntity(Brand brand, CoordiLook coordiLook, Category category) {
        return Item.builder()
                .title(this.title)
                .sales_link(this.sales_link)
                .image(this.image)
                .brand(brand)
                .coordilook(coordiLook)
                .category(category)
                .build();
    }
}
