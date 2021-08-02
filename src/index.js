// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import {App} from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React, { useState,useEffect } from "react";
import ReactDOM from "react-dom";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import routes from "./routes.js";
import './App.css';
import Header from "./Header";
import protectedRoutes from './components/protectedRoutes'
import ProtectedRouteHoc from './components/protectedRoutesHoc'
import firebaseConfig from "./config"
import firebase from "firebase/app";
require("firebase/auth");


export const AuthContext = React.createContext(null);

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  function readSession() {
    const user = window.sessionStorage.getItem(
			`firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
		);
		if (user) setLoggedIn(true)
    setLoaded(!loaded)
  }
  useEffect(() => {
    readSession()
  }, [])

  return (loaded &&
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      {/*Is logged in? {JSON.stringify(isLoggedIn)}*/}
      <div className="App">
        <Router>
          <Switch>
            {protectedRoutes.map(route => (
              <ProtectedRouteHoc
                key={route.path}
                isLoggedIn={isLoggedIn}
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
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

