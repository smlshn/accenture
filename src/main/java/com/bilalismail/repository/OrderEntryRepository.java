package com.bilalismail.repository;

import com.bilalismail.model.Order;
import com.bilalismail.model.OrderEntry;
import com.bilalismail.model.Product;
import com.bilalismail.model.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderEntryRepository extends BaseRepository<OrderEntry>
{
    OrderEntry findByOrderAndProduct(Order order, Product product);
}
