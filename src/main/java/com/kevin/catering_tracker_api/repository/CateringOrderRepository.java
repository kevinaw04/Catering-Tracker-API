package com.kevin.catering_tracker_api.repository;
import com.kevin.catering_tracker_api.model.CateringOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CateringOrderRepository extends JpaRepository<CateringOrder, Long> {
}
