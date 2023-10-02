package com.thekey.stylekey.backend.controller.user;

import com.thekey.stylekey.backend.model.coordilook.entity.CoordiLook;
import com.thekey.stylekey.backend.model.item.entity.Item;
import com.thekey.stylekey.backend.service.user.CoordiLookUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
@RequestMapping("/user")
public class UserCoordilookController {

    private final CoordiLookUserService coordiLookUserService;

    @GetMapping("/coordilooks")
    public ResponseEntity<List<CoordiLook>> getAllCoordiLooks() {
        List<CoordiLook> CoordiLooks = coordiLookUserService.findAll();
        if (CoordiLooks.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(CoordiLooks);
        }
        return ResponseEntity.ok(CoordiLooks);
    }

    @GetMapping("/coordilook/{id}")
    public ResponseEntity<Map<String, Object>> getCoordiLookById(@PathVariable Long id) {
        CoordiLook coordiLook = coordiLookUserService.findById(id);
        List<Item> items = coordiLookUserService.getItemsByCoordiLookId(id);
        Long stylepointId = coordiLook.getStylepoint().getId();

        Map<String, Object> response = new HashMap<>();
        response.put("coordiLook", coordiLook);
        response.put("items", items);
        response.put("stylepointId: ", stylepointId);

        if (coordiLook == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/coordilook/stylepoint/{stylepointId}")
    public ResponseEntity<List<CoordiLook>> getCoordiLookByStyelpointId(@PathVariable Long stylepointId) {
        return ResponseEntity.ok(coordiLookUserService.findCoordiLooksByStylepointId(stylepointId));
    }


}
