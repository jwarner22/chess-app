// import React, { useState } from "react";
// import ReactDOM from "react-dom";
// import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
// import routes from "./routes.js";
// import "./styles.css"; 
// import Home from "./components/Home/Home";
// import Dashboard from "./components/PostLogin/Dashboard";
// import LogIn from "./components/Login/LogIn";
// import SignUp from "./components/Signup/SignUp";
// import { AuthProvider } from "./components/Auth";
// import './App.css';
// import ProfilePage from "./components/ProfilePage/ProfilePage"
// import PasswordReset from "./components/PasswordReset/PasswordReset"
// import Header from "./Header";

// export const AuthContext = React.createContext(null);

// function App() {
//   const [isLoggedIn, setLoggedIn] = useState(false);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
//       Is logged in? {JSON.stringify(isLoggedIn)}
//       <div className="App">
//         <Router>
//           <Header />

//           <Switch>
//             {routes.map(route => (
//               <Route
//                 key={route.path}
//                 path={route.path}
//                 exact={route.exact}
//                 component={route.main}
//               />
//             ))}
//           </Switch>
//         </Router>
//       </div>
//     </AuthContext.Provider>
//   );
// }



// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);


// const App = () => {
//   const user = null;
//   return (
//     user ? 
//     <ProfilePage />
//     :
//     <AuthProvider>
//       <Router>
//         <Switch>
//           <Route exact path="/" component={Home} />
//           <Route exact path="/dashboard" component={Dashboard} />
//           <Route exact path="/login" component={LogIn} />
//           <Route exact path="/signup" component={SignUp} />
//           <Route exact path="/passwordReset" component={PasswordReset} />
//         </Switch>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;