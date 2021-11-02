
import React from "react";
import ReactDOM from "react-dom";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import routes from "./routes.js";
import './App.css';
import protectedRoutes from './components/protectedRoutes'
import ProtectedRouteHoc from './components/protectedRoutesHoc'
import {AuthProvider} from './components/Auth.js';
require("firebase/auth");

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


function App() {

  return(
    <>
    <AuthProvider>
      {/*Is logged in? {JSON.stringify(isLoggedIn)}*/}
      {/*console.log({isloggedin: JSON.stringify(isLoggedIn)})*/}
      <div className="App">
        <Router>
          {/* <Route render={({location}) => (
            <TransitionGroup>
            <CSSTransition
            key={location.key}
            timeout={150}
            classNames="fade"
            > */}

            <Switch >
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
            {/* </CSSTransition>
          </TransitionGroup>
          )} /> */}
        </Router>
      </div>
    </AuthProvider>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

