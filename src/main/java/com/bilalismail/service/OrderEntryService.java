package com.bilalismail.service;

import com.bilalismail.model.Order;
import com.bilalismail.model.OrderEntry;
import com.bilalismail.model.Product;
import com.bilalismail.model.User;
import com.bilalismail.repository.OrderEntryRepository;
import com.bilalismail.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderEntryService
{
    @Autowired
    private OrderEntryRepository repository;

    public OrderEntry addProduct(Order order, Product product){

        OrderEntry entry = repository.findByOrderAndProduct(order,product);

        if(entry==null)
        {
            entry = new OrderEntry(order, product);
            repository.save(entry);
        }

        return entry;
    }

    public void removeProduct(Order order, Product product){

        OrderEntry entry = repository.findByOrderAndProduct(order,product);

        if(entry!=null)
        {
            repository.delete(entry);
        }

    }


}
