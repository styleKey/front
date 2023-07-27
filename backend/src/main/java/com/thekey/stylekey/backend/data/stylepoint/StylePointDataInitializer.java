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
        // 더미 데이터 생성 및 저장
        StylePoint stylePoint_1 = StylePoint.builder()
                .title("Unique")
                .description("변화하는 트렌드를 반영하여 평범하지 않고 개성있는 디테일을 추구하는 스타일")
                .image("image_url_1")
                .build();

        StylePoint stylePoint_2 = StylePoint.builder()
                .title("Street")
                .description("격식을 갖추지 않고 길거리에서 편하게 입을 수 있는 힙한 스타일")
                .image("image_url_2")
                .build();

        StylePoint stylePoint_3 = StylePoint.builder()
                .title("Modern")
                .description("장식적인 것 없이 깔끔하고 심플하며 직선적인 실루엣을 추구하는 스타일")
                .image("image_url_3")
                .build();

        StylePoint stylePoint_4 = StylePoint.builder()
                .title("Normal")
                .description("일상적이고 평범한 착장이 무난하지 않도록 센스있는 포인트가 들어간 스타일")
                .image("image_url_4")
                .build();

        StylePoint stylePoint_5 = StylePoint.builder()
                .title("Lovely")
                .description("사랑스러운 소녀같이 귀엽고 로맨틱하면서 여성스러운 무드를 강조한 스타일")
                .image("image_url_5")
                .build();

        StylePoint stylePoint_6 = StylePoint.builder()
                .title("Retro")
                .description("1990-2000년대의 감성을 재해석하여 오래된 듯한 멋진 느낌이 드는 스타일")
                .image("image_url_6")
                .build();

        StylePoint stylePoint_7 = StylePoint.builder()
                .title("Glam")
                .description("섹시함이 강조되는 화려하고 여성스러운 스타일")
                .image("image_url_7")
                .build();

        StylePoint stylePoint_8 = StylePoint.builder()
                .title("Active")
                .description("스포츠웨어와 일상복의 경계를 허물고 활동적인 이미지를 표현하는 스타일")
                .image("image_url_8")
                .build();

        // StylePoint 엔티티를 저장
        stylePointRepository.save(stylePoint_1);
        stylePointRepository.save(stylePoint_2);
        stylePointRepository.save(stylePoint_3);
        stylePointRepository.save(stylePoint_4);
        stylePointRepository.save(stylePoint_5);
        stylePointRepository.save(stylePoint_6);
        stylePointRepository.save(stylePoint_7);
        stylePointRepository.save(stylePoint_8);

    }
}
