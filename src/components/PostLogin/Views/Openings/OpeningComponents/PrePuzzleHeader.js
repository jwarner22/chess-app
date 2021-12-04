import React from 'react'
import {PreOpeningsIconWrapper} from "../PreOpeningsPageElements"
import {DailyPuzzleIcon} from "../../DailyPuzzle/DailyPuzzleElements"
import puzzle from "../../../../../Images/chessBoardHeader.png"

const PrePuzzleHeader = () => {
    return (
        <div>
            <PreOpeningsIconWrapper>
                <DailyPuzzleIcon src={puzzle} />
            </PreOpeningsIconWrapper> 
        </div>
    )
}

export default PrePuzzleHeader
