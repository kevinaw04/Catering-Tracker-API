package com.kevin.catering_tracker_api;
import com.kevin.catering_tracker_api.model.CateringOrder;
import com.kevin.catering_tracker_api.repository.CateringOrderRepository;
import com.kevin.catering_tracker_api.service.CateringOrderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.InjectMocks;
import java.util.Optional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;

public class CateringOrderServiceTest {
    @Mock
    private CateringOrderRepository repository;

    @InjectMocks
    private CateringOrderService service;
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createOrderWithInvalidNumberThrowsException() {
        CateringOrder order = new CateringOrder();
        order.setNumberOfPeople(-1);

        assertThrows(IllegalArgumentException.class,
                ()  -> service.createOrder(order));
    }
    @Test
    void createValidOrderReturnsSavedOrder() {
        CateringOrder order = new CateringOrder();
        order.setCustomerName("test");
        order.setNumberOfPeople(50);

        when(repository.save(order)).thenReturn(order);

        CateringOrder result = service.createOrder(order);
        assertEquals(order, result);

        verify(repository).save(order);
    }
    @Test
    void getOrderByIdReturnsExistingOrder() {
        Long id = 1L;
        CateringOrder order = new CateringOrder();
        order.setId(id);

        order.setCustomerName("test");
        when(repository.findById(id)).thenReturn(Optional.of(order));

        CateringOrder result = service.getOrderByID(id);

        assertEquals(order, result);

        verify(repository).findById(id);
    }
    @Test
    void getOrderByIdThrowsExceptionWhenOrderNotFound() {
        Long id = 99L;
        when(repository.findById(id)).thenReturn(Optional.empty());
        assertThrows(
                RuntimeException.class,
                () -> service.getOrderByID(id)
        );
        verify(repository).findById(id);
    }
    @Test
    void updateOrderUpdatesExistingOrder() {
        Long id = 1L;
        CateringOrder existingOrder = new CateringOrder();
        existingOrder.setId(id);
        existingOrder.setCustomerName("test");
        existingOrder.setNumberOfPeople(50);

        CateringOrder updatedOrder = new CateringOrder();
        updatedOrder.setCustomerName("test2");
        updatedOrder.setNumberOfPeople(70);

        when(repository.findById(id)).thenReturn(Optional.of(existingOrder));
        when(repository.save(existingOrder)).thenReturn(existingOrder);

        CateringOrder result = service.updateOrder(id, updatedOrder);

        assertEquals("test2", result.getCustomerName());
        assertEquals(70, result.getNumberOfPeople());

        verify(repository).findById(id);
        verify(repository).save(existingOrder);
    }
    @Test
    void getOrdersByPickupDateReturnsOrders() {
        LocalDate date = LocalDate.of(2026, 9, 20);
        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.atTime(LocalTime.MAX);

        CateringOrder order = new CateringOrder();
        order.setCustomerName("test");
        order.setPickupDate(LocalDateTime.of(2026, 9, 20, 7, 30));

        when(repository.findByPickupDateBetweenOrdersByPickupDateAsc(start, end)).thenReturn(List.of(order));

        List<CateringOrder> result = service.getOrdersByPickupDate(date);

        assertEquals(1, result.size());
        assertEquals(order, result.get(0));

        verify(repository).findByPickupDateBetweenOrdersByPickupDateAsc(start, end);
    }
}
