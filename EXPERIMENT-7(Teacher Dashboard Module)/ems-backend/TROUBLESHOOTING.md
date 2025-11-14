# Troubleshooting Guide for EMS Backend

## Common Errors and Solutions

### 1. JWT Token Errors

**Error**: `Invalid JWT token` or `JWT signature does not match`

**Solution**: 
- Ensure the JWT secret in `application.properties` is at least 64 characters (hex) or 32 bytes
- The current secret is a hex string that will be automatically decoded
- If you change the secret, all existing tokens will become invalid

### 2. Spring Security Configuration Errors

**Error**: `Cannot resolve method` or `Bean creation error`

**Solution**:
- Ensure you're using Spring Boot 3.x (check `pom.xml`)
- The SecurityConfig uses lambda syntax compatible with Spring Boot 3
- Make sure all dependencies are properly imported

### 3. Database Connection Errors

**Error**: `Communications link failure` or `Access denied`

**Solution**:
- Check MySQL is running: `mysql -u root -p`
- Verify database exists: `CREATE DATABASE student_management_system;`
- Update credentials in `application.properties`:
  ```properties
  spring.datasource.username=root
  spring.datasource.password=your_password
  ```

### 4. CORS Errors

**Error**: `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solution**:
- Check `SecurityConfig.java` has CORS configuration
- Verify frontend URL is in allowed origins: `http://localhost:5173` or `http://localhost:3000`
- Ensure `corsConfigurationSource()` bean is properly configured

### 5. Circular Dependency Errors

**Error**: `BeanCurrentlyInCreationException`

**Solution**:
- This usually happens if beans depend on each other
- The current configuration should avoid this, but if it occurs:
  - Check `SecurityConfig` doesn't autowire itself
  - Ensure `JwtAuthenticationFilter` is a `@Component`, not `@Bean`

### 6. Authentication Manager Errors

**Error**: `AuthenticationManager could not be found`

**Solution**:
- Ensure `AuthenticationManager` bean is created in `SecurityConfig`
- Check that `AuthenticationConfiguration` is properly injected
- Verify `@EnableWebSecurity` annotation is present

### 7. User Not Found Errors

**Error**: `User not found with email` during login

**Solution**:
- Register a user first using `/api/auth/register`
- Check database has users: `SELECT * FROM users;`
- Verify email is correct and exists in database

### 8. Password Encoding Errors

**Error**: `Password does not match` even with correct password

**Solution**:
- Ensure passwords are hashed with BCrypt
- Check `PasswordEncoder` bean is properly configured
- Verify registration uses `passwordEncoder.encode()`
- During registration, password is automatically hashed

## Building and Running

### Clean Build
```bash
cd ems-backend
./mvnw clean package
./mvnw spring-boot:run
```

### Check Dependencies
```bash
./mvnw dependency:tree
```

### Check for Compilation Errors
```bash
./mvnw compile
```

## Database Setup

1. Create database:
```sql
CREATE DATABASE stu_manage;
```

2. The application will auto-create tables on first run (due to `spring.jpa.hibernate.ddl-auto=update`)

3. Optional: Insert sample data using `sample-data.sql`

## Testing Endpoints

### Register User
```bash
curl -X POST http://localhost:8081/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "STUDENT"
  }'
```

### Login
```bash
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Access Protected Endpoint (with token)
```bash
curl -X GET http://localhost:8081/api/students \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Logs

Check application logs for detailed error messages. Common log locations:
- Console output
- `logs/` directory (if configured)
- Spring Boot default logging

## Still Having Issues?

1. Check Spring Boot version matches Java version (Java 17 for Spring Boot 3.x)
2. Verify all Maven dependencies are downloaded
3. Check MySQL version compatibility (MySQL 8.0+ recommended)
4. Ensure port 8081 is not in use by another application
5. Clear Maven cache: `./mvnw clean`

## Contact

If issues persist, check:
- Spring Boot documentation
- Spring Security documentation
- JWT library documentation (jjwt)

