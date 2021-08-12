import React, {useState, useEffect, useContext} from 'react'
import {IconContext} from 'react-icons/lib'
import {Bars} from "@styled-icons/fa-solid/Bars"
import {
     Nav, 
     NavbarContainer, 
     NavLogo,
     Img, 
     MobileIcons, 
     NavMenu,  
     NavItem, 
     NavLinks, 
     NavBtn, 
     NavBtnLink, 
     NavBtnLink2,
     BlueBars
    } from './DashboardNavElements'
import {animateScroll as scroll} from 'react-scroll'
import firebaseConfig from "../../../config";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../../index";
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
    }, []);

    const toggleHome = () => {
        scroll.scrollToTop();
    }

    const Auth = useContext(AuthContext)

    const handleLogout = () => {
        firebase.auth().signOut()
  .then(res => {
      Auth.setLoggedIn(false)


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
            <IconContext.Provider value={{color: '#fff'}}>
                <Nav scrollNav={scrollNav}>
                    <NavbarContainer>
                    <NavLogo onClick={toggleHome}>
                            <Img src={logo}></Img> 
                        </NavLogo>
                        <MobileIcons onClick={toggle}>
                            <BlueBars />
                        </MobileIcons>
                        <NavMenu>
                            {/* {/* <NavItem>
                                <NavLinks>
                                    About
                                </NavLinks>
                            </NavItem> */}
                            <NavItem>
                                <NavLinks to="/dailyPuzzle">
                                    Daily Puzzle
                                </NavLinks>
                            </NavItem> 
                            {/* <NavItem>
                                <NavLinks> 
                                    Option 3
                                </NavLinks>
                            </NavItem> */}
                        </NavMenu>
                        <NavBtn>
                            <NavBtnLink onClick={() => handleLogout()}>
                                Sign Out
                            </NavBtnLink>
                        </NavBtn>
                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    );
};

export default DashNavbar