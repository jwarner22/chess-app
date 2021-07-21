import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Dashboard from "./components/PostLogin/Dashboard";
import LogIn from "./components/Login/LogIn";
import SignUp from "./components/Signup/SignUp";
import { AuthProvider } from "./components/Auth";
import './App.css';
import ProfilePage from "./components/ProfilePage/ProfilePage"
import PasswordReset from "./components/PasswordReset/PasswordReset"



const App = () => {
  const user = null;
  return (
    user ? 
    <ProfilePage />
    :
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/passwordReset" component={PasswordReset} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;