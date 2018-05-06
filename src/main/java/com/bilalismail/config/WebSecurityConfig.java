package com.bilalismail.config;

import com.bilalismail.service.UserService;
import org.springframework.beans.factory.BeanInitializationException;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserService userService;

    private final CorsFilter corsFilter;


    public WebSecurityConfig(UserService userService, CorsFilter corsFilter) {

        this.userService = userService;
        this.corsFilter = corsFilter;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new CustomPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new
                UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
        return source;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception
    {
        http
                .addFilterBefore(corsFilter, FilterSecurityInterceptor.class)
                .formLogin()
                .loginProcessingUrl("/api/authentication")
                .passwordParameter("password")
                .usernameParameter("username")

                .successHandler((req, res, auth)->{
                    res.setStatus(200);
                }).and()

                .cors().and()

                // starts authorizing configurations
                .authorizeRequests()
                    .antMatchers("/api/supplier").hasRole("SUPPLIER")
                    .antMatchers("/api/product").hasAnyAuthority("CUSTOMER","SUPPLIER")
                    .antMatchers("/api/service1").hasAnyAuthority("CUSTOMER","SUPPLIER")

                // ignoring the guest's urls "
                .antMatchers("/api/authentication", "/api/logout").permitAll()

                // authenticate all remaining URLS
                .anyRequest().fullyAuthenticated().and()


                /* "/logout" will log the user out by invalidating the HTTP Session,
                 * cleaning up any {link rememberMe()} authentication that was configured, */
                .logout().permitAll()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout", "POST")).and()

                // enabling the basic authentication
                .httpBasic().and()

                // configuring the session on the server
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED).and()

                // disabling the CSRF - Cross Site Request Forgery
                .csrf().disable();
    }
}

