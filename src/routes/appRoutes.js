import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import DashBoard from '../components/DashBoard';
import Home from '../components/Home';
import UserPage from '../components/Authorities/UserPage';
import RolePage from '../components/Authorities/RolePage';
import MenuPage from '../components/Authorities/MenuPage';
import ResourcePage from '../components/Authorities/ResourcePage';

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
            <Route path="/dashboard" element={<Navigate to="/dashboard/home" />} />
            <Route path="/dashboard" element={<DashBoard />}>
                <Route path="/dashboard/home" element={<Home />} />
                <Route path="/dashboard/auth/user" element={<UserPage />} />
                <Route path="/dashboard/auth/role" element={<RolePage />} />
                <Route path="/dashboard/auth/menu" element={<MenuPage />} />
                <Route path="/dashboard/auth/resource" element={<ResourcePage />} />
                <Route path='/dashboard/auth' element={<Navigate to='/dashboard/auth/user' />} />
            </Route>
        </Routes>
    );
}