package com.bilalismail.service;

import com.bilalismail.model.Order;
import com.bilalismail.model.OrderEntry;
import com.bilalismail.model.Product;
import com.bilalismail.repository.OrderEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

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

    @Transactional
    public void emptyOrdersEntry(){
        Order order = sessionService.getCurrentOrder();
        if(order != null){
            Set<OrderEntry> orderEntries = order.getEntries();
            repository.deleteAll(orderEntries);
        }
    }

}
