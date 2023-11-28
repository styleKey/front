package com.thekey.stylekey.backend.service.admin.dto;

import com.thekey.stylekey.backend.model.stylepoint.entity.StylePoint;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdateStylePointRequestDto {
    private String title;
    private String description;
    private String image;

    @Builder
    public UpdateStylePointRequestDto(String title, String description, String image) {
        this.title = title;
        this.description = description;
        this.image = image;
    }

    public StylePoint toEntity() {
        return StylePoint.builder()
                .title(this.title)
                .description(this.description)
                .image(this.image)
                .build();
    }
}
