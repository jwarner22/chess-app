import {animateScroll as scroll} from 'react-scroll'
import {FooterContainer, FooterWrap, SocialMedia, SocialMediaWrap, SocialLogo, WebsiteRights} from './FooterElements'

const Footer = () => {
    const toggleHome = () => {
        scroll.scrollToTop();
    }
    return (
        <FooterContainer>
            <FooterWrap>
                {/*<FooterLinksContainer>
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
                    </FooterLinkItems>
                    </FooterLinksWrapper>
                </FooterLinksContainer>*/}
                <SocialMedia>
                    <SocialMediaWrap>
                        <SocialLogo to= '/' onClick={toggleHome}>
                            ChessReps
                        </SocialLogo>
                        <WebsiteRights>ChessReps © {new Date().getFullYear()} All Rights Reserved</WebsiteRights>
                        {/* <SocialIcons>
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
                        </SocialIcons> */}
                    </SocialMediaWrap>
                </SocialMedia>
            </FooterWrap>
        </FooterContainer>
            
    )
}

export default Footer
