# SmartGovSchemeFinder

SmartGovSchemeFinder is a full-stack web application designed to help users find government schemes easily. It features a React frontend and an Express/Node.js backend with MongoDB for data storage.

## 🚀 Live Demo
Check out the live application: https://smartgov-scheme-finder.vercel.app/

## 📁 Project Structure

The project is divided into two main parts:

- **[`frontend`](./frontend)**: React application built with Tailwind CSS and Framer Motion.
- **[`backend`](./backend)**: Express server with Mongoose, handling authentication and scheme data.

## 🛠️ Technologies Used

### Frontend
- **React**: UI library
- **React Router**: Routing
- **Tailwind CSS**: Styling
- **Framer Motion**: Animations
- **Axios**: API requests

### Backend
- **Node.js & Express**: Server framework
- **MongoDB & Mongoose**: Database and ODM
- **JSON Web Token (JWT)**: Authentication
- **Bcryptjs**: Password hashing
- **Dotenv**: Environment variable management

## ⚙️ Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local instance or Atlas cluster)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd SmartGovSchemeFinder
   ```

2. Setup Backend:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory with:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

3. Setup Frontend:
   ```bash
   cd ../frontend
   npm install
   ```

### Running Locally

1. Start the Backend server:
   ```bash
   cd backend
   node server.js
   ```

2. Start the Frontend development server:
   ```bash
   cd frontend
   npm start
   ```
   The app will be available at `http://localhost:3000`.

## 🧪 Testing

- Backend tests can be found in `backend/test_api.js` and `backend/test_login.js`.
- Frontend tests are located in `frontend/src/App.test.js`.

## 📄 License
Internal project for SmartGov.
