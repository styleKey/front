package com.thekey.stylekey.backend.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public class ErrorResponse {
    private int status;
    private String error;
    private String message;
}