package com.bilalismail.repository;

import com.bilalismail.model.Order;
import com.bilalismail.model.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends BaseRepository<Order>
{
    Order findByApprovedIsFalseAndSendToApproveIsFalseAndUser(User user);

    List<Order> findAllByApprovedIsFalseAndSendToApproveIsTrue();
}
