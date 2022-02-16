import React, {useEffect, useState} from 'react'
import { BenefitsTitle, BenefitsWrapper } from './BenefitsContainerElements';
import {BenefitsData} from "../../../../data/BenefitsData"
import Benefits from './Benefits';
import { end } from 'chessground/drag';



const BenefitsContainer = (props) => {

    //puzzle category of module
    const puzzleType = props.moduleType

    //create new arrays that sort by benefits by category
    const tacticBenefits = BenefitsData.filter(benefit => benefit.category === "tactics");
    const endgameBenefits = BenefitsData.filter(benefit => benefit.category === "endgames");
    const checkmateBenefits = BenefitsData.filter(benefit => benefit.category === "checkmates");
    const openingBenefits = BenefitsData.filter(benefit => benefit.category === "openings");
    const lockedBenefits = BenefitsData.filter(benefit => benefit.pieces !== 'variable');

    console.log(lockedBenefits)

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
    const shuffledOpenings = shuffleBenefits(openingBenefits);

    //return the first 2 elements of the shuffled arrays
    const slicedTacticBenefits = shuffledTactics.slice(0,2);
    const slicedEndgameBenefits = shuffledEndgames.slice(0,2);
    const slicedCheckmateBenefits = shuffledCheckmates.slice(0,2);
    const slicedOpeningBenefits = shuffledOpenings.slice(0,2);


    function returnBenefits(){
        if (puzzleType === "endgame") {
            return (<>
                {slicedEndgameBenefits.map((benefit, index) => {
                    return(
                       <Benefits key={index} {...benefit}/> 
                    )
                })}
                </>
            )
        } else if (puzzleType === "midgame") {
            return (<>
                {slicedTacticBenefits.map((benefit, index) => {
                    return(
                       <Benefits key={index} {...benefit}/> 
                    )
                })}
                </>
            )
        } else if (puzzleType === "checkmate") {
            return (<>
                {slicedCheckmateBenefits.map((benefit, index) => {
                    return(
                       <Benefits key={index} {...benefit}/> 
                    )
                })}
                </> 
            )
        } else if (puzzleType === "openings") {
            return (<>
                {slicedOpeningBenefits.map((benefit, index) => {
                    return(
                       <Benefits key={index} {...benefit}/> 
                    )
                })}
                </> 
            )
        }
    }

const renderBenefits = returnBenefits()


  
    return (
        <>
            <BenefitsTitle>
                Benefits:
            </BenefitsTitle>
            <BenefitsWrapper>
                {renderBenefits}
            </BenefitsWrapper>
    </>
  )
}

export default BenefitsContainer



