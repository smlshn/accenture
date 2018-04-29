package com.bilalismail.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="order_table")//order is reserved word
public class Order extends BaseModel
{
    @ManyToOne(optional = false)
    @JoinColumn(name="user_id")
    private User user;

    @OneToMany(mappedBy = "order")
    private Set<OrderEntry> entries = new HashSet<>();

    @Column(name="send_to_approve")
    private Boolean sendToApprove = Boolean.FALSE;

    @Column(name="approved")
    private Boolean approved = Boolean.FALSE;

    public Order(User user)
    {
        this.user = user;
    }

    public User getUser()
    {
        return user;
    }

    public void setUser(User user)
    {
        this.user = user;
    }

    public Set<OrderEntry> getEntries()
    {
        return entries;
    }

    public void setEntries(Set<OrderEntry> entries)
    {
        this.entries = entries;
    }

    public Boolean getApproved()
    {
        return approved;
    }

    public void setApproved(Boolean approved)
    {
        this.approved = approved;
    }
}
