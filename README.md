# Task Management App

A full-stack task management application with Role-Based Access Control (RBAC), built using Node.js, Express, React, PostgreSQL, and Docker Compose.

## Features

-   **Authentication**: Secure JWT-based authentication with password hashing (bcrypt).
-   **Role-Based Access**:
    -   **User**: Can create, read, update, and delete their own tasks.
    -   **Admin**: Can view and manage all tasks.
-   **CRUD Operations**: Full Create, Read, Update, Delete functionality for Tasks.
-   **Database**: PostgreSQL for persistent data storage.
-   **Containerization**: Fully Dockerized setup for easy deployment.

## Tech Stack

-   **Backend**: Node.js, Express.js
-   **Frontend**: React (Vite), Tailwind CSS
-   **Database**: PostgreSQL
-   **DevOps**: Docker, Docker Compose

## Prerequisites

-   Docker & Docker Compose installed on your machine.

## Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Harshit-Patel01/CRUD.git
    cd CRUD
    ```

2.  **Start the application**:
    ```bash
    docker-compose up --build
    ```

3.  **Access the application**:
    -   **Frontend**: `http://localhost`
    -   **Backend API**: `http://localhost:5000`

## Testing the Application

1.  **Register a User**:
    -   Go to `http://localhost/register`.
    -   Create an account (default role is `user`).
    -   To create an admin, you can use the API directly or modify the database value manually (for simplicity in this assignment).

2.  **Login**:
    -   Login with your credentials.
    -   You will be redirected to the Dashboard.

3.  **Manage Tasks**:
    -   Create new tasks.
    -   Edit existing tasks.
    -   Delete tasks.
    -   Logout.

## API Documentation

### Auth Endpoints

| Method | Endpoint             | Description       | Body                           |
| :----- | :------------------- | :---------------- | :----------------------------- |
| POST   | `/api/auth/register` | Register new user | `{ username, password, role }` |
| POST   | `/api/auth/login`    | Login user        | `{ username, password }`       |

### Task Endpoints (Protected)

| Method | Endpoint          | Description            | Access       |
| :----- | :---------------- | :--------------------- | :----------- |
| GET    | `/api/tasks`      | Get all tasks          | User/Admin   |
| POST   | `/api/tasks`      | Create a new task      | User/Admin   |
| PUT    | `/api/tasks/:id`  | Update a task          | Owner/Admin  |
| DELETE | `/api/tasks/:id`  | Delete a task          | Owner/Admin  |

## Project Structure

```
/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── config/          # Database config
│   │   ├── controllers/     # Request logic
│   │   ├── middleware/      # Auth & RBAC
│   │   ├── models/          # DB Models
│   │   └── routes/          # API Routes
│   └── Dockerfile
│
├── frontend/                # React/Vite App
│   ├── src/
│   │   ├── api/             # API config
│   │   ├── context/         # Auth State
│   │   └── pages/           # UI Pages
│   └── Dockerfile
│
├── docker-compose.yml       # Orchestration
└── README.md                # Documentation
```
