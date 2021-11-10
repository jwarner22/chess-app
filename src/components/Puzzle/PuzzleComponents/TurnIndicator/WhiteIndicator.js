import React from 'react'
import styled from "styled-components"

const WhiteIndicator = () => {
    return (
        <WhiteIndicatorContainer>
            <WhiteIndicatorText>
            White to move
            </WhiteIndicatorText>
        </WhiteIndicatorContainer>
    )
}

export default WhiteIndicator

const WhiteIndicatorContainer = styled.div`
    padding: 8px;
    display: flex;
    background: #fff;
    border-radius: 5px;
    margin-top: 12px;
    border: 1px solid #000;
`

const WhiteIndicatorText = styled.span`
    color: #000;
    font-weight: 600;
`