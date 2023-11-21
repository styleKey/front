package com.thekey.stylekey.backend.controller.admin;

import com.thekey.stylekey.backend.model.brand.entity.Brand;
import com.thekey.stylekey.backend.model.item.entity.Item;
import com.thekey.stylekey.backend.service.admin.BrandAdminService;
import com.thekey.stylekey.backend.service.admin.dto.CreateBrandRequestDto;
import com.thekey.stylekey.backend.service.admin.dto.UpdateBrandRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminBrandController {
    private final BrandAdminService brandAdminService;

    @GetMapping("/brands")
    public ResponseEntity<List<Brand>> getAllBrands() {
        List<Brand> brands = brandAdminService.findAll();
        if (brands.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(brands);
        }
        return ResponseEntity.ok(brands);
    }

    @GetMapping("/brand/{id}")
    public ResponseEntity<Map<String, Object>> getBrandById(@PathVariable Long id) {
        Brand brand = brandAdminService.findById(id);
        if (brand == null) {
            return ResponseEntity.notFound().build();
        }

        List<Item> items = brandAdminService.getItemsByBrandId(id);
        Long stylepointId = brand.getStylepoint().getId();

        Map<String, Object> response = new HashMap<>();
        response.put("brand", brand);
        response.put("item", items);
        response.put("stylepointId", stylepointId);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/brand/create")
    public ResponseEntity<Map<String, Object>> createBrand(@RequestBody CreateBrandRequestDto requestDto) {
        Brand createdBrand = brandAdminService.createBrand(requestDto);
        if (createdBrand == null) {
            return ResponseEntity.notFound().build();
        }
        Long stylepointId = requestDto.getStylepointId();

        Map<String, Object> response = new HashMap<>();
        response.put("stylepointId", stylepointId);
        response.put("brand", createdBrand);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/brand/{id}")
    public ResponseEntity<Map<String, Object>> updateBrand(@PathVariable Long id,
                                                           @RequestBody UpdateBrandRequestDto requestDto) {
        if (id == null) {
            return ResponseEntity.ok().build();
        }
        Brand updatedBrand = brandAdminService.updateBrand(id, requestDto);
        if (updatedBrand == null) {
            return ResponseEntity.notFound().build();
        }

        Long stylepointId = requestDto.getStylepointId();
        Map<String, Object> response = new HashMap<>();
        response.put("stylepointId", stylepointId);
        response.put("brand", updatedBrand);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/brand/{id}")
    public ResponseEntity<Void> deleteBrand(@PathVariable Long id) {
        brandAdminService.deleteBrand(id);
        return ResponseEntity.ok().build();
    }
}
