import React from 'react'
import styled from "styled-components"

const BlackIndicator = () => {
    return (
        <BlackIndicatorContainer>
            <BlackIndicatorText>
            Black to move
            </BlackIndicatorText>
        </BlackIndicatorContainer>
    )
}

export default BlackIndicator

const BlackIndicatorContainer = styled.div`
    padding: 8px;
    display: flex;
    background: #000;
    border-radius: 5px;
    margin-top: 12px;
`

const BlackIndicatorText = styled.span`
    color: #fff;
    font-weight: 600;
`