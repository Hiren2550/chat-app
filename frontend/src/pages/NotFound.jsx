// src/pages/NotFound.jsx
import { isLogin } from "@/redux/auth/authSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NotFound = () => {
  const isAuthenticated = useSelector(isLogin);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-600 mb-4">404</h1>
      <p className="text-xl md:text-2xl text-gray-800 mb-6">
        Oops! Page not found.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {isAuthenticated ? (
          <>
            <Link
              to="/"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Go to Home
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Go to Login
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Go to Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NotFound;
