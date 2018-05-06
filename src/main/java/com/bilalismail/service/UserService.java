package com.bilalismail.service;

import com.bilalismail.model.User;
import com.bilalismail.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserService implements UserDetailsService
{
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException
    {
        return userRepository.findUserByEmail(email);
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserWithAuthoritiesByEmail(String email) {
        return userRepository.findOneWithAuthoritiesByEmail(email);
    }
}
