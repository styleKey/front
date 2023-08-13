package com.thekey.stylekey.backend.controller.admin;

import com.thekey.stylekey.backend.model.brand.entity.Brand;
import com.thekey.stylekey.backend.model.coordilook.entity.CoordiLook;
import com.thekey.stylekey.backend.model.coordilook.repository.CoordiLookRepository;
import com.thekey.stylekey.backend.model.stylepoint.entity.StylePoint;
import com.thekey.stylekey.backend.service.admin.StylePointAdminService;
import com.thekey.stylekey.backend.service.admin.dto.UpdateStylePointRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
@Slf4j
public class AdminStylePointController {
    private final StylePointAdminService styleAdminService;

    // Read All
    @GetMapping("/stylepoints")
    public ResponseEntity<List<StylePoint>> getAllStylePoints() {
        return ResponseEntity.ok(styleAdminService.findAll());

    }

    // Read Only One By ID
    @GetMapping("/stylepoint/{id}")
    public ResponseEntity<Map<String, Object>> getStylePointById(@PathVariable Long id) {
        StylePoint stylePoint = styleAdminService.findById(id);
        List<Brand> brands = styleAdminService.getBrandsByStylePointId(id);
        List<CoordiLook> coordiLooks = styleAdminService.getCoordilooksStylePointId(id);

        Map<String, Object> response = new HashMap<>();
        response.put("stylePoint", stylePoint);
        response.put("brands", brands);
        response.put("coordilooks", coordiLooks);

        if (stylePoint == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }

    @PutMapping("/stylepoint/{id}")
    public ResponseEntity<StylePoint> updateStylePoint(@PathVariable Long id, @RequestBody UpdateStylePointRequestDto requestDto) {
        if (id == null) {
            return ResponseEntity.ok().build();
        }

        StylePoint updatedStylePoint = styleAdminService.updateStylePoint(id, requestDto);
        if (updatedStylePoint == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedStylePoint);
    }

}
