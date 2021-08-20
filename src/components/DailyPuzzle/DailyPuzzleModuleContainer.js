import React from 'react'
import {DailyPuzzleModuleStyle,
DailyPuzzleIconWrapper,
DailyPuzzleIcon,
PuzzleModuleTitle,
PuzzleDescripton
} from "./DailyPuzzleElements"

const DailyPuzzleModuleContainer = (props) => {
    
    return (
        <>
        {/* <PuzzleWrapper> */}
            <DailyPuzzleModuleStyle props={props}>
            <DailyPuzzleIconWrapper>
                <DailyPuzzleIcon src={props.img}/>
            </DailyPuzzleIconWrapper>
            <PuzzleModuleTitle>
                {props.headline}
            </PuzzleModuleTitle>
            <PuzzleDescripton>
                {props.subheading}
            </PuzzleDescripton>
            </DailyPuzzleModuleStyle>
        {/* </PuzzleWrapper> */}
        </>
    )
}

export default DailyPuzzleModuleContainer
