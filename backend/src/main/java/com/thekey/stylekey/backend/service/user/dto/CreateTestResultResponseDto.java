package com.thekey.stylekey.backend.service.user.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateTestResultResponseDto {
    private String highest_stylepoint;
    private String lowest_stylepoint;

    @Builder
    public CreateTestResultResponseDto(String highest_stylepoint, String lowest_stylepoint) {
        this.highest_stylepoint = highest_stylepoint;
        this.lowest_stylepoint = lowest_stylepoint;
    }
}
