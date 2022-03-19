import {useRef, useEffect, useState} from 'react'
import { BrandPageContainer, BrandPageLogo, BrandPageLogoWrapper } from './BrandPageElements'
import logo from "../../Images/eloElevationWhite.png"
import {useTransition} from 'react-spring'
import useRouter from '../../hooks/useRouter'

const BrandPage = () => {
    
    // const splashTransition = useTransition( openSplash, {
    //     from: {opacity: 0},
    //     enter: {opacity: 1},
    //     leave: {opacity: 0},
    //     config: {
    //         duration: 3000
    //     }
    // });
     
    return (<>
           <BrandPageContainer>
            <BrandPageLogoWrapper>
                <BrandPageLogo src={logo}  />
            </BrandPageLogoWrapper>
        </BrandPageContainer>
        </>
    )
}

export default BrandPage
