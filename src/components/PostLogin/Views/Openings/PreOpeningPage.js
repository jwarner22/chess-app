import React from 'react';
import PrePuzzleHeader from "./OpeningComponents/PrePuzzleHeader"
import {PuzzlePageContainer, 
    PrePuzzleWrapper, 
    PrePuzzleIconWrapper, 
    PrePuzzleTitle, 
    PrePuzzleSubheading, 
    PrePuzzleContentContainer, 
    StatsWrapper, 
    StatsGrid, 
    PuzzleElo, 
    HighScore, 
    InstructionsContainer, 
    InstructionsWrapper, 
    PuzzleEloTitle, 
    HighScoreTitle,
    TipsTitleWrapper,
    TipsTitle,
    TipsGrid,
    TipImageWrap,
    Tip1Image,
    TipDescriptionWrapper,
    Tip1Description,
    LeftStatWrapper,
RightStatWrapper} from "../../../PrePuzzle/PrePuzzleElements"
import {DailyPuzzleIcon} from "../DailyPuzzle/DailyPuzzleElements"
import { StartButton } from '../DailyPuzzle/ModalElements'
import {Modules} from '../PatternRecognition/CourseTiles/Data';
import puzzle from "../../../../Images/chessBoardHeader.png"
import { PreOpeningsIconWrapper,
PreOpeningPageContainer } from './PreOpeningsPageElements';
import PrePuzzleTile from './OpeningComponents/PrePuzzleTiles';

const PrePuzzlePage = (props) => {
    const img = Modules[3].img;
    const {openingsData, togglePrePuzzleCallback} = props;

    function handleStartButtonClick() {
        togglePrePuzzleCallback()
    }

    return (
        <PreOpeningPageContainer>
            <PrePuzzleHeader />
            <PrePuzzleTile openingsData={openingsData} onStartClick={handleStartButtonClick}/>
        </PreOpeningPageContainer>
    )
}

export default PrePuzzlePage