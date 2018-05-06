package com.bilalismail.service;

import com.bilalismail.model.Order;
import com.bilalismail.model.OrderEntry;
import com.bilalismail.model.Product;
import com.bilalismail.repository.OrderEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderEntryService
{
    @Autowired
    private OrderEntryRepository repository;

    @Autowired
    private SessionService sessionService;

    @Autowired
    private ProductService productService;

    public OrderEntry addProduct(Long productId){

        Order order = sessionService.getCurrentOrder();

        Product product = productService.findByProductId(productId);

        OrderEntry entry = repository.findByOrderAndProduct(order,product);

        if(entry==null)
        {
            entry = new OrderEntry(order, product);
            repository.save(entry);
        }

        return entry;
    }

    public void removeProduct(Long productId){

        Order order = sessionService.getCurrentOrder();

        Product product = productService.findByProductId(productId);

        OrderEntry entry = repository.findByOrderAndProduct(order,product);

        if(entry!=null)
        {
            repository.delete(entry);
        }

    }


}
