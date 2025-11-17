import React from "react";
import { Route, Routes } from "react-router-dom";
import { URL } from "../constants/router";
import LoginForm from "../pages/login/loginForm";

const Routers = () => {
  return (
    <Routes>
      <Route path={URL.home} element={<LoginForm />} />
    </Routes>
  );
};

export default Routers;
