
import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import routes from "./routes.js";
import './App.css';
import protectedRoutes from './components/protectedRoutes'
import ProtectedRouteHoc from './components/protectedRoutesHoc'
import {AuthProvider} from './components/Auth.js';
import {TransitionGroup, CSSTransition} from "react-transition-group"
import DashboardNavbar from "./components/PostLogin/DashboardNavbar/DashboardNavbar"
import DashSidebar from "./components/PostLogin/DashboardSidebar/DashboardSidebar"
import MobileNavbar from './components/PostLogin/MobileNavBar/MobileNavBar'
require("firebase/auth");


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


function App() {

  const [windowDimension, setWindowDimension] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  
  //hamburger sidebar menu
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowDimension <= 640;

  return(
    <>
    <AuthProvider>
      {/*Is logged in? {JSON.stringify(isLoggedIn)}*/}
      {/*console.log({isloggedin: JSON.stringify(isLoggedIn)})*/}
        <Router>
        {/* {isMobile ? (
          <MobileNavbar />  
        ) : (
          <>
            <DashboardNavbar toggle={toggle}/>
            <DashSidebar isOpen={isOpen} toggle={toggle} />
            </>
        )
    }  */}
<<<<<<< HEAD
            <Switch >
=======
          <Route render={({location}) => (
            // <TransitionGroup>
            // <CSSTransition
            // key={location.key}
            // timeout={150}
            // classNames="fade"
            // >
            <Switch location={location}>
>>>>>>> 432948c8dd6d19bbe292e3d9e24d20d84ce7c7e5
              {protectedRoutes.map(route => (
                <ProtectedRouteHoc
                  key={route.path}
                  path={route.path}
                  component={route.main}
                  exact={route.exact}
                  public={route.public}
                />
              ))}
              {routes.map(route => (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  component={route.main}
                />
              ))}
            </Switch>
<<<<<<< HEAD
=======
          //   </CSSTransition>
          // </TransitionGroup>
          )} />
>>>>>>> 432948c8dd6d19bbe292e3d9e24d20d84ce7c7e5
        </Router>
    </AuthProvider>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

