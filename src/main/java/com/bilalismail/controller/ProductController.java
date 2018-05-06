package com.bilalismail.controller;

import com.bilalismail.model.Product;
import com.bilalismail.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/product")
public class ProductController
{
    @Autowired
    private ProductService service;

    @GetMapping("/list")
    public List<Product> list(){
        return service.getAll();
    }

    @PostMapping("/{productName}/add")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void addProduct(@RequestBody byte[] image, @RequestParam String productName){
        service.addProduct(image, productName);
    }
}
