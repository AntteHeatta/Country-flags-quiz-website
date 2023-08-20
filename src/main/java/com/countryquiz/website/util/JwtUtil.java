package com.countryquiz.website.util;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

/**
 * The JwtUtil class provides utility methods for working with JWT (JSON Web
 * Tokens) in the application.
 * It is responsible for token generation, validation, and extracting
 * information from tokens.
 */
@Service
public class JwtUtil {

    private final String SECRET_KEY = "ThisIsAStrongKeyThatIsAtLeast32CharactersLong";
    SecretKey secretKey = new SecretKeySpec(SECRET_KEY.getBytes(StandardCharsets.UTF_8), "HmacSHA256");

    /**
     * Extracts the username from a JWT token.
     *
     * @param token The JWT token from which to extract the username.
     * @return The username extracted from the token.
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(Date.from(Instant.now()));
    }

    /**
     * Generates a JWT token for a user.
     *
     * @param userDetails The UserDetails containing user information.
     * @return The generated JWT token.
     */
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        Date exprirationDate = new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10);
        Date currentDate = new Date(System.currentTimeMillis());

        return Jwts.builder().setClaims(claims).setSubject(subject)
                .setIssuedAt(currentDate)
                .setExpiration(exprirationDate)
                .signWith(secretKey)
                .compact();
    }

    /**
     * Validates a JWT token to ensure it matches the user's details and is not
     * expired.
     *
     * @param token       The JWT token to be validated.
     * @param userDetails The UserDetails containing user information.
     * @return true if the token is valid and matches the user's details; false
     *         otherwise.
     */
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }
}
