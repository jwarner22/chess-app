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
    LeftStatWrapper} from "./PrePuzzleElements"
import {DailyPuzzleIcon} from "../DailyPuzzle/DailyPuzzleElements"
import testIcon from "../../Images/EnPassant.svg"
import { StartButton } from '../DailyPuzzle/ModalElements'


const PrePuzzlePage = () => {
    return (
        <PuzzlePageContainer>
            <PrePuzzleWrapper>
                <PrePuzzleIconWrapper>
                    <DailyPuzzleIcon src={testIcon} />
                </PrePuzzleIconWrapper>
                <PrePuzzleTitle>
                 EnPassant
                </PrePuzzleTitle>
                <PrePuzzleSubheading>
                    Pattern Recognition
                </PrePuzzleSubheading>
                <PrePuzzleContentContainer>
                    <StatsWrapper>
                        <StatsGrid>
                            <LeftStatWrapper>
                            <PuzzleEloTitle>
                                EnPassant Elo
                            </PuzzleEloTitle>
                            </LeftStatWrapper>
                            <PuzzleElo>
                                1200
                            </PuzzleElo>
                            <HighScoreTitle>
                                High Score
                            </HighScoreTitle>
                            <HighScore>
                                2,364,246
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
                                                I'm a description. I'm describing how to do something important to the user. 
                                            </Tip1Description>
                                        </TipDescriptionWrapper>
                                    </TipsGrid>
                                </InstructionsWrapper>
                                <StartButton>
                                    Start Puzzle
                                </StartButton>
                            </InstructionsContainer>
                        </PrePuzzleContentContainer>
                    </PrePuzzleWrapper>
                 </PuzzlePageContainer>
    )
}

export default PrePuzzlePage