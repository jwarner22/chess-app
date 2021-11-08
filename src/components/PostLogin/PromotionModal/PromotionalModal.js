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

function PromotionalModal({openModal, setOpenModal}) {
    return(
        <>
        {openModal ? 
        <PromoModalContainer>
            <PromoModalWrapper>
                <PromoQueenWrapper>
                    <PromoQueenImg src={queen}/>
                </PromoQueenWrapper>
                <PromoRookWrapper>
                    <PromoRookImg src={rook} />
                </PromoRookWrapper>
                <PromoBishopWrapper>
                    <PromoBishopImg src={bishop} />
                </PromoBishopWrapper>
                <PromoKnightWrapper>
                    <PromoKnightImg src={knight} />
                </PromoKnightWrapper>
            </PromoModalWrapper>
        </PromoModalContainer> 
        
        : null}
        </>
    )
}

export default PromotionalModal