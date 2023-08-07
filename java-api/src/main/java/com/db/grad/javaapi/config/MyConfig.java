package com.db.grad.javaapi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class MyConfig {

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public String jwtSecret() {
        return "mysecret";
    }

    @Bean
    public JWTTokenVerifier jwtTokenVerifier() {
        return new JWTTokenVerifier(jwtSecret());
    }

    @Bean
    public JWTTokenGenerator jwtTokenGenerator(){
        return new JWTTokenGenerator(jwtSecret());
    }

}
