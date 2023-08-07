package com.db.grad.javaapi.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;



public class JWTTokenGenerator {
    private final String secret;

    public JWTTokenGenerator(String secret) {
        this.secret = secret;
    }

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }
}