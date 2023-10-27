import React from "react";
import { Navigate } from "react-router-dom"

const ProtectedRouteWishlist = ({ children }) => {
    const isAuth = JSON.parse(localStorage.getItem("USER")) || undefined;
    return isAuth ? children : <Navigate to="/login" />;
};
export default ProtectedRouteWishlist;