import {HeroContainer, HeroBg, HeroContent, HeroP, HeroH1, HeroBtnWrapper, ArrowForward, ArrowRight, HeroCopy, HeroImg, AppInstallContainer, ScrollContainer, HeroBox} from './HeroElements';
import React, { useState, useEffect } from "react";//import { AuthContext } from "../Auth";
import styled from 'styled-components'
import Button from '../../UI_Kit/Button/Button';
import {NavBtnLink2} from "../NavBar/NavbarElements"
import heroImg from '../../../Images/chess-board.svg'
import { NavbarLoginButton } from '../NavBar/NavBar';
import checkerBackground from '../../../Images/checkerBackground.svg';
import chessRepsVertical from '../../../Images/ChessReps Logo Vertical BB2.png'
import downArrow from "../../../Images/downArrow.png";
import { Divider } from "./HeroElements";
import InfoSection from '../InfoSection/InfoSection';
import { homeObjOne, homeObjThree, homeObjTwo } from '../InfoSection/Data';

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
            <HeroBg src={checkerBackground}/>
            <HeroContent>
                <HeroImg src={chessRepsVertical}/>
                <HeroCopy>
                    <HeroP>
                        Get better at chess in less than 5 minutes a day
                    </HeroP>
                </HeroCopy>
                <ScrollContainer>
                    <img src={downArrow} alt='down arrow' style={{width: "60%"}}/>
                </ScrollContainer>

                {/* <HeroCopy>
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
                    )} */}
            </HeroContent>
            <Divider />

                    <InfoSection {...homeObjOne} />
            <Divider />
                    <InfoSection {...homeObjTwo} />
            <Divider />
                    <InfoSection {...homeObjThree} />
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

const HeroContentWide = styled(HeroContent)`
    width: 80%;
    max-width: 1200px;
    justify-content: center;
    align-items: center;

`

const HeroBoxWide = styled(HeroBox)`
    display: flex;
    width: 80%;
    max-width: 1200px;
    justify-content: center;
    align-items: center;
    height: auto;
`