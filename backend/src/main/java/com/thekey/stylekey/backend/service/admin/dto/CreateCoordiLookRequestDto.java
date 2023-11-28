package com.thekey.stylekey.backend.service.admin.dto;

import com.thekey.stylekey.backend.model.coordilook.entity.CoordiLook;
import com.thekey.stylekey.backend.model.stylepoint.entity.StylePoint;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateCoordiLookRequestDto {
    private String title;
    private String image;
    private Long stylepointId;

    @Builder
    public CreateCoordiLookRequestDto(String title, String image, Long stylepointId) {
        this.title = title;
        this.image = image;
        this.stylepointId = stylepointId;
    }

    public CoordiLook toEntity(StylePoint stylepoint) {
        return CoordiLook.builder()
                .title(this.title)
                .image(this.image)
                .stylepoint(stylepoint)
                .build();
    }
}
