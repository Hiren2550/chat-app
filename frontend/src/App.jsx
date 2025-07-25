import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/features/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import TermsConditions from "./pages/TermsConditions";
import { isLogin } from "./redux/auth/authSlice";
import NotFound from "./pages/NotFound";

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

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
