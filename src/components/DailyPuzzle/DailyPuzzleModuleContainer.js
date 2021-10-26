import React from 'react'
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
import check from "../../Images/check.png"

const DailyPuzzleModuleContainer = (props) => {
    
    return (
        <>
        {/* <PuzzleWrapper> */}
            <DailyPuzzleModuleStyle props={props}>
            <DailyPuzzleIconWrapper>
                <DailyPuzzleIcon src={props.img}/>
            </DailyPuzzleIconWrapper>
            <Col2Row1>
                <CompletedCheck src={check} />
            </Col2Row1>
            <Col2Row2>
            <PuzzleModuleTitle>
                {props.headline}
            </PuzzleModuleTitle>
            </Col2Row2>
            <Col2Row3>
            <PuzzleDescripton>
                {props.subheading}
            </PuzzleDescripton>
            </Col2Row3>
            </DailyPuzzleModuleStyle>
        {/* </PuzzleWrapper> */}
        </>
    )
}

export default DailyPuzzleModuleContainer
