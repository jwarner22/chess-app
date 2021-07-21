import React, {useState, useEffect, useContext} from 'react'
import { FaBars } from 'react-icons/fa'
import {IconContext} from 'react-icons/lib'
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
     NavBtnLink2
    } from './DashboardNavElements'
import {animateScroll as scroll} from 'react-scroll'
import firebaseConfig from "../../../config";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../Auth";
import logo from "../../../Images/EloElevation-2.png"

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

    const { currentUser } = useContext(AuthContext);
    if (!currentUser) {
    return <Redirect to="/login" />; 
  }
    
    return (
        <>
            <IconContext.Provider value={{color: '#fff'}}>
                <Nav scrollNav={scrollNav}>
                    <NavbarContainer>
                    <NavLogo onClick={toggleHome}>
                            <Img src={logo}></Img> 
                        </NavLogo>
                        <MobileIcons onClick={toggle}>
                            <FaBars />
                        </MobileIcons>
                        <NavMenu>
                            {/* <NavItem>
                                <NavLinks>
                                    About
                                </NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks>
                                    Option 2
                                </NavLinks>
                            </NavItem> */}
                            {/* <NavItem>
                                <NavLinks> 
                                    Option 3
                                </NavLinks>
                            </NavItem> */}
                        </NavMenu>
                        <NavBtn>
                            <NavBtnLink onClick={() => firebaseConfig.auth().signOut()}>
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