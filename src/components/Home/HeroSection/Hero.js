import {HeroContainer, HeroBg, HeroContent, HeroP, HeroH1, HeroBtnWrapper, ArrowForward, ArrowRight} from './HeroElements';
import React, { useState, useEffect } from "react";//import { AuthContext } from "../Auth";
import {Button} from '../../ButtonElement'
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
                    <Button 
                    to="/signUp" 
                    onMouseEnter={onHover} 
                    onMouseLeave={onHover}
                    primary='true'
                    dark='true'>
                        Get Started {hover ? <ArrowForward/> : <ArrowRight/> }
                    </Button>
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
