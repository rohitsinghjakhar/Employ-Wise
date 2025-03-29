# Employ-Wise
🔹 Overview
This is a User Management System built using React.js for the frontend and Spring Boot for the backend. It provides authentication, user listing with pagination, editing, and deletion functionalities. The system uses JWT authentication for secure login and manages user data through a RESTful API.

# Tech Stack
Frontend (React.js)
React.js (Functional Components & Hooks)

Axios (API calls)

React Router (Navigation)

Context API (Authentication state management)

CSS (Styling & Layout)

Backend (Spring Boot)
Spring Boot (REST API)

Spring Security (JWT Authentication)

Spring Data JPA (Database operations)

MySQL (Database)

Lombok (Boilerplate code reduction)

# Features
✅ User Authentication
Users can log in with email & password.

Authentication is managed using JWT tokens.

Token is stored in localStorage for session management.

✅ User Management
Fetch Users with Pagination (GET /api/users?page=1)

Edit User Details (PUT /api/users/{id})

Delete Users (DELETE /api/users/{id})

✅ Pagination & UI Enhancements
Users are displayed in a structured table/card format.

Pagination allows navigating between pages of users.

Users are updated & deleted instantly without page refresh.

# Project Structure

=> Frontend (React.js)
/components/Login.js (User Login Form)

/components/UsersList.js (Fetch & Display Users)

/context/AuthContext.js (Manages Auth State)

/services/userService.js (Handles API Calls)

/App.js (Routes & Navigation)

=> Backend (Spring Boot)
/entities/User.java (User Entity)

/repositories/UserRepository.java (Database Access)

/services/UserService.java (Business Logic)

/controllers/UserController.java (REST API Endpoints)

/security/JwtUtils.java (JWT Token Management)
