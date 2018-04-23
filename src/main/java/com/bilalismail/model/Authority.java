package com.bilalismail.model;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "authority")
public class Authority extends BaseModel implements GrantedAuthority
{
    @Column(name="name")
    private String name;

    @Override
    public String getAuthority()
    {
        return getName();
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }
}
