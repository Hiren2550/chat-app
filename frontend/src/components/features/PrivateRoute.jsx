import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const authUser = useSelector((state) => state.user.auth);
  return authUser ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
