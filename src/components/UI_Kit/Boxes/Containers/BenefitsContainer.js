import React, {useEffect, useState} from 'react'
import { BenefitsTitle, BenefitsWrapper } from './BenefitsContainerElements';
import {BenefitsData} from "../../../../data/BenefitsData"
import Benefits from './Benefits';
import { end } from 'chessground/drag';



const BenefitsContainer = (props) => {

    const puzzleType = props.moduleType

    //create new arrays that sort by benefits by category
    const tacticBenefits = BenefitsData.filter(benefit => benefit.category === "tactics");
    const endgameBenefits = BenefitsData.filter(benefit => benefit.category === "endgames");
    const checkmateBenefits = BenefitsData.filter(benefit => benefit.category === "checkmates");

    //randomize arrays of benefits without repeating benefits
    function shuffleBenefits(array){
        var i = array.length,
        j = 0,
        temp;

    while (i--) {
        j = Math.floor(Math.random() * (i+1));

        // swap randomly chosen element with current element
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
    
    //shuffled arrays (full length)
    const shuffledTactics = shuffleBenefits(tacticBenefits);
    const shuffledEndgames = shuffleBenefits(endgameBenefits);
    const shuffledCheckmates = shuffleBenefits(checkmateBenefits);

    //return the first 2 elements of the shuffled arrays
    const slicedTacticBenefits = shuffledTactics.slice(0,2);
    const slicedEndgameBenefits = shuffledEndgames.slice(0,2);
    const slicedCheckmateBenefits = shuffledCheckmates.slice(0,2);


    function returnBenefits(){
        if (puzzleType === "endgame") {
            return (
                <BenefitsTitle>
                {slicedEndgameBenefits.map((benefit, index) => {
                    return(
                       <Benefits key={index} {...benefit}/> 
                    )
                })}
                </BenefitsTitle>
            )
        } else if (puzzleType === "midgame") {
            return (
                <BenefitsTitle>
                {slicedTacticBenefits.map((benefit, index) => {
                    return(
                       <Benefits key={index} {...benefit}/> 
                    )
                })}
                </BenefitsTitle>
            )
        } else if (puzzleType === "checkmate") {
            return (
                <BenefitsTitle>
                {slicedCheckmateBenefits.map((benefit, index) => {
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



