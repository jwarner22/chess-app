import styled from 'styled-components'
import {MdKeyboardArrowRight} from '@react-icons/all-files/md/MdKeyboardArrowRight'
import {MdArrowForward} from '@react-icons/all-files/md/MdArrowForward'

export const HeroContainer =styled.div`
        background: linear-gradient(220.55deg, #3793FF 0%, #0017E4 100%);
// same gradient as login page
    /* background: linear-gradient(
    108deg,
    rgba(22, 159, 219, 1) 0%,
    rgba(36, 124, 241, 1) 100%
  ); */
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    height: 800px;
    position: relative;
    z-index: 1;

    :before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        //dark overlay on hero image
        /* background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0, 0, 0, 0.6) 100%),
        linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 100%); */
        z-index: 2;
    }
`

export const HeroBg = styled.img `
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`

export const VideoBg = styled.video `
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    background: #232a34;
`

export const HeroContent = styled.div`
    z-index: 3;
    max-width: 1200px;
    position: absolute;
    padding: 8px 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    flex-direction: column;
    align-items: center;
    
    @media screen and (max-width: 640px){
        display: flex;
    }
`

export const HeroBox = styled.div`
    background: #fff;
    width: 30rem;
    height: 30rem;
    border-radius: 15px;
    opacity: 0.9;
    z-index: -1;
`

export const HeroCopy = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 15px;

    @media screen and (max-width: 640px){
        align-items: center;
        max-width: 400px;
    }
`
export const HeroImg = styled.img`
    width: 100%;
    max-height: 120%;
    margin: 0 auto;
`

export const HeroH1 = styled.h1`
    text-align: left;
    color: ${({color}) => color};
    font-size: 48px;
    opacity: 0.95;
    
    @media screen and (max-width: 640px) {
        font-size: 40px;
        text-align: center;
    }

    @media screen and (max-width: 480px) {
        font-size: 32px;
    }
`

export const HeroP = styled.p`
    margin-top: 24px;
    color: #fff;
    font-size: 24px;
    text-align: left;
    max-width: 600px;
    text-align: left;
    font-weight: 400;
    opacity: 0.95;

    @media screen and (max-width: 640px) {
        font-size: 24px;
        text-align: center;
    }

    @media screen and (max-width: 480px) {
        font-size: 18px;
    }    
`

export const HeroBtnWrapper = styled.div`
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 18px;
`

export const ScrollContainer = styled.div`
    background: #1161d4;
    width: 60px;
    border-radius: 50%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

export const ArrowForward = styled(MdArrowForward)`
    margin-left: 8px;
    font-size: 20px;
`

export const ArrowRight = styled(MdKeyboardArrowRight)`
    margin-left: 8px;
    font-size: 20px;
`
export const AppInstallContainer = styled.img`
    max-width: 200px;
    cursor: pointer;
`
export const Divider = styled.hr`
    border: 0;
    padding: 0;
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    height: 150px;

    ::before {
        content: '';
        display: inline-block;
        max-width: 100%;
        vertical-align: middle;
        border-left: dotted 7px #1161d4;
        width: 7px;
    }
`