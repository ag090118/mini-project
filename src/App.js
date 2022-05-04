import React, { useEffect } from "react";
import "./styles.css";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import UserProfile from "./components/UserProfile";
import MalwareApi from "./components/MalwareApi";
import { cyan } from "@mui/material/colors";
import { grey } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "./components/store";
import { loginFunc, logoutFunc } from "./components/actions/index";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

store.subscribe(() => {
  console.log("Store Changed!!", store.getState());
});
const theme = createTheme({
  palette: {
    primary: {
      main: cyan[900],
    },
    secondary: {
      main: grey["800"],
    },
  },
});
export default function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/userprofile/:id" element={<UserProfile />} />
          <Route path="/malwareapi" element={<MalwareApi />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}