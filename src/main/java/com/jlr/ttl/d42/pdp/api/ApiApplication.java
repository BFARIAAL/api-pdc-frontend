package com.jlr.ttl.d42.pdp.api;

import jakarta.servlet.ServletContext;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import org.thymeleaf.templateresolver.UrlTemplateResolver;

@SpringBootApplication
public class ApiApplication {



	public static void main(String[] args) {

		SpringApplication.run(ApiApplication.class, args);

	}

}
