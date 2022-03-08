
import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import routes from "./routes/routes.js";
import './App.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import protectedRoutes from './routes/protectedRoutes'
import ProtectedRouteHoc from './routes/protectedRoutesHoc'
import {AuthProvider} from './providers/Auth.js';
import {UserProvider} from './providers/GlobalState.js';
import Loader from "./components/Loader.js";
import ErrorBoundary from './components/UI_Kit/ErrorBoundary.js';
require("firebase/auth");

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


function App() {

  useEffect(() => {
    document.title = " Elo Elevation";
  },[])
  return(
    <>
    <ErrorBoundary>
    <AuthProvider>
      <UserProvider>
      {/*Is logged in? {JSON.stringify(isLoggedIn)}*/}
      {/*console.log({isloggedin: JSON.stringify(isLoggedIn)})*/}
      <React.Suspense fallback={<span><Loader/></span>}>
        <Router>
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
        </React.Suspense>
        </UserProvider>
    </AuthProvider>
    </ErrorBoundary>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();