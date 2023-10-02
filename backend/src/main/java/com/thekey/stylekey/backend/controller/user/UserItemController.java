package com.thekey.stylekey.backend.controller.user;

import com.thekey.stylekey.backend.model.coordilook.entity.CoordiLook;
import com.thekey.stylekey.backend.model.coordilook.repository.CoordiLookRepository;
import com.thekey.stylekey.backend.model.item.entity.Item;
import com.thekey.stylekey.backend.service.user.ItemUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserItemController {

    private final ItemUserService itemUserService;
    private final CoordiLookRepository coordiLookRepository;

    @GetMapping("/items")
    public ResponseEntity<List<Item>> getAllItems() {
        List<Item> items = itemUserService.findAll();
        if (items.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(items);
        }
        return ResponseEntity.ok(items);
    }

    @GetMapping("/item/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        Item item = itemUserService.findById(id);

        if (item == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(item);
    }

    @GetMapping("/item/coordilook/{coordilookId}")
    public ResponseEntity<Map<String,Object>> getItemByCoordilookId(@PathVariable Long coordilookId) {
        List<Item> items = itemUserService.findItemByCoordiLookId(coordilookId);
        CoordiLook coordiLook = coordiLookRepository.findById(coordilookId)
                .orElseThrow(() -> new IllegalArgumentException("coordilook does not exist: " + coordilookId));
        Long stylepointId = coordiLook.getStylepoint().getId();

        Map<String, Object> response = new HashMap<>();
        response.put("items", items);
        response.put("coordilookId", coordilookId);
        response.put("stylepointId: ", stylepointId);

        if (coordiLook == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/item/brand/{brandId}")
    public ResponseEntity<List<Item>> getItemByBrandId(@PathVariable Long brandId) {
        return ResponseEntity.ok(itemUserService.findItemByBrandId(brandId));
    }
}
