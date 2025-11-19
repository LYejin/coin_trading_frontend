import React from "react";
import { Route, Routes } from "react-router-dom";
import { URL } from "../constants/router";
import LoginForm from "../pages/login/loginForm";
import Coin from "../pages/coin/Coin";

const Routers = () => {
  return (
    <Routes>
      <Route path={URL.home} element={<Coin />} />
    </Routes>
  );
};

export default Routers;
