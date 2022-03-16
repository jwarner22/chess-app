import {HeroContainer, HeroBg, HeroContent, HeroP, HeroH1, HeroBtnWrapper, ArrowForward, ArrowRight, HeroCopy, HeroImg} from './HeroElements';
import React, { useState, useEffect } from "react";//import { AuthContext } from "../Auth";
import styled from 'styled-components'
import Button from '../../UI_Kit/Button/Button';
import {NavBtnLink2} from "../NavBar/NavbarElements"
import heroImg from '../../../Images/chess-board.svg'

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
                <HeroCopy>
                <HeroH1 color={'#a9a9a9'}>
                    Stop Playing              
                </HeroH1>
                <HeroH1 color={'#fff'}>
                    Start Winning            
                </HeroH1>
                <HeroP>
                    Elevate your elo by improving your pattern recognition.               
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
                </HeroCopy>
                <HeroImg src={heroImg} />
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
    background: #fff;
    color: #243862;
`