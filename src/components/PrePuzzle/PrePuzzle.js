import React from 'react'
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
RightStatWrapper} from "./PrePuzzleElements"
import {DailyPuzzleIcon} from "../DailyPuzzle/DailyPuzzleElements"
import testIcon from "../../Images/EnPassant.svg"
import { StartButton } from '../DailyPuzzle/ModalElements'
import {Modules} from '../PostLogin/CoursesBody/CourseTile/Data.js';

const PrePuzzlePage = (props) => {
    const moduleId = props.moduleId;
    const module = Modules.find(element => element.id === moduleId)

    function handleStartButtonClick() {
        props.togglePrePuzzleCallback()
    }

    return (
        <PuzzlePageContainer>
                <PrePuzzleIconWrapper>
                    <DailyPuzzleIcon src={module.img} />
                </PrePuzzleIconWrapper>
                <PrePuzzleWrapper>
                    <PrePuzzleTitle>
                        {module.headline}
                    </PrePuzzleTitle>
                    <PrePuzzleSubheading>
                        Pattern Recognition
                    </PrePuzzleSubheading>
                    <PrePuzzleContentContainer>
                        <StatsWrapper>
                            <StatsGrid>
                                <LeftStatWrapper>
                                <PuzzleEloTitle>
                                    {module.headline} Rating
                                </PuzzleEloTitle>
                                </LeftStatWrapper>
                                <PuzzleElo>
                                    {props.rating}
                                </PuzzleElo>
                                <RightStatWrapper>
                                <HighScoreTitle>
                                    High Score
                                </HighScoreTitle>
                                </RightStatWrapper>
                                <HighScore>
                                    {props.highScore}
                                </HighScore>
                            </StatsGrid>
                        </StatsWrapper>
                        <InstructionsContainer>
                            <InstructionsWrapper>
                                <TipsTitleWrapper>
                                        <TipsTitle>
                                            Instructions:
                                        </TipsTitle>
                                    </TipsTitleWrapper>
                                        <TipsGrid>
                                            <TipImageWrap>
                                                <Tip1Image />
                                            </TipImageWrap>
                                            <TipDescriptionWrapper>
                                                <Tip1Description>
                                                    {module.instructions} 
                                                </Tip1Description>
                                            </TipDescriptionWrapper>
                                        </TipsGrid>
                                    </InstructionsWrapper>
                                    <StartButton onClick={handleStartButtonClick}>
                                        Start Puzzle
                                    </StartButton>
                                </InstructionsContainer>
                            </PrePuzzleContentContainer>
                        </PrePuzzleWrapper>
                    </PuzzlePageContainer>
    )
}

export default PrePuzzlePage