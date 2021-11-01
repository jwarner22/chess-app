import React, {useState, useEffect, useContext} from 'react'
import {IconContext} from 'react-icons/lib'
import {
     Nav, 
     NavbarContainer, 
     NavLogo,
     Img, 
     MobileIcons, 
     NavMenu,  
     NavBtn, 
     NavBtnLink, 
     BlueBars,
     NavItem,
     NavLinks
    } from './DashboardNavElements'
import {NavLink} from "react-router-dom"
import {animateScroll as scroll} from 'react-scroll'
import firebaseConfig from "../../../config";
import { Redirect } from "react-router-dom";
//import { AuthContext } from "../../../index";
import logo from "../../../Images/EloElevation-2.png"
import firebase from 'firebase'
require('firebase/auth')





const DashNavbar = ({ toggle }) => {
    

    
    const [scrollNav, setScrollNav] = useState(false)

    const changeNav = () => {
        if(window.scrollY >= 80) {
            setScrollNav(true)
        } else {
            setScrollNav(false)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeNav)
        return () => window.removeEventListener('scroll', changeNav)
    }, []);

    const toggleHome = () => {
        scroll.scrollToTop();
    }

    //const Auth = useContext(AuthContext)

    const handleLogout = () => {
        firebase.auth().signOut()
  .then(res => {
    // Sign-out successful.
  })
  .catch(function(error) {
    // An error happened
  });
    }

    // const { currentUser } = useContext(AuthContext);
    // if (!currentUser) {
    // return <Redirect to="/login" />; 
    
    return (
        <>
            {/* <IconContext.Provider value={{color: '#fff'}}> */}
            <div>
                <Nav scrollNav={scrollNav}>
                    <NavbarContainer>
                    <NavLogo onClick={toggleHome}>
                            <Img src={logo}></Img> 
                        </NavLogo>
                        <MobileIcons onClick={toggle}>
                            <BlueBars />
                        </MobileIcons>
                        <NavMenu>
                            <NavItem>
                            <NavLinks to="/dailyPuzzle" activeStyle={{
                            borderBottom: "3px solid #247cf1"
                            }}> 
                                   Today
                                </NavLinks>
                            </NavItem>
                            <NavItem>
                            <NavLinks to="/dashboard" activeStyle={{
                            borderBottom: "3px solid #247cf1"
                            }}> 
                                   Pattern Recognition
                                </NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="/openings" activeStyle={{
                            borderBottom: "3px solid #247cf1"
                            }}> 
                                   Openings 
                                </NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="/profile" activeStyle={{
                            borderBottom: "3px solid #247cf1"
                            }}> 
                                   Profile Page
                                </NavLinks>
                            </NavItem>
                        </NavMenu>
                        <NavBtn>
                            <NavBtnLink to='/login' onClick={() => handleLogout()}>
                                Sign Out
                            </NavBtnLink>
                        </NavBtn>
                    </NavbarContainer>
                </Nav>
                </div>
            {/* </IconContext.Provider> */}
        </>
    );
};

export default DashNavbar
