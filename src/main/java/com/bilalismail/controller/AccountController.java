package com.bilalismail.controller;

import com.bilalismail.SecurityUtils;
import com.bilalismail.model.Order;
import com.bilalismail.model.User;
import com.bilalismail.service.UserService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/account")
public class AccountController
{
    @Autowired
    UserService userService;

    @GetMapping
    public Optional<User> get(){
        return userService.getUserWithAuthoritiesByEmail(SecurityUtils.getCurrentUserLogin().get());
    }
}
