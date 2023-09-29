package com.thekey.stylekey.backend.service.admin;

import com.thekey.stylekey.backend.model.coordilook.entity.CoordiLook;
import com.thekey.stylekey.backend.model.coordilook.repository.CoordiLookRepository;
import com.thekey.stylekey.backend.model.stylepoint.entity.StylePoint;
import com.thekey.stylekey.backend.model.stylepoint.repository.StylePointRepository;
import com.thekey.stylekey.backend.service.admin.dto.CreateCoordiLookRequestDto;
import com.thekey.stylekey.backend.service.admin.dto.UpdateCoordiLookRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CoordiLookAdminServiceImpl implements CoordiLookAdminService {

    private final CoordiLookRepository coordiLookRepository;
    private final StylePointRepository stylePointRepository;

    @Override
    public CoordiLook createCoordiLook(CreateCoordiLookRequestDto requestDto) {
        StylePoint stylePoint = stylePointRepository.findById(requestDto.getStylepointId())
                .orElseThrow(() -> new EntityNotFoundException("StylePoint not found with id: " + requestDto.getStylepointId()));

        return coordiLookRepository.save(requestDto.toEntity(stylePoint));
    }

    @Override
    public Page<CoordiLook> findAll(Pageable pageable) {
        return coordiLookRepository.findAll(pageable);
    }

    @Override
    public CoordiLook findById(Long id) {
        return coordiLookRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("coordilook does not exist:" + id));
    }

    @Override
    @Transactional
    public CoordiLook updateCoordiLook(Long id, UpdateCoordiLookRequestDto requestDto) {
        CoordiLook coordiLook = coordiLookRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("coordilook does not exist: " + id));

        StylePoint stylePoint = stylePointRepository.findById(requestDto.getStylepointId())
                .orElseThrow(() -> new EntityNotFoundException("StylePoint not found with id: " + requestDto.getStylepointId()));

        coordiLook.update(requestDto.getTitle(), requestDto.getImage(), requestDto.toEntity(stylePoint).getStylepoint());
        return coordiLook;
    }

    @Override
    public void deleteCoordiLook(Long id) {
        coordiLookRepository.deleteById(id);

    }
}
