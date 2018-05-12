package com.bilalismail.service;

import com.bilalismail.model.Order;
import com.bilalismail.model.OrderEntry;
import com.bilalismail.model.User;
import com.bilalismail.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class OrderService {
    @Autowired
    private OrderRepository repository;

    @Autowired
    private SessionService sessionService;

    @Transactional
    public Order findOrCreateOrder(User user) {

        Order order = null;
        try{
            order = repository.findByApprovedIsFalseAndSendToApproveIsFalseAndUser(user);
        }catch (Exception e){
            System.out.println(e);
        }

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

    public void sendToApprove(){
        Order order = sessionService.getCurrentOrder();
        if(order != null){
            order.setApproved(true);
            repository.save(order);
        }

    }

}
