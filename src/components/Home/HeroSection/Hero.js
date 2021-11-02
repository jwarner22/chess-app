import {HeroContainer, HeroBg, VideoBg, HeroContent, HeroP, HeroH1, HeroBtnWrapper, ArrowForward, ArrowRight} from './HeroElements';
import Video from '../../../Videos/Video.mp4';
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
//import { AuthContext } from "../Auth";
import {Button} from '../../ButtonElement'

const HeroSection = () => {
    // const { currentUser } = useContext(AuthContext);

    const [hover, setHover] = useState(false)

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
            </HeroContent>
        </HeroContainer>
    )
}

export default HeroSection
