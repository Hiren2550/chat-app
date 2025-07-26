import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/features/PrivateRoute";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import TermsConditions from "./pages/TermsConditions";
import { isLogin } from "./redux/auth/authSlice";

function App() {
  const isAuthenticated = useSelector(isLogin);
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to={"/"} /> : <SignUp />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to={"/"} /> : <Login />}
        />
        <Route path="/terms-privacy" element={<TermsConditions />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
