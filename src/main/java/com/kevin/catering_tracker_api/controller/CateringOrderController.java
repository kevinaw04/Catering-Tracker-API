package com.kevin.catering_tracker_api.controller;

import com.kevin.catering_tracker_api.model.CateringOrder;
import com.kevin.catering_tracker_api.service.CateringOrderService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/orders")
public class CateringOrderController {

    private final CateringOrderService cateringOrderService;

    public CateringOrderController(CateringOrderService cateringOrderService) {
        this.cateringOrderService = cateringOrderService;
    }
    @GetMapping("/date/{date}")
    public List<CateringOrder> getOrdersByPickupDate(@PathVariable LocalDate date){
        return cateringOrderService.getOrdersByPickupDate(date);
    }

    @GetMapping
    public List<CateringOrder> getAllOrders() {
        return cateringOrderService.getAllOrders();
    }
    @GetMapping("/{id}")
    public CateringOrder getOrderById(@PathVariable Long id) {
        return cateringOrderService.getOrderByID(id);
    }
    @PostMapping
    public CateringOrder createOrder(@RequestBody CateringOrder cateringOrder) {
        return cateringOrderService.createOrder(cateringOrder);
    }

    @PutMapping("/{id}")
    public CateringOrder updateOrder(@PathVariable Long id, @RequestBody CateringOrder updatedOrder) {
        return cateringOrderService.updateOrder(id, updatedOrder);
    }
    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id){
        cateringOrderService.deleteOrder(id);
    }
}
