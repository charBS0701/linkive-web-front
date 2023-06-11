import React, { useEffect, useState, createContext, useReducer } from "react";

import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Setting from "./pages/setting/Setting";
import Login from "./pages/login/Login";
import { default as LinkPage } from "./pages/link/Link"; // Prevent name collision
import Header from "./pages/home/Header";
import FindPassword from "./pages/login/FindPassword.jsx";
import LinkMenu from "./pages/link/Link";
import ViewLink from "./pages/viewLinkMemo/ViewLink";
import EditLink from "./pages/editLinkMemo/EditLink";
import EditCustomView from "./pages/editCustomView/EditCustomView";
import "./styles/App.css";
import ViewTitle from "./routes/customView/ViewTitle";
import EditProfilePage from "./pages/setting/EditProfilePage.jsx";
import Cookies from "js-cookie";
import { initState, reducer } from "./store/CustomDialogStore";
import CustomDialog from "./components/CustomDialog";
import BtnAddLink from "./pages/home/BtnAddLink";

function RedirectToLogin() {
  // 로그인 안했을 때 로그인 페이지로 이동
  return <Navigate to="/login" />;
}

export const DialogDispatch = createContext(initState);

function App() {
  // 로그인 여부 확인
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 유저정보 불러오기
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    // Check for access token
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    if (accessToken) {
      setIsLoggedIn(true);

      // 유저정보 불러오기
      axios
        .get("http://localhost:8123/users/userInfo", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        })
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <Router>
      <Routes>
        <Route path="/setting" element={<Setting />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<BtnAddLink />} />
      </Routes>
    </Router>
  );
}

export default App;
