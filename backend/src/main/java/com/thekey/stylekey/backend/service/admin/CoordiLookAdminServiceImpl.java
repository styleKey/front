package com.thekey.stylekey.backend.service.admin;

import com.thekey.stylekey.backend.common.ErrorMessage;
import com.thekey.stylekey.backend.model.coordilook.entity.CoordiLook;
import com.thekey.stylekey.backend.model.coordilook.repository.CoordiLookRepository;
import com.thekey.stylekey.backend.model.item.entity.Item;
import com.thekey.stylekey.backend.model.item.repository.ItemRepository;
import com.thekey.stylekey.backend.model.stylepoint.entity.StylePoint;
import com.thekey.stylekey.backend.model.stylepoint.repository.StylePointRepository;
import com.thekey.stylekey.backend.service.admin.dto.CreateCoordiLookRequestDto;
import com.thekey.stylekey.backend.service.admin.dto.UpdateCoordiLookRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CoordiLookAdminServiceImpl implements CoordiLookAdminService {

    private final CoordiLookRepository coordiLookRepository;
    private final StylePointRepository stylePointRepository;
    private final ItemRepository itemRepository;

    @Override
    public CoordiLook createCoordiLook(CreateCoordiLookRequestDto requestDto) {
        StylePoint stylePoint = findStylePoint(requestDto.getStylepointId());
        return coordiLookRepository.save(requestDto.toEntity(stylePoint));
    }

    @Override
    public List<CoordiLook> findAll() {
        return coordiLookRepository.findAll();
    }

    @Override
    public CoordiLook findById(Long id) {
        return findCoordiLook(id);
    }

    @Override
    @Transactional
    public CoordiLook updateCoordiLook(Long id, UpdateCoordiLookRequestDto requestDto) {
        CoordiLook coordiLook = findCoordiLook(id);
        StylePoint stylePoint = findStylePoint(requestDto.getStylepointId());

        coordiLook.update(requestDto.getTitle(), requestDto.getImage(),
                requestDto.toEntity(stylePoint).getStylepoint());

        return coordiLook;
    }

    @Override
    public void deleteCoordiLook(Long id) {
        coordiLookRepository.deleteById(id);
    }

    @Override
    public List<Item> getItemsByCoordiLookId(Long coordilookId) {
        CoordiLook coordiLook = findCoordiLook(coordilookId);
        return itemRepository.findByCoordilook(coordiLook);
    }

    private CoordiLook findCoordiLook(Long id) {
        return coordiLookRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(ErrorMessage.NOT_FOUND_COORDILOOK.get() + id));
    }

    private StylePoint findStylePoint(Long id) {
        return stylePointRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(ErrorMessage.NOT_FOUND_STYLEPOINT.get() + id));
    }
}
