import {useRef} from 'react'
import { BrandPageContainer, BrandPageLogo, BrandPageLogoWrapper } from './BrandPageElements'
import logo from "../../Images/eloElevationWhite.png"
import {useTransition, useSpring, animated} from 'react-spring'
import useRouter from '../../hooks/useRouter'

const BrandPage = () => {
    const containerRef = useRef();

    const containerStyle = useSpring({
        from: {
            opacity: 0
        },
        to: {
            opacity: 1
        }
    });

    const {location} = useRouter;
    
    return (
        <>
            <BrandPageContainer style={containerStyle}>
                <BrandPageLogoWrapper>
                    <BrandPageLogo src={logo}/>
                </BrandPageLogoWrapper>
            </BrandPageContainer>
        </>
    )
}

export default BrandPage
