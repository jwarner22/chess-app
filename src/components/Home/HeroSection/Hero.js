import {HeroContainer, HeroBg, HeroContent, HeroP, HeroH1, HeroBtnWrapper, ArrowForward, ArrowRight, HeroCopy, HeroImg, AppInstallContainer} from './HeroElements';
import React, { useState, useEffect } from "react";//import { AuthContext } from "../Auth";
import styled from 'styled-components'
import Button from '../../UI_Kit/Button/Button';
import {NavBtnLink2} from "../NavBar/NavbarElements"
import heroImg from '../../../Images/chess-board.svg'
import { NavbarLoginButton } from '../NavBar/NavBar';

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
                <HeroH1 color={"#243862"}>
                    Stop Playing.           
                </HeroH1>
                <HeroH1 color={"#fff"}>
                    Start Winning.            
                </HeroH1>
                <HeroP>
                    Bite-sized chess training personalized for you.                
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
                        <NavBtnLink2 to='/login'><NavbarLoginButton>Login</NavbarLoginButton></NavBtnLink2> ) : (
                        null
                    )}
            </HeroContent>
            <div style={{marginTop: "40px", cursor: "pointer", position: "relative", zIndex: "8999"}}>
            <a href='https://play.google.com/store/apps/details?id=io.chessreps.twa&hl=en_US&gl=US&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                <AppInstallContainer  alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/>
            </a>
            </div>
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