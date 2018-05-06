package com.bilalismail.service;

import com.bilalismail.model.Order;
import com.bilalismail.model.User;
import com.bilalismail.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository repository;

    public Order findOrCreateOrder(User user) {

        Order order = repository.findByApprovedIsFalseAndSendToApproveIsFalseAndUser(user);

        if (order == null) {
            order = new Order(user);
            repository.save(order);
        }

        return order;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Order approveOrder(Order order) {

        order.setApproved(Boolean.TRUE);
        return repository.save(order);
    }

    public List<Order> getAllOrdersToBeApproved() {
        return repository.findAllByApprovedIsFalseAndSendToApproveIsTrue();
    }

}
