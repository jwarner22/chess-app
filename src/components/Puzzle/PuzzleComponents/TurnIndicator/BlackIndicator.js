import React from 'react'
import styled from "styled-components"
import blackPiece from "../../chess/pieces/nova/bN.svg"

const BlackIndicator = () => {
    return (
        <BlackIndicatorContainer>
            <BlackIndicatorIcon src={blackPiece} />
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
    max-width: 400px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    margin-top: 8px;
`

const BlackIndicatorText = styled.span`
    color: #565252;
    font-weight: 600;
    margin: auto;
`
const BlackIndicatorIcon = styled.img`
    max-width: 30px;
    margin-right: 8px;
`

