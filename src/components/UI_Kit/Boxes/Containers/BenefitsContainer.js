import React, {useEffect, useState} from 'react'
import { BenefitsTitle, BenefitsWrapper } from './BenefitsContainerElements';
import {BenefitsData} from "../../../../data/BenefitsData"
import Benefits from './Benefits';
import { end } from 'chessground/drag';



const BenefitsContainer = (props) => {

    const puzzleType = props.moduleType

    const tacticBenefits = BenefitsData.filter(benefit => benefit.category === "tactics");
    const endgameBenefits = BenefitsData.filter(benefit => benefit.category === "endgames");
    const checkmateBenefits = BenefitsData.filter(benefit => benefit.category === "checkmates");

    console.log(tacticBenefits)
    console.log(endgameBenefits)
    console.log(checkmateBenefits)

    function returnBenefits(){
        if (puzzleType === "endgame") {
            return (
                <BenefitsTitle>
                {endgameBenefits.map((benefit, index) => {
                    return(
                       <Benefits key={index} {...benefit}/> 
                    )
                })}
                </BenefitsTitle>
            )
        } else if (puzzleType === "midgame") {
            return (
                <BenefitsTitle>
                {tacticBenefits.map((benefit, index) => {
                    return(
                       <Benefits key={index} {...benefit}/> 
                    )
                })}
                </BenefitsTitle>
            )
        } else if (puzzleType === "checkmate") {
            return (
                <BenefitsTitle>
                {checkmateBenefits.map((benefit, index) => {
                    return(
                       <Benefits key={index} {...benefit}/> 
                    )
                })}
                </BenefitsTitle>
            )
        }
    }

const renderBenefits = returnBenefits()


  
    return (
    <BenefitsWrapper>
        {renderBenefits}
    </BenefitsWrapper>
  )
}

export default BenefitsContainer



