package com.thekey.stylekey.backend.controller.user;

import com.thekey.stylekey.backend.model.brand.entity.Brand;
import com.thekey.stylekey.backend.service.user.BrandUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/user")
public class UserBrandController {
    private final BrandUserService brandUserService;

    @GetMapping("/brands")
    public ResponseEntity<List<Brand>> getAllBrands() {
        List<Brand> brands = brandUserService.findAll();
        if (brands.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(brands);
        }
        return ResponseEntity.ok(brands);
    }

    @GetMapping("/brand/{id}")
    public ResponseEntity<Map<String, Object>> getBrandById(@PathVariable Long id) {
        Brand brand = brandUserService.findById(id);
        Long stylepointId = brand.getStylepoint().getId();

        Map<String, Object> response = new HashMap<>();
        response.put("brand", brand);
        response.put("stylepointId", stylepointId);

        if(brand == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);

    }

    @GetMapping("/brand/stylepoint/{stylepointId}")
    public ResponseEntity<List<Brand>> getBrandByStylepointId(@PathVariable Long stylepointId) {
        return ResponseEntity.ok(brandUserService.findBrandByStylepointId(stylepointId));
    }

}
