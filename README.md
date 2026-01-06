# Task Management System

A robust, full-stack task management application designed to help users organize their workflow efficiently. This project provides a secure and intuitive interface for managing daily tasks, tracking progress, and improving productivity.

## 📂 Project Structure

The project is organized into two main directories: `client` for the frontend and `server` for the backend.

```
task-management-system-test/
├── client/                 # Frontend Application (React + Vite)
│   ├── src/
│   │   ├── api/           # API integration
│   │   ├── assets/        # Static assets
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── styles/        # Global styles
│   │   └── App.jsx        # Main App component
│   └── package.json
│
└── server/                 # Backend Application (Node.js + Express)
    ├── config/            # Configuration files
    ├── controllers/       # Request handlers
    ├── middleware/        # Custom middleware
    ├── models/            # Mongoose schemas
    ├── routes/            # API routes
    └── server.js          # Entry point
```

## ✨ Key Features

- **Secure Authentication**: 
    - User registration and login with JWT (JSON Web Tokens).
    - Session management and protected routes.
- **Task Management CRUD**:
    - **Create**: Add new tasks with descriptions and due dates.
    - **Read**: View all tasks in a comprehensive dashboard.
    - **Update**: Edit task details and status.
    - **Delete**: Remove completed or unwanted tasks.
- **Interactive Dashboard**:
    - Visual statistics of task progress.
    - clean and responsive grid layout.
- **Modern UI/UX**: 
    - Responsive design working seamlessly on desktop and mobile.
    - User-friendly interface with visual feedback (toast notifications).

## 🛠️ Technology Stack

- **Frontend**: 
    - **React.js**: Component-based UI library.
    - **Vite**: Fast build tool and development server.
    - **CSS3**: Modern styling with custom properties.
    - **Axios**: Promise-based HTTP client.
- **Backend**:
    - **Node.js**: JavaScript runtime environment.
    - **Express.js**: Web framework for Node.js.
    - **MongoDB**: NoSQL database for flexible data storage.
    - **Mongoose**: Object Data Modeling (ODM) library.

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or Atlas URI)

### Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd task-management-system-test
    ```

2.  **Backend Setup**
    Navigate to the server directory:
    ```bash
    cd server
    npm install
    ```
    Create a `.env` file in the `server` directory with your credentials:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```
    Start the server:
    ```bash
    npm start
    ```

3.  **Frontend Setup**
    Navigate to the client directory:
    ```bash
    cd ../client
    npm install
    ```
    Start the development server:
    ```bash
    npm run dev
    ```

4.  **Access the Application**
    Open your browser and visit `http://localhost:5173`.

## 📜 License
This project is open-source and available under the MIT License.
