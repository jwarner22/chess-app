import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {
     Nav, 
     NavbarContainer, 
     NavLogo, 
     MobileIcons, 
     NavMenu, 
     NavItem, 
     NavLinks, 
     NavBtn, 
     NavBtnLink, 
     NavBtnLink2,
     Img,
     NavDirectLink
    } from './NavbarElements'
import {animateScroll as scroll} from 'react-scroll'
import logo from '../../../Images/ChessReps Logo Horizontal White.png'
import {BlueBars} from "../../PostLogin/DashboardNavbar/DashboardNavElements"
import Button from '../../UI_Kit/Button/Button'

const Navbar = ({ toggle }) => {
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

    return (
        <>
                <Nav scrollNav={scrollNav}>
                    <NavbarContainer>
                        <NavLogo onClick={toggleHome} to='/'>
                            <Img src={logo}></Img> 
                        </NavLogo>
                        <MobileIcons onClick={toggle}>
                            <BlueBars />
                        </MobileIcons>
                        <NavMenu>
                            <NavItem>
                                <NavLinks 
                                to='about' 
                                smooth={true}
                                duration={500}
                                spy={true}
                                exact='true'
                                offset={-80}
                                >
                                    About
                                </NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks 
                                to='discover'
                                smooth={true}
                                duration={500}
                                spy={true}
                                exact='true'
                                offset={-80}>
                                    Pattern Recognition
                                </NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks 
                                to='services'
                                smooth={true}
                                duration={500}
                                spy={true}
                                exact='true'
                                offset={-80}>
                                    Daily Workouts
                                </NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavDirectLink
                                    to="support">
                                    Support
                                </NavDirectLink>
                            </NavItem>
                        </NavMenu>
                        <NavBtn>
                            <NavBtnLink to="/login">
                                <NavbarLoginButton>
                                    Login
                                </NavbarLoginButton>
                                </NavBtnLink>
                                <NavBtnLink to="/signup">
                                <NavbarSignupButton>
                                    Sign Up
                                </NavbarSignupButton>
                                </NavBtnLink>
                            <NavBtnLink primary to="/signup">
                            </NavBtnLink>
                        </NavBtn>
                    </NavbarContainer>
                </Nav>
        </>
    );
};

export default Navbar

export const NavbarLoginButton = styled(Button)`
    color: #fff;
    font-weight: 600;
    opacity: 1;
    outline: 2px solid #fff;
    background: rgba(255,255,255, 0);
    max-width: 175px;
    margin: 0 12px;
`

export const NavbarSignupButton = styled(Button)`
    color: #1161d4;
    font-weight: 600;
    opacity: 1;
    background: rgba(255,255,255);
    max-width: 175px;
    margin: 0 12px;
`