package com.bilalismail;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.Arrays;

@SpringBootApplication
@EnableTransactionManagement
public class Application
{

    public static void main(String... args) {
        ApplicationContext ctx = SpringApplication.run(Application.class, args);
        String[] beanNames = ctx.getBeanDefinitionNames();

        //Arrays.stream(beanNames).sorted().forEach(System.out::println);
    }

    //@Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedMethods("GET", "POST", "PUT", "DELETE").allowedOrigins("http://localhost:4200")
                        .allowedHeaders("*");
            }
        };
    }
}
