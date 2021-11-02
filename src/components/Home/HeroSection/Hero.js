import {HeroContainer, HeroBg, HeroContent, HeroP, HeroH1, HeroBtnWrapper, ArrowForward, ArrowRight} from './HeroElements';
import React, { useState } from "react";//import { AuthContext } from "../Auth";
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
