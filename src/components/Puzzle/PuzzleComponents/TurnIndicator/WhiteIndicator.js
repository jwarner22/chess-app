import React from 'react'
import styled from "styled-components"
import whitePiece from "../../chess/pieces/nova/wN.svg"

const WhiteIndicator = () => {
    return (
        <WhiteIndicatorContainer>
            <WhiteIndicatorIcon src={whitePiece} />
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
    max-width: 400px;
    background: rgba(86,82,82, 0.5);
    border-radius: 5px;
    margin-top: 8px;
`

const WhiteIndicatorText = styled.span`
    color: #fff;
    font-weight: 600;
    margin: auto;
`

const WhiteIndicatorIcon = styled.img`
    max-width: 30px;
    margin-right: 8px;
`