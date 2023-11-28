package com.thekey.stylekey.backend.controller.admin;

import com.thekey.stylekey.backend.model.item.entity.Item;
import com.thekey.stylekey.backend.service.admin.ItemAdminService;
import com.thekey.stylekey.backend.service.admin.dto.CreateItemRequestDto;
import com.thekey.stylekey.backend.service.admin.dto.UpdateItemRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminItemController {

    private final ItemAdminService itemAdminService;

    @GetMapping("/items")
    public ResponseEntity<List<Item>> getAllItems() {
        List<Item> items = itemAdminService.findAll();

        if (items.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(items);
        }
        return ResponseEntity.ok(items);
    }

    @GetMapping("/item/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        Item item = itemAdminService.findById(id);

        if (isNull(item)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(item);
    }

    @PostMapping("/item/create")
    public ResponseEntity<Item> createItem(@RequestBody CreateItemRequestDto requestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(itemAdminService.createItem(requestDto));
    }

    @PutMapping("/item/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody UpdateItemRequestDto requestDto) {
        if (id == null) {
            return ResponseEntity.ok().build();
        }

        Item updatedItem = itemAdminService.updateItem(id, requestDto);

        if (isNull(updatedItem)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.ok(updatedItem);
    }

    @DeleteMapping("/item/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemAdminService.deleteItem(id);
        return ResponseEntity.ok().build();
    }

    private boolean isNull(Item item) {
        return item == null;
    }
}
