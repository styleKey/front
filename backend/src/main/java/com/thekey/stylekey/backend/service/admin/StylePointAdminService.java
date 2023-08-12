package com.thekey.stylekey.backend.service.admin;

import com.thekey.stylekey.backend.model.brand.entity.Brand;
import com.thekey.stylekey.backend.model.coordilook.entity.CoordiLook;
import com.thekey.stylekey.backend.model.stylepoint.entity.StylePoint;
import com.thekey.stylekey.backend.service.admin.dto.UpdateStylePointRequestDto;

import java.util.List;

public interface StylePointAdminService {

    // read only one
    StylePoint findById(Long id);

    // read all
    List<StylePoint> findAll();

    // get a list of brands included in stylepoint id
    List<Brand> getBrandsByStylePointId(Long stylepointId);

    // update
    StylePoint updateStylePoint(Long stylepoinyId, UpdateStylePointRequestDto requestDto);

    // get a list of coordilook included in stylepoint id
    List<CoordiLook> getCoordilooksStylePointId(Long stylepointId);
}
