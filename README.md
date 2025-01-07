# NAIS Journal App API Documentation

## Overview

Welcome to the NAIS Journal App API! This documentation provides a comprehensive guide to the endpoints available for public, user, journal, and admin interactions within the application. Each section includes details about the endpoint, request format, and expected responses.

## General Information

- **Base URL**: `http://localhost:8000`
- **Authorization**: Most endpoints require a Bearer Token passed in the `Authorization` header.

---

## **Public APIs**

### **1. Hello**
- **Endpoint**: `GET http://localhost:8000/hello`
- **Description**: A simple endpoint to test connectivity.
- **Response**: **HTTP 200 OK**

### **2. Get Popular Posts**
- **Endpoint**: `GET http://localhost:8000/`
- **Description**: Fetches a list of the most popular posts.
- **Response**: **HTTP 200 OK**

### **3. Get Recent Posts**
- **Endpoint**: `GET http://localhost:8000/recent`
- **Description**: Fetches a list of the most recent posts.
- **Response**: **HTTP 200 OK**

### **4. Search Journals**
- **Endpoint**: `GET http://localhost:8000/search`
- **Query Parameter**: `query` - Search term.
- **Response**: **HTTP 200 OK** - A list of journals matching the search query.

### **5. Journal Access**
- **Endpoint**: `POST http://localhost:8000/article`
- **Request Body**: Journal ID as a string.
- **Response**: **HTTP 200 OK** - Returns the details of a journal.

### **6. Summarizer**
- **Endpoint**: `POST http://localhost:8000/summary`
- **Description**: Generates a summary of a journal.
- **Request Body**: Journal ID as a string.
- **Response**: **HTTP 200 OK** - Journal summary.

---

## **Authentication APIs**

### **1. Register User**
- **Endpoint**: `POST http://localhost:8000/register`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "bio": "string"
  }
  ```
- **Response**:
  - **HTTP 201 Created** - User registered successfully.
  - **HTTP 400 Bad Request** - User already exists.

### **2. Login User**
- **Endpoint**: `POST http://localhost:8000/login`
- **Description**: Authenticates a user and returns a JWT token.
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response**:
  - **HTTP 200 OK** - JWT Token.
  - **HTTP 400 Bad Request** - Invalid username or password.

### **3. Admin Login**
- **Endpoint**: `POST http://localhost:8000/admin-login`
- **Description**: Authenticates an admin and returns a JWT token.
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response**:
  - **HTTP 200 OK** - JWT Token.
  - **HTTP 400 Bad Request** - Invalid username or password.

### **4. Logout**
- **Endpoint**: `POST http://localhost:8000/logout`
- **Description**: Logs out a user by invalidating their token.
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response**:
  - **HTTP 200 OK** - User logged out successfully.
  - **HTTP 400 Bad Request** - Invalid token.

### **5. Forget Password**
- **Endpoint**: `POST http://localhost:8000/forget-password`
- **Description**: Sends a reset code to the user’s email.
- **Request Body**:
  ```json
  {
    "username": "string"
  }
  ```
- **Response**:
  - **HTTP 200 OK** - Reset code sent successfully.
  - **HTTP 422 Unprocessable Entity** - Failed to send reset email.

### **6. Reset Password**
- **Endpoint**: `POST http://localhost:8000/reset-password`
- **Description**: Resets a user's password using a reset code.
- **Request Body**:
  ```json
  {
    "username": "string",
    "resetCode": "string",
    "password": "string"
  }
  ```
- **Response**:
  - **HTTP 200 OK** - Password reset successfully.
  - **HTTP 400 Bad Request** - Invalid or expired reset code.

---

## **User APIs**

### **1. Get My Info**
- **Endpoint**: `GET http://localhost:8000/user/my-info`
- **Description**: Retrieves information about the logged-in user.
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response**:
  - **HTTP 200 OK** - User details.
  - **HTTP 404 Not Found** - User not found.

### **2. Edit User Details**
- **Endpoint**: `PUT http://localhost:8000/user/edit-details`
- **Description**: Updates user details.
- **Headers**:
  - `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "firstName": "string",
    "lastName": "string",
    "bio": "string",
    "email": "string"
  }
  ```
- **Response**:
  - **HTTP 200 OK** - User updated successfully.
  - **HTTP 400 Bad Request** - Update failed.

### **3. Delete User**
- **Endpoint**: `DELETE http://localhost:8000/user/delete`
- **Description**: Deletes the logged-in user.
- **Headers**:
  - `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "password": "string"
  }
  ```
- **Response**:
  - **HTTP 200 OK** - User deleted successfully.
  - **HTTP 400 Bad Request** - Invalid password.

### **4. Get My Posts**
- **Endpoint**: `GET http://localhost:8000/user/my-posts`
- **Description**: Retrieves posts created by the logged-in user.
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response**:
  - **HTTP 200 OK** - List of posts.
  - **HTTP 204 No Content** - No posts found.

### **5. Get Liked Posts**
- **Endpoint**: `GET http://localhost:8000/user/liked`
- **Description**: Retrieves journals liked by the user.
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response**:
  - **HTTP 200 OK** - List of liked journals.
  - **HTTP 204 No Content** - No liked journals found.

### **6. Get Saved Posts**
- **Endpoint**: `GET http://localhost:8000/user/saved`
- **Description**: Retrieves journals saved by the user.
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response**:
  - **HTTP 200 OK** - List of saved journals.
  - **HTTP 204 No Content** - No saved journals found.

---

## **Journal APIs**

### **1. Add Journal**
- **Endpoint**: `POST http://localhost:8000/journal/add-journal`
- **Description**: Adds a new journal.
- **Headers**:
  - `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "title": "string",
    "body": "string",
    "tags": ["string"]
  }
  ```
- **Response**:
  - **HTTP 201 Created** - Journal added successfully.
  - **HTTP 400 Bad Request** - Add failed.

### **2. Edit Journal**
- **Endpoint**: `PUT http://localhost:8000/journal/edit-details`
- **Description**: Updates journal details.
- **Headers**:
  - `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "id": "string",
    "title": "string",
    "body": "string"
  }
  ```
- **Response**:
  - **HTTP 200 OK** - Journal updated successfully.
  - **HTTP 400 Bad Request** - Update failed.

### **3. Delete Journal**
- **Endpoint**: `DELETE http://localhost:8000/journal/delete-journal`
- **Description**: Deletes a journal.
- **Headers**:
  - `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "journalId": "string"
  }
  ```
- **Response**:
  - **HTTP 200 OK** - Journal deleted successfully.
  - **HTTP 400 Bad Request** - Delete failed.

### **4. Like Journal**
- **Endpoint**: `POST http://localhost:8000/journal/like`
- **Description**: Likes a journal.
- **Headers**:
  - `Authorization: Bearer <token>`
- **Request Body**: Journal ID as a string.
- **Response**:
  - **HTTP 200 OK** - Journal liked successfully.
  - **HTTP 400 Bad Request** - Like failed.

### **5. Unlike Journal**
- **Endpoint**: `POST http://localhost:8000/journal/unlike`
- **Description**: Removes a like from a journal.
- **Headers**:
  - `Authorization: Bearer <token>`
- **Request Body**: Journal ID as a string.
- **Response**:
  - **HTTP 200 OK** - Journal unliked successfully.
  - **HTTP 400 Bad Request** - Unlike failed.

### **6. Save Journal**
- **Endpoint**: `POST http://localhost:8000/journal/save-journal`
- **Description**: Saves a journal for later reference.
- **Headers**:
  - `Authorization: Bearer <token>`
- **Request Body**: Journal ID as a string.
- **Response**:
  - **HTTP 200 OK** - Journal saved successfully.
  - **HTTP 400 Bad Request** - Save failed.

---

## **Admin APIs**

### **1. Get All Users**
- **Endpoint**: `GET http://localhost:8000/admin/users`
- **Headers**:
  - `Authorization: Bearer <admin_token>`
- **Response**: **HTTP 200 OK** - List of users.

### **2. Get All Journals**
- **Endpoint**: `GET http://localhost:8000/admin/journals`
- **Headers**:
  - `Authorization: Bearer <admin_token>`
- **Response**: **HTTP 200 OK** - List of journals.

### **3. Remove User**
- **Endpoint**: `POST http://localhost:8000/admin/remove-user`
- **Headers**:
  - `Authorization: Bearer <admin_token>`
- **Request Body**: Username as a string.
- **Response**:
  - **HTTP 200 OK** - User removed successfully.
  - **HTTP 400 Bad Request** - Remove failed.

### **4. Remove Journal**
- **Endpoint**: `POST http://localhost:8000/admin/remove-journal`
- **Headers**:
  - `Authorization: Bearer <admin_token>`
- **Request Body**: Journal ID as a string.
- **Response**:
  - **HTTP 200 OK** - Journal removed successfully.
  - **HTTP 400 Bad Request** - Remove failed.

---



# JWT and How It Works 

## How JWT Works

<details>
  <summary>1. User Logs In</summary>
  The React app sends the user's credentials (like username and password) to the Spring Boot backend using Axios.
</details>

<details>
  <summary>2. Token Created</summary>
  The Spring Boot backend verifies the credentials. If correct, it creates a JWT, which includes user information (e.g., user ID, roles).  
  The token is signed using a secret key, ensuring it cannot be tampered with.
</details>

<details>
  <summary>3. Token Sent to React</summary>
  The backend sends the JWT back to the React app, which stores it securely, typically in **localStorage** or **sessionStorage** (or in a cookie for added security).
</details>

<details>
  <summary>4. Token Used for Requests</summary>
  For every subsequent API call from React to the Spring Boot backend, the React app includes the JWT in the request header using Axios.
</details>

<details>
  <summary>5. Token Verified by Spring Boot</summary>
  The backend checks the token’s validity and signature. If valid, it processes the request and sends the appropriate response.
</details>

<details>
  <summary>6. Token Expiry</summary>
  JWTs often have an expiration time (e.g., 24 hours). After expiration, the React app must prompt the user to log in again to get a new token.
</details>

---

## Passing JWT Using `Authorization: Bearer` with Axios

  Header Format
  When making requests from React, include the JWT in the `Authorization` header.

  ```javascript
  import axios from 'axios';

  const token = localStorage.getItem('jwtToken'); // Retrieve the token

  axios.get('/api/resource', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
  ```


  Set a Global Header
  You can configure Axios to include the JWT in all requests automatically:

  ```javascript
  import axios from 'axios';

  const token = localStorage.getItem('jwtToken');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  ```


---