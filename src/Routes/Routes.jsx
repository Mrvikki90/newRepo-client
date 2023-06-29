import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../components/Homepage/ChatHomePage";
import PrivateRoutes from "../hoc/privateRoutes";
import Login from "../components/Auth/login/LoginNew";
import SignUp from "../components/Auth/signup/signupNew";
import ResetPasswordPage from "../components/reset-password/resetPassword";

const Router = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<HomePage />} path="/home" />
        </Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/reset-password" element={<ResetPasswordPage />}></Route>
      </Routes>
    </>
  );
};

export default Router;
