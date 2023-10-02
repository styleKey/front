package com.thekey.stylekey.backend.service.user;

import com.thekey.stylekey.backend.model.coordilook.entity.CoordiLook;
import com.thekey.stylekey.backend.model.item.entity.Item;

import java.util.List;

public interface CoordiLookUserService {
    List<CoordiLook> findAll();
    CoordiLook findById(Long id);
    List<CoordiLook> findCoordiLooksByStylepointId(Long stylepointId);
    List<Item> getItemsByCoordiLookId(Long coordilookId);
}
