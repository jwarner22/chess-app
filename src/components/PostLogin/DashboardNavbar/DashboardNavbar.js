import React, {useState, useEffect} from 'react'
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
import {animateScroll as scroll} from 'react-scroll'
import logo from "../../../Images/Elo-elevation-blue.png"
import firebase from 'firebase/compat/app'
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
                            <NavLinks to="/home/daily" activeStyle={{
                            borderBottom: "3px solid #247cf1"
                            }}> 
                                   Today
                                </NavLinks>
                            </NavItem>
                            <NavItem>
                            <NavLinks to="/home/practice" activeStyle={{
                            borderBottom: "3px solid #247cf1"
                            }}> 
                                   Practice
                                </NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="/home/leaderboards" activeStyle={{
                            borderBottom: "3px solid #247cf1"
                            }}> 
                                    Leaderboard
                                </NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="/home/openings" activeStyle={{
                            borderBottom: "3px solid #247cf1"
                            }}> 
                                   Openings 
                                </NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="/home/profile" activeStyle={{
                            borderBottom: "3px solid #247cf1"
                            }}> 
                                   Profile
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
