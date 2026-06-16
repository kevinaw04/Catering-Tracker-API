package com.kevin.catering_tracker_api.service;

import com.kevin.catering_tracker_api.model.CateringOrder;
import com.kevin.catering_tracker_api.repository.CateringOrderRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CateringOrderService {
    private final CateringOrderRepository cateringOrderRepository;
    public CateringOrderService(CateringOrderRepository cateringOrderRepository) {
        this.cateringOrderRepository = cateringOrderRepository;
    }
    public List<CateringOrder> getAllOrders() {
        return cateringOrderRepository.findAll();
    }
    public CateringOrder createOrder(CateringOrder cateringOrder) {
        return cateringOrderRepository.save(cateringOrder);
    }

}
