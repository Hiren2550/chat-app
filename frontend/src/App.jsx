import { useState } from "react";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import TermsPrivacy from "./pages/TermsConditions";
import TermsConditions from "./pages/TermsConditions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/terms-privacy" element={<TermsConditions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
