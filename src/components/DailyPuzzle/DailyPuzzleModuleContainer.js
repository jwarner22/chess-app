import React from 'react'
import {DailyPuzzleModuleStyle,
DailyPuzzleIconWrapper,
DailyPuzzleIcon,
PuzzleModuleTitle,
PuzzleDescripton,
PuzzleWrapper,

} from "./DailyPuzzleElements"

const DailyPuzzleModuleContainer = ({
    img
}) => {
    return (
        <>
        {/* <PuzzleWrapper> */}
            <DailyPuzzleModuleStyle>
            <DailyPuzzleIconWrapper>
                <DailyPuzzleIcon src={img}/>
            </DailyPuzzleIconWrapper>
            <PuzzleModuleTitle>
                Test Module
            </PuzzleModuleTitle>
            <PuzzleDescripton>
                Lorum Ipsum Lorum Ipsum Lorum Ipsum Lorum Ipsum Lorum Ipsum
            </PuzzleDescripton>
            </DailyPuzzleModuleStyle>
        {/* </PuzzleWrapper> */}
        </>
    )
}

export default DailyPuzzleModuleContainer
