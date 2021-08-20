import React, { useContext, useState } from "react";
import { Link, BrowserRouter as Router, Swtich, Route } from "react-router-dom";
//import { AuthContext } from "../Auth";
import HeroSection from "../Hero Section/Index";
import Navbar from '../NavBar.js/Index'
import Sidebar from '../Sidebar/index'
import InfoSection from '../InfoSection/index'
import { homeObjOne, homeObjTwo, homeObjThree } from "../InfoSection/Data";
import Services  from '../Services/Index'
import Footer from '../Footer/Index'



const Home = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      
      <Navbar toggle={toggle}/>
      <Sidebar isOpen={isOpen} toggle={toggle}/>
      <HeroSection />
      <div>
      <Link to="/test">
        TEST
        </Link> 
      </div>
      <InfoSection {...homeObjOne}/>
      <InfoSection {...homeObjTwo}/>
      <Services />
      <InfoSection {...homeObjThree}/>
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
    </>
  );
};

export default Home;