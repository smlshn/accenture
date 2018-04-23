package com.bilalismail.config;

import com.bilalismail.service.UserService;
import org.springframework.beans.factory.BeanInitializationException;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.PostConstruct;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    private final UserService userService;

    public WebSecurityConfig(AuthenticationManagerBuilder authenticationManagerBuilder, UserService userService) {

        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.userService = userService;
    }

    @PostConstruct
    public void init() {
        try {
            authenticationManagerBuilder
                    .userDetailsService(userService)
                    .passwordEncoder(passwordEncoder());
        } catch (Exception e) {
            throw new BeanInitializationException("Security configuration failed", e);
        }
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new CustomPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        System.out.println("------------------");
        http
                .csrf().disable()

                .formLogin()
                .loginProcessingUrl("/api/authentication")
                .usernameParameter("username")
                .passwordParameter("password")
                .permitAll()
            .and()
                .logout()
                .logoutUrl("/api/logout")
                .permitAll()
            .and()
                .headers()
                .frameOptions()
                .disable()
            .and()
                .authorizeRequests()
                .antMatchers("/api/admin").hasRole("ADMIN")
                .antMatchers("/api/product").hasAnyAuthority("CUSTOMER","ADMIN")
                .antMatchers("/api/service1").hasAnyAuthority("CUSTOMER","ADMIN")
                .antMatchers("/api/**").authenticated();

    }
}
