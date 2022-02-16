import styled from "styled-components"

export const BenefitsWrapper = styled.div`
    display: flex;
    max-width: 1140px;
    flex-direction: column;
    width: 684px;
    /* border: 2px solid blue; */
`

export const BenefitsTitle = styled.h2`
    margin: 36px  24px 0px 24px;
    font-weight: 600;
    color: #54606c;

    @media screen and (max-width: 640px) {
        text-align: center;
    }
`

export const BenefitsImg = styled.img`
    max-height: 80px;
    max-width: 80px;
    margin-right: 24px;
`

export const BenefitsText = styled.span`
    font-size: 16px;
    font-weight: 300;
`

export const BenefitsFlexbox = styled.div`
    display: flex;
    align-items: center;
    margin: 12px 6px;
`
