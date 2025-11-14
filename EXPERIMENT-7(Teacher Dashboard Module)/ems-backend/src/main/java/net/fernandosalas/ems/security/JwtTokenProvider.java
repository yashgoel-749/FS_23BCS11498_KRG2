package net.fernandosalas.ems.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    private SecretKey getSigningKey() {
        try {
            byte[] keyBytes;
            
            // Check if secret is a hex string (even length and hex characters)
            if (secret != null && secret.length() >= 64 && secret.matches("[0-9A-Fa-f]+")) {
                // Hex string - decode it
                keyBytes = hexStringToByteArray(secret);
            } else {
                // Regular string - use UTF-8 bytes
                keyBytes = secret.getBytes(java.nio.charset.StandardCharsets.UTF_8);
            }
            
            // Ensure secret is at least 256 bits (32 bytes) for HS256
            if (keyBytes.length < 32) {
                // Repeat the key to reach minimum length
                byte[] paddedKey = new byte[32];
                for (int i = 0; i < 32; i++) {
                    paddedKey[i] = keyBytes[i % keyBytes.length];
                }
                return Keys.hmacShaKeyFor(paddedKey);
            } else if (keyBytes.length > 32) {
                // Truncate to 32 bytes if longer
                byte[] truncatedKey = new byte[32];
                System.arraycopy(keyBytes, 0, truncatedKey, 0, 32);
                return Keys.hmacShaKeyFor(truncatedKey);
            }
            
            return Keys.hmacShaKeyFor(keyBytes);
        } catch (Exception e) {
            // Fallback: use the secret as-is, padded to 32 bytes
            byte[] keyBytes = secret.getBytes(java.nio.charset.StandardCharsets.UTF_8);
            byte[] paddedKey = new byte[32];
            for (int i = 0; i < 32; i++) {
                paddedKey[i] = (i < keyBytes.length) ? keyBytes[i] : (byte) 0;
            }
            return Keys.hmacShaKeyFor(paddedKey);
        }
    }
    
    private byte[] hexStringToByteArray(String s) {
        int len = s.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) ((Character.digit(s.charAt(i), 16) << 4)
                    + Character.digit(s.charAt(i+1), 16));
        }
        return data;
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            throw new RuntimeException("Invalid JWT token: " + e.getMessage());
        }
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(UserDetails userDetails, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);
        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public String getRoleFromToken(String token) {
        Claims claims = extractAllClaims(token);
        return claims.get("role", String.class);
    }
}

