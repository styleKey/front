package com.thekey.stylekey.backend.common;

public enum ErrorMessage {
    NOT_FOUND_STYLEPOINT("StylePoint not found with id: "),
    NOT_FOUND_BRAND("brand does not found with id: "),
    NOT_FOUND_CATEGORY("category does not found with id: "),
    NOT_FOUND_COORDILOOK("coordilook does not found with id: "),
    NOT_FOUND_ITEM("item does not found with id: "),
    INVALID_BRAND_ID("Invalid Brand id: "),
    INVALID_CATEGORY_ID("Invalid Category id: ")


    ;

    private String message;

    ErrorMessage(String message) {
        this.message = message;
    }

    public String get() {
        return message;
    }
}
