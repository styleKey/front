package com.thekey.stylekey.backend.controller.admin;

import com.thekey.stylekey.backend.model.brand.entity.Brand;
import com.thekey.stylekey.backend.model.coordilook.entity.CoordiLook;
import com.thekey.stylekey.backend.model.stylepoint.entity.StylePoint;
import com.thekey.stylekey.backend.service.admin.StylePointAdminService;
import com.thekey.stylekey.backend.service.admin.dto.UpdateStylePointRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
@Slf4j
public class AdminStylePointController {

    private final StylePointAdminService styleAdminService;

    @GetMapping("/stylepoints")
    public ResponseEntity<List<StylePoint>> getAllStylePoints() {
        return ResponseEntity.ok(styleAdminService.findAll());
    }

    @GetMapping("/stylepoint/{id}")
    public ResponseEntity<Map<String, Object>> getStylePointById(@PathVariable Long id) {
        StylePoint stylePoint = styleAdminService.findById(id);

        if (isNull(stylePoint)) {
            return ResponseEntity.notFound().build();
        }

        List<Brand> brands = getBrands(id);
        List<CoordiLook> coordiLooks = getCoordiLooks(id);

        Map<String, Object> response = Map.of(
                "stylepoint", stylePoint,
                "brands", brands,
                "coordilooks", coordiLooks
        );

        return ResponseEntity.ok(response);
    }

    @PutMapping("/stylepoint/{id}")
    public ResponseEntity<StylePoint> updateStylePoint(@PathVariable Long id,
                                                       @RequestBody UpdateStylePointRequestDto requestDto) {
        if (id == null) {
            return ResponseEntity.ok().build();
        }

        StylePoint updatedStylePoint = styleAdminService.updateStylePoint(id, requestDto);

        if (isNull(updatedStylePoint)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedStylePoint);
    }

    private boolean isNull(StylePoint stylePoint) {
        return stylePoint == null;
    }

    private List<Brand> getBrands(Long id) {
        return styleAdminService.getBrandsByStylePointId(id);
    }

    private List<CoordiLook> getCoordiLooks(Long id) {
        return styleAdminService.getCoordilooksStylePointId(id);
    }
}
