import React from 'react'
import {DailyPuzzleModuleStyle,
DailyPuzzleIconWrapper,
DailyPuzzleIcon,
PuzzleModuleTitle,
PuzzleDescripton,
PuzzleWrapper,

} from "./DailyPuzzleElements"

const DailyPuzzleModuleContainer = (props) => {
    
    return (
        <>
        {/* <PuzzleWrapper> */}
            <DailyPuzzleModuleStyle>
            <DailyPuzzleIconWrapper>
                <DailyPuzzleIcon src={props.img}/>
            </DailyPuzzleIconWrapper>
            <PuzzleModuleTitle>
                {props.headline}
            </PuzzleModuleTitle>
            <PuzzleDescripton>
                {props.description}
            </PuzzleDescripton>
            </DailyPuzzleModuleStyle>
        {/* </PuzzleWrapper> */}
        </>
    )
}

export default DailyPuzzleModuleContainer
