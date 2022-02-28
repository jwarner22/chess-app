import {HeroContainer, HeroBg, HeroContent, HeroP, HeroH1, HeroBtnWrapper, ArrowForward, ArrowRight} from './HeroElements';
import React, { useState, useEffect } from "react";//import { AuthContext } from "../Auth";
import styled from 'styled-components'
import Button from '../../UI_Kit/Button/Button';
import {NavBtnLink2} from "../NavBar/NavbarElements"

const HeroSection = () => {
    // const { currentUser } = useContext(AuthContext);

    const [hover, setHover] = useState(false)
    const [windowDimension, setWindowDimension] = useState(null);

    useEffect(() => {
      setWindowDimension(window.innerWidth);
    }, []);
  
    useEffect(() => {
      function handleResize() {
        setWindowDimension(window.innerWidth);
      }
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    const isMobile = windowDimension <= 640;

    const onHover = () => {
        setHover(!hover)
    }

    return (
        <HeroContainer id='home'>
            <HeroBg>
            </HeroBg>
            <HeroContent>
                <HeroH1>
                    Learning Chess               
                </HeroH1>
                <HeroP>
                    Made Simple.               
                </HeroP>
                <HeroBtnWrapper>
                    <NavBtnLink2 to="/signUp" >
                    <HeroButton 
                    onMouseEnter={onHover} 
                    onMouseLeave={onHover}
                    primary='true'
                    dark='true'>
                        Get Started {hover ? <ArrowForward/> : <ArrowRight/> }
                    </HeroButton>
                    </NavBtnLink2>
                </HeroBtnWrapper>
                {isMobile ? (
                        <NavBtnLink2 to="/login">Login</NavBtnLink2> ) : (
                        null
                    )}
            </HeroContent>
        </HeroContainer>
    )
}

export default HeroSection

const HeroButton = styled(Button)`
    display: flex;
    align-items: center;
    font-weight: 600;
`