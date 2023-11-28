package com.thekey.stylekey.backend.common;

public enum StylePoint {
    UNIQUE("Unique", "변화하는 트렌드를 반영하여 평범하지 않고 개성있는 디테일을 추구하는 스타일",
            "https://style-key-bucket.s3.ap-northeast-2.amazonaws.com/stylepoint/%E1%84%8B%E1%85%B2%E1%84%82%E1%85%B5%E1%84%8F%E1%85%B3.png"),
    STREET("Street", "격식을 갖추지 않고 길거리에서 편하게 입을 수 있는 힙한 스타일",
            "https://style-key-bucket.s3.ap-northeast-2.amazonaws.com/stylepoint/스트릿.png"),
    MODERN("Modern", "장식적인 것 없이 깔끔하고 심플하며 직선적인 실루엣을 추구하는 스타일",
            "https://style-key-bucket.s3.ap-northeast-2.amazonaws.com/stylepoint/모던.png"),
    NORMAL("Normal", "일상적이고 평범한 착장이 무난하지 않도록 센스있는 포인트가 들어간 스타일",
            "https://style-key-bucket.s3.ap-northeast-2.amazonaws.com/stylepoint/노멀.png"),
    LOVELY("Lovely", "사랑스러운 소녀같이 귀엽고 로맨틱하면서 여성스러운 무드를 강조한 스타일",
            "https://style-key-bucket.s3.ap-northeast-2.amazonaws.com/stylepoint/러블리.jpg"),
    RETRO("Retro", "1990-2000년대의 감성을 재해석하여 오래된 듯한 멋진 느낌이 드는 스타일",
            "https://style-key-bucket.s3.ap-northeast-2.amazonaws.com/stylepoint/레트로.jpg"),
    GLAM("Glam", "섹시함이 강조되는 화려하고 여성스러운 스타일",
            "https://style-key-bucket.s3.ap-northeast-2.amazonaws.com/stylepoint/글램.png"),
    ACTIVE("Active", "스포츠웨어와 일상복의 경계를 허물고 활동적인 이미지를 표현하는 스타일",
            "https://style-key-bucket.s3.ap-northeast-2.amazonaws.com/stylepoint/액티브.png");
    private String title;
    private String description;
    private String image;

    StylePoint(String title, String description, String image) {
        this.title = title;
        this.description = description;
        this.image = image;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getImage() {
        return image;
    }
}
