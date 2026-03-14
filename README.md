# GoSnack - Snack & Beverage E-Commerce Web Application

## 1. Short Description
**GoSnack** is an e-commerce web application for selling snacks, confectionery, and beverages. The system serves both online customers and in-store POS staff, aiming to provide a convenient shopping experience, efficient product and order management, and real-time communication between customers and store managers.

---

## 2. Project Overview
### Main Objectives
- Build a comprehensive e-commerce platform for online customers and store management.  
- Support POS functionality for in-store sales operations.  
- Enable direct messaging between customers and store managers.  
- Integrate online payment and automatic email notifications for orders.  
- Support product reviews and manage customer feedback.  
- Manage customer and employee information (user management).  

### Main Users
1. **Customers**:  
   - Browse products, add items to the cart, pay online, and receive email notifications.  
   - Chat directly with managers for inquiries about products or orders.  
   - Submit reviews for purchased products.  

2. **Store Managers (Admin/Manager)**:  
   - Manage products, inventory, and orders.  
   - Track revenue, process orders, and receive notifications from customers.  
   - Review and moderate product reviews, hide inappropriate reviews.  
   - Manage customer and employee information.  

3. **POS Staff**:  
   - Handle in-store sales operations.  
   - Manage offline orders and synchronize with the system.  
   - Support updating customer information if needed.  

### Technologies Used
- **Frontend**: React, Vite, Zustand, TailwindCSS, Axios, Lucide-react  
- **Backend**: Node.js, Express, MySQL, Sequelize, JWT, Bcrypt, Cloudinary, Multer  
- **Realtime & Payment**: Socket.io, PayOS  
- **Deployment**: Frontend on Vercel, Backend on VPS (Digital Ocean Droplet)  
- **Infrastructure**: Docker Compose, Nginx, SSL (Let’s Encrypt)  

---

## 3. System Architecture

### Overview
The **GoSnack** system is designed with a **separated frontend and backend architecture**, using a MySQL database and integrating **Realtime communication (Socket.io)** and **online payment (PayOS)** to support both online and in-store sales.

The frontend and backend communicate via **REST API** and **WebSocket** for real-time data updates. Nginx is used as a **reverse proxy** and to manage SSL with Let’s Encrypt. The system is deployed using **Docker Compose** for easier management and scalability.

### Key Components
1. **Frontend**
   - Language: **TypeScript/JavaScript**  
   - Framework: **React + Vite**  
   - State Management: **Zustand**  
   - UI: **TailwindCSS, Lucide-react**  
   - Communicates with backend via **Axios (REST API)** and **Socket.io** for realtime updates  
   - Deployed on **Vercel**

2. **Backend**
   - **Node.js** with **Express**  
   - Database management with **MySQL** and **Sequelize ORM**  
   - Authentication & security: **JWT, Bcrypt**  
   - Image upload handling: **Cloudinary, Multer**  
   - Async error handling: **express-async-errors**  
   - Realtime support: **Socket.io**  
   - Deployed on a **Digital Ocean Droplet VPS** via Docker

3. **Database**
   - **MySQL 8**  
   - Stores products, orders, users, employees, and reviews  
   - Healthcheck ensures the database is ready before the backend starts

4. **Nginx**
   - Manages reverse proxy and SSL (port 80 -> 443)  
   - Routes all requests to the backend container  
   - Supports deployment via Docker and uses Let’s Encrypt for SSL certificates

5. **Docker Compose**
   - Manages services:  
     - **food_retail_app** (backend)  
     - **food_retail_db** (MySQL)  
     - **nginx** (reverse proxy & SSL)  
   - Sets up a dedicated network and database volume  
   - Automatically restarts services if they fail

### Architecture Diagram (Simplified)
```
+------------------+          +----------------+  
|  Frontend (FE)   |          | Nginx (Reverse |  
|    Vercel        | -------> | Proxy / SSL)   |  
+------------------+          +----------------+  
                                   |  
                                   v  
                          +-----------------------------+  
                          | Backend (Node.js/Express)   |  
                          |         Docker              |  
                          +-----------------------------+  
                                   |  
                                   v  
                              +----------------+  
                              |  MySQL DB      |  
                              |    Docker      |  
                              +----------------+  
```
- Frontend interacts with the backend via **REST API** for standard data and **Socket.io** for realtime updates.  
- Backend handles business logic, database connections, authentication, and online payment via **PayOS**.  
- Nginx ensures SSL and request routing from users to the backend.

## 4. Folder Structure

The overall folder structure of the **GoSnack** project is organized as follows:

```
food-retail-project/
│
├─ frontend/ # Frontend source code (React + Vite)
│ ├─ dist/ # Build output files
│ ├─ node_modules/ # Installed dependencies
│ ├─ public/ # Static files (images, favicon, index.html)
│ ├─ src/ # Main frontend source code
│ ├─ .env # Frontend environment variables
│ ├─ package.json # Frontend project info and dependencies
│ ├─ tsconfig.json # TypeScript configuration
│ └─ README.md # Frontend-specific README
│
├─ backend/ # Backend source code (Node.js + Express)
│ ├─ nginx/ # Nginx configuration for reverse proxy and SSL
│ │ └─ nginx.conf
│ ├─ src/ # Main backend source code
│ │ ├─ config/ # Database, socket, and environment configurations
│ │ ├─ controllers/ # Business logic controllers
│ │ ├─ middlewares/ # Middlewares (authentication, error handling, etc.)
│ │ ├─ models/ # Sequelize models
│ │ ├─ routes/ # API route definitions
│ │ └─ services/ # Service layer for business logic
│ │ ├─ app.js # Express app initialization
│ │ └─ server.js # Entry point: database connection and server start
│ ├─ docker-compose.yml # Docker Compose setup for backend + DB + Nginx
│ ├─ Dockerfile # Dockerfile to build backend
│ ├─ package.json # Backend project info and dependencies
│ └─ README.md # Backend-specific README
│
└─ README.md # General project README
```

### Quick Explanation
- **frontend/**: Contains all user interface code, state management, and API calls to the backend.  
- **backend/**: Contains server-side logic, REST API, database management, authentication, payment integration, real-time communication, and file upload handling.  
- **backend/nginx/**: Nginx configuration for reverse proxy, HTTP → HTTPS redirection, and serving backend.  
- **backend/src/**: Structured according to MVC + service layer for easier maintenance and scalability.  
- **docker-compose.yml**: Launches backend, MySQL database, and Nginx simultaneously, setting up networks and volumes.  

For detailed setup and API documentation, see:
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
