package com.kevin.catering_tracker_api.controller;

import com.kevin.catering_tracker_api.model.CateringOrder;
import com.kevin.catering_tracker_api.service.CateringOrderService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/orders")
public class CateringOrderController {

    private final CateringOrderService cateringOrderService;

    public CateringOrderController(CateringOrderService cateringOrderService) {
        this.cateringOrderService = cateringOrderService;
    }

    @GetMapping
    public List<CateringOrder> getAllOrders() {
        return cateringOrderService.getAllOrders();
    }
    @PostMapping
    public CateringOrder createOrder(@RequestBody CateringOrder cateringOrder) {
        return cateringOrderService.createOrder(cateringOrder);
    }
}
