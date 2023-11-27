package com.thekey.stylekey.backend.common;

public enum Category {
    TOP("TOP"),
    OUTER("OUTER"),
    DRESS("DRESS"),
    BOTTOM("BOTTOM"),
    BAG("BAG"),
    SHOES("SHOES"),
    ACC("ACC");

    private String title;

    Category(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }
}
