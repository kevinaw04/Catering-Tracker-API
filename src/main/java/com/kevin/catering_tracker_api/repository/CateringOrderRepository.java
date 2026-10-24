package com.kevin.catering_tracker_api.repository;
import com.kevin.catering_tracker_api.model.CateringOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface CateringOrderRepository extends JpaRepository<CateringOrder, Long> {
    List<CateringOrder> findByPickupDateBetweenOrderByPickupDateAsc(LocalDateTime start, LocalDateTime end);
}
