import React from 'react'
import { BrandPageContainer, BrandPageLogo, BrandPageLogoWrapper } from './BrandPageElements'
import logo from "../../Images/eloElevationWhite.png"
import {useTransition, animated} from 'react-spring'

const BrandPage = () => {
    return (
        <div>
            <BrandPageContainer>
                <BrandPageLogoWrapper>
                    <BrandPageLogo src={logo}/>
                </BrandPageLogoWrapper>
            </BrandPageContainer>
        </div>
    )
}

export default BrandPage
