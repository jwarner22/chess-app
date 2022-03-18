import {useRef, useEffect, useState} from 'react'
import { BrandPageContainer, BrandPageLogo, BrandPageLogoWrapper } from './BrandPageElements'
import logo from "../../Images/eloElevationWhite.png"
import {useTransition} from 'react-spring'
import useRouter from '../../hooks/useRouter'

const BrandPage = (props) => {
    const {openSplash} = props
    
    const splashTransition = useTransition( openSplash, {
        from: {opacity: 0},
        enter: {opacity: 1},
        leave: {opacity: 0},
    });
     
    return (<>
            {splashTransition((style, item) => 
            item ? <BrandPageContainer style={style} >
            <BrandPageLogoWrapper>
                <BrandPageLogo src={logo}  />
            </BrandPageLogoWrapper>
        </BrandPageContainer> : null )}
        </>
    )
}

export default BrandPage
