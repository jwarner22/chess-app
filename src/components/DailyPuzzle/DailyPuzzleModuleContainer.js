import React from 'react'
import {DailyPuzzleModuleStyle,
DailyPuzzleIconWrapper,
DailyPuzzleIcon,
PuzzleModuleTitle,
PuzzleDescripton,
Col2Row1,
Col2Row2
} from "./DailyPuzzleElements"

const DailyPuzzleModuleContainer = (props) => {
    
    return (
        <>
        {/* <PuzzleWrapper> */}
            <DailyPuzzleModuleStyle props={props}>
            <DailyPuzzleIconWrapper>
                <DailyPuzzleIcon src={props.img}/>
            </DailyPuzzleIconWrapper>
            <Col2Row1>
            <PuzzleModuleTitle>
                {props.headline}
            </PuzzleModuleTitle>
            </Col2Row1>
            <Col2Row2>
            <PuzzleDescripton>
                {props.subheading}
            </PuzzleDescripton>
            </Col2Row2>
            </DailyPuzzleModuleStyle>
        {/* </PuzzleWrapper> */}
        </>
    )
}

export default DailyPuzzleModuleContainer
