package com.thekey.stylekey.backend.service.admin;

import com.thekey.stylekey.backend.model.coordilook.entity.CoordiLook;
import com.thekey.stylekey.backend.model.item.entity.Item;
import com.thekey.stylekey.backend.service.admin.dto.CreateCoordiLookRequestDto;
import com.thekey.stylekey.backend.service.admin.dto.UpdateCoordiLookRequestDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CoordiLookAdminService {

    // create
    CoordiLook createCoordiLook(CreateCoordiLookRequestDto requestDto);

    // read All
    Page<CoordiLook> findAll(Pageable pageable);

    // read only one
    CoordiLook findById(Long id);

    // update
    CoordiLook updateCoordiLook(Long id, UpdateCoordiLookRequestDto requestDto);

    // delete
    void deleteCoordiLook(Long id);

    List<Item> getItemsByCoordiLookId(Long coordilookId);
}
