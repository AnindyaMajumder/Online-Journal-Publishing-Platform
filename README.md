# NAIS Journal API Documentation

## Introduction
Welcome to the NAIS Journal API Documentation! This guide provides a comprehensive overview of all available endpoints, their functionalities, and integration details to help the frontend team seamlessly interact with the backend services.

---

## **Base URL**
```
http://localhost:8000
```

---

## **Endpoints Overview**

### **0. Hello Endpoint**

#### Hello Message
**GET** `/hello`
- **Headers:**
  - `None`
- **Response:**
  - `200 OK`: "WELCOME TO NAIS JOURNAL"
---

### **1. Authentication**

#### Register
**POST** `/register`
- **Headers:** None
- **Body:**
```json
{
    "username": "messi",
    "password": "messi",
    "email": "anindyamajumder.54@gmail.com",
    "firstName": "Lionel",
    "lastName": "Messi",
    "bio": "Footballer"
}
```
- **Response:**
  - `200 OK`: "User registered successfully"
  - `400 Bad Request`: "User already exists"

#### Login
**POST** `/login`
- **Headers:** None
- **Body:**
```json
{
    "username": "messi",
    "password": "messi"
}
```
- **Response:**
  - `200 OK`: JWT Token
  - `400 Bad Request`: "Invalid username or password"

#### Admin Login
**POST** `/admin-login`
- **Headers:** None
- **Body:**
```json
{
    "username": "admin",
    "password": "admin"
}
```
- **Response:**
  - `200 OK`: JWT Token
  - `400 Bad Request`: "Invalid username or password"

#### Logout
**POST** `/logout`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Response:**
  - `200 OK`: "User logged out successfully"
  - `400 Bad Request`: "Invalid token"

#### Forget Password
**POST** `/forget-password`
- **Headers:** None
- **Body:**
```json
{
    "username": "alan"
}
```
- **Response:**
  - `200 OK`: "Mail with reset-code has been sent"
  - `422 Unprocessable Entity`: Error message

#### Reset Password
**POST** `/reset-password`
- **Headers:** None
- **Body:**
```json
{
    "email": "anindyamajumder.54@gmail.com",
    "resetCode": "17acfe",
    "username": "alan",
    "password": "ALAN"
}
```
- **Response:**
  - `200 OK`: "Reset password successfully"
  - `422 Unprocessable Entity`: Error message

---

### **2. User**

#### Get My Info
**GET** `/user/my-info`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Response:**
  - `200 OK`: User details
  - `404 Not Found`: User not found

#### Get My Posts
**GET** `/user/my-posts`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Response:**
  - `200 OK`: List of user's journal entries
  - `204 No Content`: No posts available

#### Get Liked Posts
**GET** `/user/liked`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Response:**
  - `200 OK`: List of liked journals
  - `204 No Content`: No liked journals available

#### Get Reposted Journals
**GET** `/user/reposted`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Response:**
  - `200 OK`: List of reposted journals
  - `204 No Content`: No reposted journals available

#### Update User Details
**PUT** `/user/edit-details`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Body:**
```json
{
    "username": "messi",
    "firstName": "Lio",
    "lastName": "Messi",
    "email": "anindyamajumder.54@gmail.com",
    "password": "messi"
}
```
- **Response:**
  - `200 OK`: "User updated successfully"
  - `400 Bad Request`: "User update failed"

#### Delete User
**DELETE** `/user/delete`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Body:**
```json
{
    "username": "messi",
    "email": "anindyamajumder.54@gmail.com",
    "password": "messi"
}
```
- **Response:**
  - `200 OK`: "User deleted successfully"
  - `400 Bad Request`: "User delete failed"

---

### **3. Journal**

#### Add Journal
**POST** `/journal/add-journal`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Body:**
```json
{
    "title": "The Hidden World of Deep-Sea Bioluminescence",
    "body": "[Journal Content]",
    "author": "messi",
    "tags": ["marine biology", "science", "nature"]
}
```
- **Response:**
  - `200 OK`: "Journal added successfully"
  - `400 Bad Request`: "Journal add failed"

#### Edit Journal
**PUT** `/journal/edit-details`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Body:**
```json
{
    "id": "67760c7be2ce0e09923e3877",
    "title": "Updated Title",
    "body": "Updated Content",
    "tags": ["updated", "tags"]
}
```
- **Response:**
  - `200 OK`: "Journal updated successfully"
  - `400 Bad Request`: "Journal update failed"

#### Delete Journal
**DELETE** `/journal/delete-journal`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Body:**
```
"67760c7be2ce0e09923e3877"
```
- **Response:**
  - `200 OK`: "Journal deleted successfully"
  - `400 Bad Request`: "Journal delete failed"

#### Like Journal
**POST** `/journal/like`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Body:**
```
"67760c7be2ce0e09923e3877"
```
- **Response:**
  - `200 OK`: "Journal liked successfully"
  - `400 Bad Request`: "Failed to like journal"

#### Unlike Journal
**POST** `/journal/unlike`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Body:**
```
"67760c7be2ce0e09923e3877"
```
- **Response:**
  - `200 OK`: "Journal unliked successfully"
  - `400 Bad Request`: "Failed to unlike journal"

#### Repost Journal
**POST** `/journal/repost`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Body:**
```
"67760c7be2ce0e09923e3877"
```
- **Response:**
  - `200 OK`: "Journal reposted successfully"
  - `400 Bad Request`: "Failed to repost journal"

---

### **4. Public Access**

#### Popular Journals
**GET** `/`
- **Headers:** None
- **Response:**
  - `200 OK`: List of popular journal entries
  - `404 Not Found`: No journals found

#### Recent Journals
**GET** `/recent`
- **Headers:** None
- **Response:**
  - `200 OK`: List of recent journal entries
  - `404 Not Found`: No journals found

#### Search Journals
**GET** `/search`
- **Headers:** None
- **Query Parameters:**
  - `query`: Search term
- **Response:**
  - `200 OK`: List of matching journals
  - `404 Not Found`: No matching journals found

#### Access Journal
**POST** `/article`
- **Headers:** None
- **Body:**
```
"67761d74784559016c8d97b4"
```
- **Response:**
  - `200 OK`: Journal details
  - `404 Not Found`: Journal not found

---

### **5. Admin**

#### Get All Users
**GET** `/admin/users`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Response:**
  - `200 OK`: List of users
  - `204 No Content`: No users available

#### Get All Journals
**GET** `/admin/journals`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Response:**
  - `200 OK`: List of journals
  - `204 No Content`: No journals available

#### Remove User
**POST** `/admin/remove-user`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Body:**
```
"messi"
```
- **Response:**
  - `200 OK`: "User deleted successfully"
  - `204 No Content`: "User not found"

#### Remove Journal
**POST** `/admin/remove-journal`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Body:**
```
"67761ad8c7c58e24ec34187b"
```
- **Response:**
  - `200 OK`: "Journal deleted successfully"
  - `204 No Content`: "Journal not found"

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