import React from 'react'
import Button from '../../UI_Kit/Button/Button'
import { ButtonStyle } from '../../UI_Kit/Button/ButtonElements'
import { AppInstallContainer } from '../HeroSection/HeroElements'
import { NavBtnLink } from '../NavBar/NavbarElements'
import {InfoContainer, 
    InfoWrapper, 
    InfoRow, 
    Column1, 
    Column2, 
    TextWrapper, 
    TopLine,  
    Heading, 
    Subtitle, 
    BtnWrap, 
    ImgWrap, 
    Img,
    DownloadContainer} from './InfoElements'


const InfoSection = ({lightBg, 
    id, 
    imgStart, 
    topLine, 
    lightText, 
    headline, 
    darkText,
    description, 
    buttonLabel, 
    img, 
    alt,
    primary, 
    dark, 
    dark2 
}) => {

    return (
        <>
            <InfoContainer lightBg={lightBg} id={id}>
                <InfoWrapper>
                    <InfoRow imgStart={imgStart}>
                        <Column1>
                            <TextWrapper>
                                <TopLine>{topLine}</TopLine>
                                <Heading lightText={lightText} >{headline}</Heading>
                                <Subtitle darkText={darkText} >{description}</Subtitle> 
                                <DownloadContainer>
                                <div style={{cursor: "pointer", position: "relative", zIndex: "8999"}}>
                                    <a href='https://play.google.com/store/apps/details?id=io.chessreps.twa&hl=en_US&gl=US&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                                        <AppInstallContainer alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/>
                                    </a>
                                </div>
                                <span style={{color: "black", marginBottom: "20px"}} >Or</span>
                                <NavBtnLink to='/signup' style={{zIndex: "9999"}}>
                                <Button style={{background: "#1161d4", color: "#fff", zIndex: "9999"}}>
                                    Signup Now
                                </Button>
                                </NavBtnLink>
                                </DownloadContainer>
                            </TextWrapper>
                        </Column1>
                        <Column2>
                            <ImgWrap>
                                <Img src={img} alt={alt}/>
                            </ImgWrap>
                        </Column2>
                    </InfoRow>
                </InfoWrapper>
            </InfoContainer>
            
        </>
    )
}

export default InfoSection
