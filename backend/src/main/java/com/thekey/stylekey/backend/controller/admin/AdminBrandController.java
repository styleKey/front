package com.thekey.stylekey.backend.controller.admin;

import com.thekey.stylekey.backend.model.brand.entity.Brand;
import com.thekey.stylekey.backend.model.item.entity.Item;
import com.thekey.stylekey.backend.service.admin.BrandAdminService;
import com.thekey.stylekey.backend.service.admin.dto.CreateBrandRequestDto;
import com.thekey.stylekey.backend.service.admin.dto.UpdateBrandRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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

    // Read All
    @GetMapping("/brands")
    public ResponseEntity<Page<Brand>> getAllBrands(@PageableDefault(size = 10) Pageable pageable) {
        Page<Brand> brandsPage = brandAdminService.findAll(pageable);
        if (brandsPage.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(brandsPage);
        }

        return ResponseEntity.ok(brandsPage);
    }

    // Read Only One By ID
    @GetMapping("/brand/{id}")
    public ResponseEntity<Map<String, Object>> getBrandById(@PathVariable Long id) {
        Brand brand = brandAdminService.findById(id);
        List<Item> items =  brandAdminService.getItemsByBrandId(id);

        Map<String, Object> response = new HashMap<>();
        response.put("brand", brand);
        response.put("item", items);

        if (brand == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);

    }

    // Create
    @PostMapping("/brand/create")
    public ResponseEntity<Brand> createBrand(@RequestBody CreateBrandRequestDto requestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(brandAdminService.createBrand(requestDto));
    }

    // Update
    @PutMapping("/brand/{id}")
    public ResponseEntity<Brand> updateBrand(@PathVariable Long id, @RequestBody UpdateBrandRequestDto requestDto) {
        if (id == null) {
            return ResponseEntity.ok().build();
        }

        Brand updatedBrand = brandAdminService.updateBrand(id, requestDto);
        if (updatedBrand == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedBrand);
    }

    // Delete
    @DeleteMapping("/brand/{id}")
    public ResponseEntity<Void> deleteBrand(@PathVariable Long id) {

        brandAdminService.deleteBrand(id);
        return ResponseEntity.ok().build();
    }
}
