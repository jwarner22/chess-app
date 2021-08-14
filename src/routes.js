import React from "react";
import LogIn from "./components/Login/LogIn";
import SignUp from "./components/Signup/SignUp";
import Dashboard from "./components/PostLogin/Dashboard"
import Home from "./components/Home/Home"
import DailyPuzzle from "./components/DailyPuzzle/DailyPuzzle"

const routes = [
  {name: "Home", path: "/", exact: true, main: () => <Home />},
  { name: "SignUp", path: "/signup", exact: true, main: () => <SignUp /> },
  { name: "LogIn", path: "/login", exact: true, main: () => <LogIn /> }
];

export default routes;