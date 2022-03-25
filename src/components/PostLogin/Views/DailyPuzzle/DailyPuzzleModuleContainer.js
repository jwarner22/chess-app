import React from 'react';
import {DailyPuzzleModuleStyle,
DailyPuzzleIconWrapper,
DailyPuzzleIcon,
PuzzleModuleTitle,
PuzzleDescripton,
Col2Row1,
Col2Row2,
Col2Row3,
CompletedCheck
} from "./DailyPuzzleElements"

import check from "../../../../Images/check.png"
import {QuestionIcon} from "./DailyPuzzleElements"


const DailyPuzzleModuleContainer = (props) => {

    return (
        <>
            <DailyPuzzleModuleStyle 

            locked={props.locked}
            type={props.type}
            >
            <DailyPuzzleIconWrapper>
                {props.locked ? <QuestionIcon />:<DailyPuzzleIcon src={props.img}/>}
            </DailyPuzzleIconWrapper>
            <Col2Row1 props={props}>
            <CompletedCheck src={check} completed={props.completed}/> 
            </Col2Row1>
            <Col2Row2>
            <PuzzleModuleTitle>
                {!props.locked && props.headline}
            </PuzzleModuleTitle>
            </Col2Row2>
            <Col2Row3>
            <PuzzleDescripton>
                {!props.locked && props.subheading}
            </PuzzleDescripton>
            </Col2Row3>
            </DailyPuzzleModuleStyle>
        </>
    )
}

export default DailyPuzzleModuleContainer
