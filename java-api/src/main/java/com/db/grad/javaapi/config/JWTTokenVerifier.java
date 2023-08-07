package com.db.grad.javaapi.config;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Service;


public class JWTTokenVerifier {

    private final String secret;

    public JWTTokenVerifier(String secret) {
        this.secret = secret;
    }

    public boolean verify(String token) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        } catch (SignatureException e) {
            // Invalid signature
            return false;
        } catch (MalformedJwtException e) {
            // Invalid JWT token
            return false;
        } catch (ExpiredJwtException e) {
            // JWT token has expired
            return false;
        }
    }

    public String getUsername(String token) {
        try {
            Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
            return claims.getSubject();
        } catch (SignatureException e) {
            // Invalid signature
            return null;
        } catch (MalformedJwtException e) {
            // Invalid JWT token
            return null;
        } catch (ExpiredJwtException e) {
            // JWT token has expired
            return null;
        }
    }

}
