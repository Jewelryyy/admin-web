import { Navigate, useLocation } from "react-router-dom";

// 路由守卫
const RouteGuard = (props) => {
    const WhiteList = ["/login", "/register"];
    const { pathname } = useLocation();
    if (WhiteList.indexOf((pathname ? pathname : "/")) === -1) {
        let token = sessionStorage.getItem("token");
        if (token) {
            return props.children;
        } else {
            return <Navigate to="/login" />;
        }
    } else {
        return props.children;
    }
}

export default RouteGuard;
