package com.bilalismail.model;

import javax.persistence.*;

@Entity
@Table(name = "order_entries")
public class OrderEntry extends BaseModel
{


    @ManyToOne(optional = false)
    @JoinColumn(name="order_id")
    private Order order;

    @ManyToOne(optional = false)
    @JoinColumn(name="product_id")
    private Product product;

    public OrderEntry(Order order, Product product)
    {
        this.order = order;
        this.product = product;
    }

    public Order getOrder()
    {
        return order;
    }

    public void setOrder(Order order)
    {
        this.order = order;
    }

    public Product getProduct()
    {
        return product;
    }

    public void setProduct(Product product)
    {
        this.product = product;
    }
}
