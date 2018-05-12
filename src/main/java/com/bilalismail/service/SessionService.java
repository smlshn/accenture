package com.bilalismail.service;

import com.bilalismail.model.Order;
import com.bilalismail.model.User;
import com.bilalismail.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

@Service
@Scope(scopeName = WebApplicationContext.SCOPE_SESSION, proxyMode= ScopedProxyMode.TARGET_CLASS)
public class SessionService
{
    @Autowired
    private OrderService orderService;

    private Order order;

    @Autowired
    private UserRepository user;

    public void initalize(){

        if(order!=null)
            throw new RuntimeException("Service already initalized");

        order = orderService.findOrCreateOrder(getCurrentUser());
    }

    @Transactional
    public Order getCurrentOrder(){

        if(order==null){
            order = orderService.findOrCreateOrder(getCurrentUser());
        }
        return order;
    }

    public User getCurrentUser() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        return user.findUserByEmail("bilalmacit@gmail.com");
        //return (User) securityContext.getAuthentication().getPrincipal();
    }
}
