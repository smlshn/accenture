package com.bilalismail.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="order_table")//order is reserved word
public class Order extends BaseModel
{
    @JsonIgnoreProperties("user")
    @ManyToOne(optional = false)
    @JoinColumn(name="user_id")
    private User user;

    @JsonManagedReference
    @OneToMany(mappedBy = "order")
    private Set<OrderEntry> entries = new HashSet<>();

    @Column(name="send_to_approve")
    private Boolean sendToApprove = Boolean.FALSE;

    @Column(name="approved")
    private Boolean approved = Boolean.FALSE;

    public Order() {
    }

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
