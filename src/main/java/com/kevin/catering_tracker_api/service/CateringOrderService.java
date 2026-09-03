package com.kevin.catering_tracker_api.service;

import com.kevin.catering_tracker_api.model.CateringOrder;
import com.kevin.catering_tracker_api.repository.CateringOrderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
        if(cateringOrder.getNumberOfPeople() == null || cateringOrder.getNumberOfPeople() <= 0){
            throw new IllegalArgumentException("Number of people must be greater than 0");
        }
        return cateringOrderRepository.save(cateringOrder);


    }
    public CateringOrder getOrderByID(Long id) {
        return cateringOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }
    public CateringOrder updateOrder(Long id, CateringOrder updatedOrder){
        CateringOrder existingOrder = cateringOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        existingOrder.setCustomerName(updatedOrder.getCustomerName());
        existingOrder.setCustomerPhone(updatedOrder.getCustomerPhone());
        existingOrder.setCashierName(updatedOrder.getCashierName());
        existingOrder.setDatePlaced(updatedOrder.getDatePlaced());
        existingOrder.setPickupDate(updatedOrder.getPickupDate());
        existingOrder.setNumberOfPeople(updatedOrder.getNumberOfPeople());
        existingOrder.setOrderDetails(updatedOrder.getOrderDetails());
        existingOrder.setPaid(updatedOrder.isPaid());
        existingOrder.setCompleted(updatedOrder.isCompleted());
        existingOrder.setNotes(updatedOrder.getNotes());

        return cateringOrderRepository.save(existingOrder);
    }
    public void deleteOrder(Long id) {
        CateringOrder existingOrder = cateringOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        cateringOrderRepository.delete(existingOrder);
    }
    public List<CateringOrder> getOrdersByPickupDate(LocalDate date){
        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.atTime(23, 59, 59);

        return cateringOrderRepository.findByPickupDateBetween(start, end);
    }

}
