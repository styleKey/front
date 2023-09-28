package com.thekey.stylekey.backend.service.user;

import com.thekey.stylekey.backend.model.stylepoint.entity.StylePoint;

import java.util.List;

public interface StylePointUserService {

    // read only one
    StylePoint findById(Long id);

    // read all
    List<StylePoint> findAll();
}
