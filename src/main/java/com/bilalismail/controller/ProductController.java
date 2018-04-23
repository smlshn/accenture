package com.bilalismail.controller;

import com.bilalismail.model.Product;
import com.bilalismail.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/product")
public class ProductController
{
    @Autowired
    private ProductService service;

    @GetMapping("/list")
    private List<Product> list(){
        return service.getAll();
    }
}
