import React from "react";
import LogIn from "./components/Login/LogIn";
import SignUp from "./components/Signup/SignUp";
import Home from "./components/Home/Home"
import Preloader from './Preloader'

const routes = [
  {name: "Home", path: "/", exact: true, main: () => <Home />},
  { name: "SignUp", path: "/signup", exact: true, main: () => <SignUp /> },
  { name: "LogIn", path: "/login", exact: true, main: () => <LogIn /> },
  { name: "LoadingTest", path: "/test", exact: true, main: () => <Preloader /> }
];

export default routes;