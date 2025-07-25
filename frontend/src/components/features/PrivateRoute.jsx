import { isLogin } from "@/redux/auth/authSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector(isLogin);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
