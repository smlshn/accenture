package com.bilalismail.controller;

import com.bilalismail.model.Order;
import com.bilalismail.service.OrderEntryService;
import com.bilalismail.service.OrderService;
import com.bilalismail.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController
{
    @Autowired
    private SessionService sessionService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderEntryService orderEntryService;

    @GetMapping("/to-be-approved")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<Order> getAllToBeApproved(){
        return orderService.getAllOrdersToBeApproved();
    }

    @GetMapping("/my-order")
    public Order getOrder(){
        return sessionService.getCurrentOrder();
    }

    @GetMapping("/product/{productId}/add")
    public void addProductOrder(@PathVariable Long productId){
        orderEntryService.addProduct(productId);
    }

    @GetMapping("/product/{productId}/remove")
    public void removeProduct(@PathVariable Long productId){
        orderEntryService.removeProduct(productId);
    }

    @GetMapping("/order-entries/empty")
    public void emptyOrdersEntries(){
        orderEntryService.emptyOrdersEntry();
    }

    @GetMapping("/send-to-approve")
    public void sendToApprove(){
        orderService.sendToApprove();
    }
}
