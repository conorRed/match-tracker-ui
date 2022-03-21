import React, { Component, useState } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./js/script.js";
import Login from "./components/Login/Login";
import UserDashboard from "./components/User/dashboard";
import GameDashboard from "./components/Game/Dashboard";
import GameTimer from "./components/timer";
import Layout from "./components/layout";
import { getCookie, setCookie, isTokenExpired } from "./api/helpers";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router";

class Index extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route element={<RequireAuth />}>
              <Route
                path="/login"
                element={<Login setToken={setTokenCookie} />}
              />
              <Route path="/" element={<UserDashboard />} />
              <Route
                path="/games/:gameid"
                element={<GameDashboard timer={<GameTimer />} />}
              />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    );
  }
}

function setTokenCookie(token) {
  setCookie("access_token", token, 10);
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const token = getCookie("access_token");
  let navigate = useNavigate();
  if (token === "" || token === null) {
    return <Login setToken={setTokenCookie} />;
  } else if (isTokenExpired(token)) {
    return <Login setToken={setTokenCookie} />;
  }
  return <Outlet context={[token]} />;
}

ReactDom.render(<Index />, document.getElementById("root"));
