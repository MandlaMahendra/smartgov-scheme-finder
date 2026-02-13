import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Schemes from "./pages/Schemes";
import Eligibility from "./pages/Eligibility";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import Layout from "./components/Layout";

function App() {
  const [auth, setAuth] = useState(localStorage.getItem("token"));

  useEffect(() => {
    // Sync state with local storage to handle external updates (like logout from other tabs)
    const handleStorageChange = () => {
      setAuth(localStorage.getItem("token"));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={!auth ? <Landing /> : <Navigate to="/dashboard" replace />} />
        <Route path="/login" element={!auth ? <Login setAuth={setAuth} /> : <Navigate to="/dashboard" replace />} />
        <Route path="/register" element={!auth ? <Register /> : <Navigate to="/dashboard" replace />} />

        {/* Protected Routes */}
        {auth && (
          <Route element={<Layout setAuth={setAuth} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schemes" element={<Schemes />} />
            <Route path="/eligibility" element={<Eligibility />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        )}

        {/* Catch-all */}
        <Route path="*" element={<Navigate to={auth ? "/dashboard" : "/"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
