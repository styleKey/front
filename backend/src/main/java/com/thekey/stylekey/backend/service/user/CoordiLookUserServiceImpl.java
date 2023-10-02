package com.thekey.stylekey.backend.service.user;

import com.thekey.stylekey.backend.model.coordilook.entity.CoordiLook;
import com.thekey.stylekey.backend.model.coordilook.repository.CoordiLookRepository;
import com.thekey.stylekey.backend.model.item.entity.Item;
import com.thekey.stylekey.backend.model.item.repository.ItemRepository;
import com.thekey.stylekey.backend.model.stylepoint.entity.StylePoint;
import com.thekey.stylekey.backend.model.stylepoint.repository.StylePointRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CoordiLookUserServiceImpl implements CoordiLookUserService {

    private final CoordiLookRepository coordiLookRepository;
    private final ItemRepository itemRepository;
    private final StylePointRepository stylePointRepository;

    @Override
    public List<CoordiLook> findAll() {
        return coordiLookRepository.findAll();
    }

    @Override
    public CoordiLook findById(Long id) {
        return coordiLookRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("coordilook does not exist:" + id));
    }

    @Override
    public List<CoordiLook> findCoordiLooksByStylepointId(Long stylepointId) {
        StylePoint stylePoint = stylePointRepository.findById(stylepointId)
                .orElseThrow(() -> new IllegalArgumentException("strylepoint does not exist: " + stylepointId));
        return coordiLookRepository.findByStylepoint(stylePoint);
    }

    @Override
    public List<Item> getItemsByCoordiLookId(Long coordilookId) {
        CoordiLook coordiLook = coordiLookRepository.findById(coordilookId)
                .orElseThrow(() -> new IllegalArgumentException("coordilook does not exist:" + coordilookId));

        return itemRepository.findByCoordilook(coordiLook);
    }

}