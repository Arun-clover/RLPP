# MERN Authentication with Dual JWT Tokens

## 📌 Project Overview
This project demonstrates a **MERN stack authentication system** using **JSON Web Tokens (JWT)**.  
It introduces a **dual token mechanism**:
- **Login Token** – generated upon user login for standard authentication.
- **Photo Token** – generated on button click, specifically required to access a protected photo.

This ensures **layered security**, where being logged in is not enough; users must also hold the special photo token to view restricted resources.

---

## 🚀 Features
- User authentication with **JWT & bcrypt**.
- **Protected routes** in backend using middleware.
- Dual token system:
  - Login token for authentication.
  - Photo token for gated access.
- Expiry-based access control for sensitive resources.
- React frontend with conditional rendering (show/hide photo based on token).

---

## 🛠️ Tech Stack
- **Frontend:** React, Axios, JWT decode
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token), bcrypt

---
