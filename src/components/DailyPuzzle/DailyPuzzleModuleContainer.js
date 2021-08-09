import React from 'react'
import {DailyPuzzleModuleStyle,
DailyPuzzleIconWrapper,
DailyPuzzleIcon,
PuzzleModuleTitle,
PuzzleDescripton
} from "./DailyPuzzleElements"

const DailyPuzzleModuleContainer = ({
    img
}) => {
    return (
        <>
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
        </>
    )
}

export default DailyPuzzleModuleContainer
