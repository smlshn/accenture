package com.bilalismail.service;

import com.bilalismail.model.Order;
import com.bilalismail.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.WebApplicationContext;

@Service
@Scope(WebApplicationContext.SCOPE_SESSION)
public class SessionService
{
    @Autowired
    private OrderService orderService;

    private Order order;


    public void initalize(){

        if(order!=null)
            throw new RuntimeException("Service already initalized");

        order = orderService.findOrCreateOrder(getCurrentUser());
    }

    public Order getCurrentOrder(){

        if(order==null){
            order = orderService.findOrCreateOrder(getCurrentUser());
        }
        return order;
    }

    public User getCurrentUser() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        return (User) securityContext.getAuthentication().getPrincipal();
    }
}
