import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {
     Nav, 
     NavbarContainer, 
     NavLogo,
     Img, 
     MobileIcons, 
     NavMenu,  
     BlueBars,
     NavItem,
     NavLinks
    } from './DashboardNavElements';
import Button from "../../UI_Kit/Button/Button"
import {animateScroll as scroll} from 'react-scroll'
import logo from "../../../Images/Elo-elevation-blue.png"
import firebase from 'firebase/compat/app'
import NavbarDropdown from '../NavbarDropdown/NavbarDropdown';
require('firebase/auth')


const DashNavbar = ({ toggle, openDropdown, dropdownToggle }) => {
    

    
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
                            <NewBlueBar />
                        </MobileIcons>
                        <NavMenu>
                            <NavItem>
                            <NavLinks to="/home/daily" activeStyle={{
                            borderBottom: "3px solid #1161d4"
                            }}> 
                                   Today
                                </NavLinks>
                            </NavItem>
                            <NavItem>
                            <NavLinks to="/home/practice" activeStyle={{
                            borderBottom: "3px solid #1161d4"
                            }}> 
                                   Practice
                                </NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="/home/leaderboards" activeStyle={{
                            borderBottom: "3px solid #1161d4"
                            }}> 
                                    Leaderboard
                                </NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="/home/openings" activeStyle={{
                            borderBottom: "3px solid #1161d4"
                            }}> 
                                   Openings 
                                </NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="/home/profile" activeStyle={{
                            borderBottom: "3px solid #1161d4"
                            }}> 
                                   Profile
                                </NavLinks>
                            </NavItem>
                        </NavMenu>
                        <NavbarDropdown handleLogout={handleLogout} openDropdown={openDropdown} dropdownToggle={dropdownToggle}/>
                    </NavbarContainer>
                </Nav>
                </div>
            {/* </IconContext.Provider> */}
        </>
    );
};

export default DashNavbar

const NavBarButton = styled(Button)`
    color: #fff;
    font-size: 16px;
    padding: 6px 24px;
    font-weight: 200;
    margin: 12px 24px;
    max-width: 120px;
`

const NewBlueBar = styled(BlueBars)`
color: #247cf1 !important;
`