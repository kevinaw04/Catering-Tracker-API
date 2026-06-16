package com.kevin.catering_tracker_api.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity
public class CateringOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String customerName;
    private String customerPhone;
    private String cashierName;
    private LocalDateTime datePlaced;
    private LocalDateTime pickupDate;
    private Integer numberOfPeople;

    @Column(length = 2000)
    private String orderDetails;
    private boolean paid;
    private boolean completed;
    @Column(length = 1000)
    private String notes;
    public CateringOrder() {}
    public CateringOrder(Long id, String customerName, String customerPhone, String cashierName, LocalDateTime datePlaced, LocalDateTime pickupDate, Integer numberOfPeople, String orderDetails, boolean paid, boolean completed, String notes) {
        this.id = id;
        this.customerName = customerName;
        this.customerPhone = customerPhone;
        this.cashierName = cashierName;
        this.datePlaced = datePlaced;
        this.pickupDate = pickupDate;
        this.numberOfPeople = numberOfPeople;
        this.orderDetails = orderDetails;
        this.paid = paid;
        this.completed = completed;
        this.notes = notes;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getCustomerName() {
        return customerName;
    }
    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
    public String getCustomerPhone() {
        return customerPhone;
    }
    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }
    public String getCashierName() {
        return cashierName;
    }

    public void setCashierName(String cashierName) {
        this.cashierName = cashierName;
    }
    public LocalDateTime getDatePlaced() {
        return datePlaced;
    }
    public void setDatePlaced(LocalDateTime datePlaced) {
        this.datePlaced = datePlaced;
    }
    public LocalDateTime getPickupDate() {
        return pickupDate;
    }
    public void setPickupDate(LocalDateTime pickupDate) {
        this.pickupDate = pickupDate;
    }
    public Integer getNumberOfPeople() {
        return numberOfPeople;
    }
    public void setNumberOfPeople(Integer numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }
    public String getOrderDetails() {
        return orderDetails;
    }
    public void setOrderDetails(String orderDetails) {
        this.orderDetails = orderDetails;

    }
    public boolean isPaid() {
        return paid;
    }
    public void setPaid(boolean paid) {
        this.paid = paid;
    }
    public boolean isCompleted() {
        return completed;
    }
    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
    public String getNotes() {
        return notes;
    }
    public void setNotes(String notes) {
        this.notes = notes;
    }

}
