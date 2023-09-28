package com.thekey.stylekey.backend.controller.user;

import com.thekey.stylekey.backend.model.stylepoint.entity.StylePoint;
import com.thekey.stylekey.backend.service.user.StylePointUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Slf4j
public class UserStylePointController {
    private final StylePointUserService stylePointUserService;

    @GetMapping("/stylepoints")
    public ResponseEntity<List<StylePoint>> getAllStylePoints() {
        return ResponseEntity.ok(stylePointUserService.findAll());
    }

    @GetMapping("/stylepoint/{id}")
    public ResponseEntity<StylePoint> getStylePointById(@PathVariable Long id) {
        StylePoint stylePoint = stylePointUserService.findById(id);

        if (stylePoint == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(stylePoint);
    }
}
