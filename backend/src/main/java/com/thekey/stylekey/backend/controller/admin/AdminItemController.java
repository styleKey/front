package com.thekey.stylekey.backend.controller.admin;

import com.thekey.stylekey.backend.model.item.entity.Item;
import com.thekey.stylekey.backend.service.admin.ItemAdminService;
import com.thekey.stylekey.backend.service.admin.dto.CreateItemRequestDto;
import com.thekey.stylekey.backend.service.admin.dto.UpdateItemRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminItemController {

    private final ItemAdminService itemAdminService;

    // Read All
    @GetMapping("/items")
    public ResponseEntity<List<Item>> getAllItems() {
        List<Item> itemsPage = itemAdminService.findAll();
        if (itemsPage.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(itemsPage);
        }
        return ResponseEntity.ok(itemsPage);
    }

    // Read Only One By ID
    @GetMapping("/item/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        Item item = itemAdminService.findById(id);
        if (item == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(item);
    }

    // Create
    @PostMapping("/item/create")
    public ResponseEntity<Item> createItem(@RequestBody CreateItemRequestDto requestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(itemAdminService.createItem(requestDto));
    }

    // Update
    @PutMapping("/item/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody UpdateItemRequestDto requestDto) {
        if (id == null) {
            return ResponseEntity.ok().build();
        }

        Item updatedItem = itemAdminService.updateItem(id, requestDto);
        if (updatedItem == null) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.ok(updatedItem);
    }

    // Delete
    @DeleteMapping("/item/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemAdminService.deleteItem(id);
        return ResponseEntity.ok().build();
    }
}
