import React, {  useState } from "react";
// import { Link, BrowserRouter as Router, Swtich, Route } from "react-router-dom";
//import { AuthContext } from "../Auth";
import HeroSection from "./HeroSection/Hero";
import Navbar from "./NavBar/NavBar"
import Sidebar from './Sidebar/Sidebar'
import InfoSection from './InfoSection/InfoSection'
import { homeObjOne, homeObjTwo} from "./InfoSection/Data";
// import Services  from '../Services/Index'
import Footer from './Footer/Footer'
import ErrorBoundary from '../UI_Kit/ErrorBoundary.js';


const Home = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
    <ErrorBoundary>
      <Navbar toggle={toggle}/>
      <Sidebar isOpen={isOpen} toggle={toggle}/>
      <HeroSection />
      <InfoSection {...homeObjOne}/>
      <InfoSection {...homeObjTwo}/>
      {/* <Services />
      <InfoSection {...homeObjThree}/> */}
        {/* <h1>Home</h1>
        {currentUser ? (
          <p>
            You are logged - <Link to="/dashboard">View Dashboard</Link>
          </p>
        ) : (
          <p>
            <Link to="/login">Log In</Link> or <Link to="/signup">Sign Up</Link> 
          </p>
        )} */}
      <Footer />
      </ErrorBoundary>
    </>
  );
};

export default Home;