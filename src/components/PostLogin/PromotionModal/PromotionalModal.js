import React, {useState} from 'react'
import {PromoModalContainer,
    PromoModalWrapper,
    PromoQueenWrapper,
    PromoRookWrapper,
    PromoBishopWrapper,
    PromoKnightWrapper,
    PromoQueenImg,
    PromoRookImg,
    PromoBishopImg,
    PromoKnightImg
} from "./PromotionalModalElements"
import queen from "../../Puzzle/chess/pieces/nova/wQ.svg";
import rook from "../../Puzzle/chess/pieces/nova/wR.svg";
import bishop from "../../Puzzle/chess/pieces/nova/wB.svg"
import knight from "../../Puzzle/chess/pieces/nova/wN.svg"

function PromotionalModal(props) {
    const {openModal, onPromotionSelection} = props;

    const handleSelection = e => {
        console.log({selection: e})
        onPromotionSelection(e);
    }

    return(
        <>
        {openModal ? 
        <PromoModalContainer>
            <PromoModalWrapper>
                <PromoQueenWrapper onClick={() => handleSelection("q")}>
                    <PromoQueenImg src={queen}/>
                </PromoQueenWrapper>
                <PromoRookWrapper onClick={() => handleSelection("r")}>
                    <PromoRookImg src={rook} />
                </PromoRookWrapper>
                <PromoBishopWrapper onClick={() => handleSelection("b")}>
                    <PromoBishopImg src={bishop} />
                </PromoBishopWrapper>
                <PromoKnightWrapper onClick={() => handleSelection("k")}>
                    <PromoKnightImg src={knight} />
                </PromoKnightWrapper>
            </PromoModalWrapper>
        </PromoModalContainer> 
        
        : null}
        </>
    )
}


export default PromotionalModal