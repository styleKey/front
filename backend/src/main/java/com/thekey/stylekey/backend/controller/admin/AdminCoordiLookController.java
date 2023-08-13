package com.thekey.stylekey.backend.controller.admin;

import com.thekey.stylekey.backend.model.coordilook.entity.CoordiLook;
import com.thekey.stylekey.backend.service.admin.CoordiLookAdminService;
import com.thekey.stylekey.backend.service.admin.dto.CreateCoordiLookRequestDto;
import com.thekey.stylekey.backend.service.admin.dto.UpdateCoordiLookRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/admin")
public class AdminCoordiLookController {

    private final CoordiLookAdminService coordiLookAdminService;

    // Read All
    @GetMapping("/coordilooks")
    public ResponseEntity<Page<CoordiLook>> getAllCoordiLooks(@PageableDefault(size = 10) Pageable pageable) {
        Page<CoordiLook> CoordiLooksPage = coordiLookAdminService.findAll(pageable);
        if (CoordiLooksPage.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(CoordiLooksPage);
        }

        return ResponseEntity.ok(CoordiLooksPage);

    }

    // Read only one
    @GetMapping("/coordilook/{id}")
    public ResponseEntity<CoordiLook> getCoordiLookById(@PathVariable Long id) {
        CoordiLook coordiLook = coordiLookAdminService.findById(id);
        if (coordiLook == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(coordiLook);

    }

    // Create
    @PostMapping("/coordilook/create")
    public ResponseEntity<CoordiLook> createCoordiLook(@RequestBody CreateCoordiLookRequestDto requestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(coordiLookAdminService.createCoordiLook(requestDto));
    }

    // Update
    @PutMapping("/coordilook/{id}")
    public ResponseEntity<CoordiLook> updateCoordiLook(@PathVariable Long id, @RequestBody UpdateCoordiLookRequestDto requestDto) {
        if (id == null) {
            log.info(String.valueOf(id));
            return ResponseEntity.ok().build();
        }

        CoordiLook updatedCoordiLook = coordiLookAdminService.updateCoordiLook(id, requestDto);
        if (updatedCoordiLook == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedCoordiLook);
    }

    // Delete
    @DeleteMapping("/coordilook/{id}")
    public ResponseEntity<Void> deleteCoordiLook(@PathVariable Long id) {
        coordiLookAdminService.deleteCoordiLook(id);
        return ResponseEntity.ok().build();
    }
}
