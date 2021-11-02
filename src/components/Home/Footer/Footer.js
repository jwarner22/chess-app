import React from 'react'
import {animateScroll as scroll} from 'react-scroll'
import {FooterContainer, FooterWrap, FooterLinksContainer, FooterLinksWrapper, FooterLinkTitle, FooterLink, FooterLinkItems, SocialMedia, SocialMediaWrap, SocialLogo, SocialIcons, SocialIconLink, WebsiteRights} from './FooterElements'
import {FaFacebook, FaInstagram, FaTwitter, FaYoutube} from 'react-icons/fa'

const Footer = () => {
    const toggleHome = () => {
        scroll.scrollToTop();
    }
    return (
        <FooterContainer>
            <FooterWrap>
                <FooterLinksContainer>
                    <FooterLinksWrapper>
                    <FooterLinkItems>
                        <FooterLinkTitle>Helpful Links</FooterLinkTitle>
                            <FooterLink to="signin">About Us</FooterLink> 
                            <FooterLink to="signin">How it Works</FooterLink>    
                            <FooterLink to="signin">Terms of Service</FooterLink>    
                            <FooterLink to="signin">Privacy Policy</FooterLink>    
                            {/*<FooterLink to="signin">Investors</FooterLink>   */} 
                    </FooterLinkItems>
                    {/*<FooterLinkItems>
                        <FooterLinkTitle>Helpful Links</FooterLinkTitle>
                            <FooterLink to="signin">About Us</FooterLink> 
                            <FooterLink to="signin">How it Works</FooterLink>    
                            <FooterLink to="signin">Terms of Service</FooterLink>    
                            <FooterLink to="signin">Privacy Policy</FooterLink>    
                            <FooterLink to="signin">Investors</FooterLink>    
                    </FooterLinkItems>
                    </FooterLinksWrapper>
                    <FooterLinksWrapper>
                    <FooterLinkItems>
                        <FooterLinkTitle>Helpful Links</FooterLinkTitle>
                            <FooterLink to="signin">About Us</FooterLink> 
                            <FooterLink to="signin">How it Works</FooterLink>    
                            <FooterLink to="signin">Terms of Service</FooterLink>    
                            <FooterLink to="signin">Privacy Policy</FooterLink>    
                            <FooterLink to="signin">Investors</FooterLink>    
                    </FooterLinkItems>
                    <FooterLinkItems>
                        <FooterLinkTitle>Helpful Links</FooterLinkTitle>
                            <FooterLink to="signin">About Us</FooterLink> 
                            <FooterLink to="signin">How it Works</FooterLink>    
                            <FooterLink to="signin">Terms of Service</FooterLink>    
                            <FooterLink to="signin">Privacy Policy</FooterLink>    
                            <FooterLink to="signin">Investors</FooterLink>    
                    </FooterLinkItems>*/}
                    </FooterLinksWrapper>
                </FooterLinksContainer>
                <SocialMedia>
                    <SocialMediaWrap>
                        <SocialLogo to= '/' onClick={toggleHome}>
                            Elo Elevation
                        </SocialLogo>
                        <WebsiteRights>Elo Elevation © {new Date().getFullYear()} All Rights Reserved</WebsiteRights>
                        <SocialIcons>
                            <SocialIconLink href='/' target='_blank' aria-label='Facebook'>
                                <FaFacebook />
                            </SocialIconLink>
                            <SocialIconLink href='/' target='_blank' aria-label='Instagram'>
                                <FaInstagram />
                            </SocialIconLink>
                            <SocialIconLink href='/' target='_blank' aria-label='Twitter'>
                                <FaTwitter />
                            </SocialIconLink>
                            <SocialIconLink href='/' target='_blank' aria-label='Youtube'>
                                <FaYoutube />
                            </SocialIconLink>
                        </SocialIcons>
                    </SocialMediaWrap>
                </SocialMedia>
            </FooterWrap>
        </FooterContainer>
            
    )
}

export default Footer
