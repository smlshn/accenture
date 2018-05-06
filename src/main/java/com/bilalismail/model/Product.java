package com.bilalismail.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name="product")
public class Product extends BaseModel
{
    @Column(name="name")
    private String name;

    @Lob
    @Size(max = 16777215)
    @Column(name = "image", length = 256)
    private byte[] image;

    public Product(String name, @Size(max = 16777215) byte[] image) {
        this.name = name;
        this.image = image;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public byte[] getImage()
    {
        return image;
    }

    public void setImage(byte[] image)
    {
        this.image = image;
    }
}
