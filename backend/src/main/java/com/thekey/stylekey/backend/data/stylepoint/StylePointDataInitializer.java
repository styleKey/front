package com.thekey.stylekey.backend.data.stylepoint;

import com.thekey.stylekey.backend.model.stylepoint.entity.StylePoint;
import com.thekey.stylekey.backend.model.stylepoint.repository.StylePointRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
@RequiredArgsConstructor
public class StylePointDataInitializer {

    private final StylePointRepository stylePointRepository;

    @PostConstruct
    public void init() {
        StylePoint stylePoint_1 = StylePoint.builder()
                .title(com.thekey.stylekey.backend.common.StylePoint.UNIQUE.getTitle())
                .description(com.thekey.stylekey.backend.common.StylePoint.UNIQUE.getDescription())
                .image(com.thekey.stylekey.backend.common.StylePoint.UNIQUE.getImage())
                .build();
        stylePointRepository.save(stylePoint_1);

        StylePoint stylePoint_2 = StylePoint.builder()
                .title(com.thekey.stylekey.backend.common.StylePoint.STREET.getTitle())
                .description(com.thekey.stylekey.backend.common.StylePoint.STREET.getDescription())
                .image(com.thekey.stylekey.backend.common.StylePoint.STREET.getImage())
                .build();
        stylePointRepository.save(stylePoint_2);

        StylePoint stylePoint_3 = StylePoint.builder()
                .title(com.thekey.stylekey.backend.common.StylePoint.MODERN.getTitle())
                .description(com.thekey.stylekey.backend.common.StylePoint.MODERN.getDescription())
                .image(com.thekey.stylekey.backend.common.StylePoint.MODERN.getImage())
                .build();
        stylePointRepository.save(stylePoint_3);

        StylePoint stylePoint_4 = StylePoint.builder()
                .title(com.thekey.stylekey.backend.common.StylePoint.NORMAL.getTitle())
                .description(com.thekey.stylekey.backend.common.StylePoint.NORMAL.getDescription())
                .image(com.thekey.stylekey.backend.common.StylePoint.NORMAL.getImage())
                .build();
        stylePointRepository.save(stylePoint_4);

        StylePoint stylePoint_5 = StylePoint.builder()
                .title(com.thekey.stylekey.backend.common.StylePoint.LOVELY.getTitle())
                .description(com.thekey.stylekey.backend.common.StylePoint.LOVELY.getDescription())
                .image(com.thekey.stylekey.backend.common.StylePoint.LOVELY.getImage())
                .build();
        stylePointRepository.save(stylePoint_5);

        StylePoint stylePoint_6 = StylePoint.builder()
                .title(com.thekey.stylekey.backend.common.StylePoint.RETRO.getTitle())
                .description(com.thekey.stylekey.backend.common.StylePoint.RETRO.getDescription())
                .image(com.thekey.stylekey.backend.common.StylePoint.RETRO.getImage())
                .build();
        stylePointRepository.save(stylePoint_6);

        StylePoint stylePoint_7 = StylePoint.builder()
                .title(com.thekey.stylekey.backend.common.StylePoint.GLAM.getTitle())
                .description(com.thekey.stylekey.backend.common.StylePoint.GLAM.getDescription())
                .image(com.thekey.stylekey.backend.common.StylePoint.GLAM.getImage())
                .build();
        stylePointRepository.save(stylePoint_7);

        StylePoint stylePoint_8 = StylePoint.builder()
                .title(com.thekey.stylekey.backend.common.StylePoint.ACTIVE.getTitle())
                .description(com.thekey.stylekey.backend.common.StylePoint.ACTIVE.getDescription())
                .image(com.thekey.stylekey.backend.common.StylePoint.ACTIVE.getImage())
                .build();
        stylePointRepository.save(stylePoint_8);
    }
}
