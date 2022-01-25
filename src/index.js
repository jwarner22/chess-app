
import React from "react";
import ReactDOM from "react-dom";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import routes from "./routes.js";
import './App.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import protectedRoutes from './components/protectedRoutes'
import ProtectedRouteHoc from './components/protectedRoutesHoc'
import {AuthProvider} from './components/Auth.js';
import {UserProvider} from './GlobalState.js';

require("firebase/auth");

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


function App() {

  //const [windowDimension, setWindowDimension] = useState(null);
  //const [isOpen, setIsOpen] = useState(false);
  
  //hamburger sidebar menu
  // const toggle = () => {
  //   setIsOpen(!isOpen)
  // }

  // useEffect(() => {
  //   setWindowDimension(window.innerWidth);
  // }, []);

  // useEffect(() => {
  //   function handleResize() {
  //     setWindowDimension(window.innerWidth);
  //   }

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);
  //console.log('rendered app')

  //const isMobile = windowDimension <= 640;

  return(
    <>
    <AuthProvider>
      <UserProvider>
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
          <Route render={({location}) => (
            // <TransitionGroup>
            // <CSSTransition
            // key={location.key}
            // timeout={150}
            // classNames="fade"
            // >
            <Switch location={location}>
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
          //   </CSSTransition>
          // </TransitionGroup>
          )} />
        </Router>
        </UserProvider>
    </AuthProvider>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();