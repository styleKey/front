package com.thekey.stylekey.backend.controller.admin;

import com.thekey.stylekey.backend.model.coordilook.entity.CoordiLook;
import com.thekey.stylekey.backend.model.item.entity.Item;
import com.thekey.stylekey.backend.model.stylepoint.entity.StylePoint;
import com.thekey.stylekey.backend.service.admin.CoordiLookAdminService;
import com.thekey.stylekey.backend.service.admin.dto.CreateCoordiLookRequestDto;
import com.thekey.stylekey.backend.service.admin.dto.UpdateCoordiLookRequestDto;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/admin")
public class AdminCoordiLookController {

    private final CoordiLookAdminService coordiLookAdminService;

    @GetMapping("/coordilooks")
    public ResponseEntity<List<CoordiLook>> getAllCoordiLooks() {
        List<CoordiLook> CoordiLooks = coordiLookAdminService.findAll();
        if (CoordiLooks.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(CoordiLooks);
        }
        return ResponseEntity.ok(CoordiLooks);
    }

    @GetMapping("/coordilook/{id}")
    public ResponseEntity<Map<String, Object>> getCoordiLookById(@PathVariable Long id) {
        CoordiLook coordiLook = coordiLookAdminService.findById(id);

        if (isNull(coordiLook)) {
            return ResponseEntity.notFound().build();
        }

        List<Item> items = coordiLookAdminService.getItemsByCoordiLookId(id);
        Long stylepointId = getStylepointId(coordiLook);

        Map<String, Object> response = Map.of(
                "coordiLook", coordiLook,
                "item", items,
                "stylepointId", stylepointId
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/coordilook/create")
    public ResponseEntity<CoordiLook> createCoordiLook(@RequestBody CreateCoordiLookRequestDto requestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(coordiLookAdminService.createCoordiLook(requestDto));
    }

    @PutMapping("/coordilook/{id}")
    public ResponseEntity<CoordiLook> updateCoordiLook(@PathVariable Long id,
                                                       @RequestBody UpdateCoordiLookRequestDto requestDto) {
        if (id == null) {
            return ResponseEntity.ok().build();
        }

        CoordiLook updatedCoordiLook = coordiLookAdminService.updateCoordiLook(id, requestDto);

        if (isNull(updatedCoordiLook)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedCoordiLook);
    }

    @DeleteMapping("/coordilook/{id}")
    public ResponseEntity<Void> deleteCoordiLook(@PathVariable Long id) {
        coordiLookAdminService.deleteCoordiLook(id);
        return ResponseEntity.ok().build();
    }

    private Long getStylepointId(CoordiLook coordiLook) {
        return Optional.ofNullable(coordiLook.getStylepoint())
                .map(StylePoint::getId)
                .orElse(null);
    }

    private boolean isNull(CoordiLook coordiLook) {
        return coordiLook == null;
    }
}
