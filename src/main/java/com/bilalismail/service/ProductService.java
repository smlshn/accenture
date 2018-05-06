package com.bilalismail.service;

import com.bilalismail.model.Product;
import com.bilalismail.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService
{
    @Autowired
    private ProductRepository repository;

    public List<Product> getAll(){
        return repository.findAll();
    }

    public Product findByProductId(Long productId){
        return this.repository.findById(productId).get();
    }

    public void addProduct(byte[] image, String productName){
        Product product = new Product(productName, image);
        repository.save(product);
    }
}
