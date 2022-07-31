import React from "react";
import Home from "../components/Home/Home";
import Loader from '../components/Loader';
import ForgotPassword from "../Pages/Login-Signup/ForgotPassword";
import Contact from "../Pages/Contact/Contact";



const SignUp = React.lazy(() => import('../components/Signup/SignUp'));
const LogIn = React.lazy(() => import('../components/Login/LogIn'));

const routes = [
  { name: "Home", path: "/", exact: true, main: () => <Home />},
  { name: "SignUp", path: "/signup", exact: true, main: () => <SignUp /> },
  { name: "LogIn", path: "/login", exact: true, main: () => <LogIn /> },
  { name: "LoadingTest", path: "/test", exact: true, main: () => <Loader /> },
  {	name: "ForgotPassword", path: "/forgotpassword", exact: true, main: () => <ForgotPassword />},
  { name: "Contact Us", path: "/support", exact: true, main: () => <Contact />}
];

export default routes;