import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';

export default function AppRoutes() {
    const navigate = useNavigate();
    const location = useLocation();

    // Redirect to login page
    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/login');
        }
    }, [navigate, location]);

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}