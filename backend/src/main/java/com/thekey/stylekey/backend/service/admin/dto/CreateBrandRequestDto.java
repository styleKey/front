package com.thekey.stylekey.backend.service.admin.dto;

import com.thekey.stylekey.backend.model.brand.entity.Brand;
import com.thekey.stylekey.backend.model.stylepoint.entity.StylePoint;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateBrandRequestDto {
    private String title;
    private String title_eng;
    private String description;
    private String site_url;
    private String image;
    private Long stylepointId;

    @Builder
    public CreateBrandRequestDto(String title, String title_eng, String description, String site_url, String image,
                                 Long stylepointId) {
        this.title = title;
        this.title_eng = title_eng;
        this.description = description;
        this.site_url = site_url;
        this.image = image;
        this.stylepointId = stylepointId;
    }

    public Brand toEntity(StylePoint stylepoint) {
        return Brand.builder()
                .title(this.title)
                .title_eng(this.title_eng)
                .description(this.description)
                .site_url(this.site_url)
                .image(this.image)
                .stylepoint(stylepoint)
                .build();
    }
}
