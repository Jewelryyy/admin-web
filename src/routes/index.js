import { Navigate } from "react-router-dom"

import Login from '../components/Login';
import Register from '../components/Register';
import DashBoard from '../components/DashBoard';
import Home from '../components/Home';
import PlistPage from '../components/product/PlistPage';
import CategoryPage from '../components/product/CategoryPage';
import OlistPage from '../components/order/OlistPage';
import SetPage from '../components/order/SetPage';
import CouponPage from '../components/sms/CouponPage';
import SeckillPage from '../components/sms/SeckillPage';
import UserPage from '../components/auth/UserPage';
import RolePage from '../components/auth/RolePage';
import MenuPage from '../components/auth/MenuPage';
import ResourcePage from '../components/auth/ResourcePage';
import NotFound from '../components/NotFound';

// 定义路由表
const routes = [
    // 不需要layout的页面写到外面
    {
        path: "/",
        element: <Navigate to="login" />,
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "register",
        element: <Register />,
    },
    // 登录后的页面
    {
        path: "dashboard",
        element: <DashBoard />,
        children: [
            // Navigate 重定向
            {
                path: "",
                element: <Navigate to="home" />,
            },
            {
                path: "home",
                element: <Home />,
            },
            {
                path: "product",
                children: [
                    { path: "", element: <Navigate to="list" /> },
                    { path: "list", element: <PlistPage /> },
                    { path: "category", element: <CategoryPage /> },
                ]
            },
            {
                path: "order",
                children: [
                    { path: "", element: <Navigate to="list" /> },
                    { path: "list", element: <OlistPage /> },
                    { path: "settings", element: <SetPage /> },
                ]
            },
            {
                path: "sms",
                children: [
                    { path: "", element: <Navigate to="couponlst" /> },
                    { path: "couponlst", element: <CouponPage /> },
                    { path: "seckilllst", element: <SeckillPage /> },
                ]
            },
            {
                path: "auth",
                children: [
                    { path: "", element: <Navigate to="user" /> },
                    { path: "user", element: <UserPage /> },
                    { path: "role", element: <RolePage /> },
                    { path: "menu", element: <MenuPage /> },
                    { path: "resource", element: <ResourcePage /> },
                ],
            },
        ],
    },
    { path: '*', element: <NotFound /> },
];

export default routes;
