package com.mpalourdio.html5;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import java.util.Arrays;

@SpringBootApplication
public class SpringBootAngularHTML5Application {

    public static void main(String... args) {
        ApplicationContext ctx = SpringApplication.run(SpringBootAngularHTML5Application.class, args);
        String[] beanNames = ctx.getBeanDefinitionNames();

        Arrays.stream(beanNames)
                .sorted()
                .forEach(System.out::println);
    }
}
