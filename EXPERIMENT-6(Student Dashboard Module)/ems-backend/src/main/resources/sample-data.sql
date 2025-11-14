-- Sample SQL data for Student Management System
-- This file contains sample data for testing the application

-- Note: Passwords are hashed with BCrypt. The following are sample hashes:
-- Password "password123" = $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
-- Password "teacher123" = $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy

-- Insert sample users
INSERT INTO users (name, email, password, role, created_at) VALUES
('John Student', 'student@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'STUDENT', NOW()),
('Jane Teacher', 'teacher@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'TEACHER', NOW()),
('Alice Student', 'alice@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'STUDENT', NOW()),
('Bob Teacher', 'bob@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'TEACHER', NOW());

-- Insert sample departments
INSERT INTO departments (department_name, department_description) VALUES
('Computer Science', 'Department of Computer Science and Engineering'),
('Mathematics', 'Department of Mathematics and Statistics'),
('Physics', 'Department of Physics and Astronomy'),
('Chemistry', 'Department of Chemistry and Biochemistry'),
('Biology', 'Department of Biological Sciences');

-- Insert sample students (linked to users)
INSERT INTO students (first_name, last_name, email, department_id, user_id) VALUES
('John', 'Student', 'student@example.com', 1, 1),
('Alice', 'Student', 'alice@example.com', 2, 3);

-- Note: The password hash above is for "password123"
-- In production, always use BCryptPasswordEncoder to hash passwords
-- You can test with:
-- Student: student@example.com / password123
-- Teacher: teacher@example.com / password123

