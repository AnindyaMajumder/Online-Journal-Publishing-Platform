# 🌟 Online Journal Publishing Platform Documentation

## 📝 Overview

The **Online Journal Publishing Platform** is a full-stack web application designed to enable users to create, publish, and manage journal entries. The platform supports rich-text formatting and robust user authentication mechanisms. It integrates cutting-edge front-end and back-end technologies to deliver an efficient and scalable user experience. This project is now open for **open-source collaboration**.

📌 **This project was developed as part of a university course project.**

---

## 👨‍💻 Team Members

- **Project Lead:** [Anindya](https://github.com/AnindyaMajumder)
- **Frontend Developers:** [Mubashirul](https://github.com/Mubashirul-Islam) & [Shuddha](https://github.com/Shuddha36)
- **Backend Developers:** [Anindya](https://github.com/AnindyaMajumder) & [Nirvik](https://github.com/Rudra10NS)

---

## 🚀 Features

1. **🔒 User Authentication and Authorization**
   - Secure login and registration using **JWT tokens**.
   - Role-based access control to ensure user-specific data visibility.

2. **🖊️ Rich Text Editor**
   - Supports rich formatting such as **bold**, *italic*, lists, and hyperlinks via **Quill.js**.
   - Also supports adding pictures between texts.

3. **📧 Password Reset via Email**
   - **Java Mail Sender** facilitates secure password reset requests.
   - Validates reset codes to ensure security.

4. **📚 Journal Management**
   - Create, read, update, and delete journal entries.
   - Interactive indexing makes it easier to search and find the desired journal.

5. **❤️ Like and Save Journals**
   - Journals can be **liked** to indicate appreciation.
   - Save journals for future reference.

6. **💬 Comments on Journals**
   - Add, edit, and delete comments on journal entries.
     
7. **📢 Announcements**
   - Admins can create and manage announcements visible to all users.
   - Disseminate critical updates and information.

8. **🤖 Summarizer Feature**
   - Summarises journal content using the **Facebook BART model** for NLP.

9. **🕒 Session Management**
   - JWT-based session handling ensures secure user interactions with automatic logout after **24 hours**.

10. **🛠️ Admin Functionalities**
    - View and manage all registered users.
    - Moderate and delete journals if necessary.
    - Post, edit, and remove announcements.

---

## 🛠️ Technologies Used

### Frontend

- **React**: For building a responsive and interactive user interface.
- **Quill.js**: A rich-text editor for creating and formatting journal entries.
- **Tailwind CSS**: For styling the application with modern and reusable CSS utilities.
- **Axios**: For handling API calls seamlessly between the frontend and backend.
- **React Router DOM**: For client-side routing and navigation.
- **Parser**: For processing and rendering custom content within journal entries.
- **npm**: The package manager for managing dependencies and running scripts.

### Backend

- **Spring Boot**: A Java-based framework for building the RESTful API.
- **Spring Security 6**: Handles advanced user authentication and authorization.
- **Java 23**: Required for leveraging the latest Java features and performance.
- **MongoDB Atlas**: A cloud-hosted NoSQL database for storing user and journal data.
- **JWT (JSON Web Tokens)**: For secure user authentication and session management.
- **Java Mail Sender**: Used exclusively for password reset functionality.
- **SLF4J**: A robust and flexible logging framework for backend operations.

### Tools and Libraries

- **Lombok**: Simplifies the codebase by generating boilerplate code like getters, setters, etc.
- **Maven**: Manages project dependencies and builds the application.

---

## 🔧 Setup and Installation

### Prerequisites

1. **Node.js** and **npm** (for the frontend)
2. **Java 23** (for the backend)
3. **MongoDB Atlas** account for database hosting.
4. **Maven** for backend dependency management.

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/AnindyaMajumder/Online-Journal-Publishing-Platform.git
   cd Online-Journal-Publishing-Platform
   ```

2. **Backend Setup**

   ```bash
   cd BackEnd
   mvn install
   mvn spring-boot:run
   ```

3. **Frontend Setup**

   ```bash
   cd FrontEnd
   npm install
   npm run dev
   ```

4. **Environment Variables**

   - Configure MongoDB URI, Hugging Face API key and JMS credentials in `application.properties`.
   - Specify API endpoints in frontend service files.

---


## 🤝 Open Source Collaboration

### How to Collaborate via Forking
1. **Fork the Repository**:
   - Click the 'Fork' button on the repository page to create a personal copy.
2. **Clone the Forked Repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Online-Journal-Publishing-Platform.git
   cd Online-Journal-Publishing-Platform
   ```
3. **Create a New Branch**:
   ```bash
   git checkout -b feature-branch-name
   ```
4. **Make Changes and Commit**:
   - Implement your changes and commit with a meaningful message.
   ```bash
   git add .
   git commit -m "Added a new feature"
   ```
5. **Push Changes to GitHub**:
   ```bash
   git push origin feature-branch-name
   ```
6. **Create a Pull Request (PR)**:
   - Go to the original repository and submit a PR for review and merging.

This project welcomes contributions from developers around the world. Whether it's fixing bugs, implementing new features, or enhancing documentation, your help is valued.

