import React from 'react'
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
import queen from "../../Module/chess/pieces/nova/wQ.svg";
import rook from "../../Module/chess/pieces/nova/wR.svg";
import bishop from "../../Module/chess/pieces/nova/wB.svg"
import knight from "../../Module/chess/pieces/nova/wN.svg"

function PromotionalModal(props) {
    const {openModal, onPromotionSelection} = props;

    const handleSelection = e => {
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