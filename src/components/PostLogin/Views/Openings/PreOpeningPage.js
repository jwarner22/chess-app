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
RightStatWrapper} from "../../../PrePuzzle/PrePuzzleElements"
import {DailyPuzzleIcon} from "../DailyPuzzle/DailyPuzzleElements"
import { StartButton } from '../DailyPuzzle/ModalElements'
import {Modules} from '../PatternRecognition/CourseTiles/Data';

const PrePuzzlePage = (props) => {
    const img = Modules[3].img;
    const {openingsData, togglePrePuzzleCallback} = props;

    function handleStartButtonClick() {
        togglePrePuzzleCallback()
    }

    return (
        <PuzzlePageContainer>
                <PrePuzzleIconWrapper>
                    <DailyPuzzleIcon src={img} />
                </PrePuzzleIconWrapper>
                <PrePuzzleWrapper>
                    <PrePuzzleTitle>
                        {openingsData.headline}
                    </PrePuzzleTitle>
                    <PrePuzzleSubheading>
                        Opening Training
                    </PrePuzzleSubheading>
                    <PrePuzzleContentContainer>
                        <StatsWrapper>
                            <StatsGrid>
                                <LeftStatWrapper>
                                <PuzzleEloTitle>
                                    Rating
                                </PuzzleEloTitle>
                                </LeftStatWrapper>
                                <PuzzleElo>
                                    100
                                </PuzzleElo>
                                <RightStatWrapper>
                                <HighScoreTitle>
                                    High Score
                                </HighScoreTitle>
                                </RightStatWrapper>
                                <HighScore>
                                    0
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
                                                    Replicate the opening moves... 
                                                </Tip1Description>
                                            </TipDescriptionWrapper>
                                        </TipsGrid>
                                    </InstructionsWrapper>
                                    <StartButton onClick={handleStartButtonClick}>
                                        Start
                                    </StartButton>
                                </InstructionsContainer>
                            </PrePuzzleContentContainer>
                        </PrePuzzleWrapper>
                    </PuzzlePageContainer>
    )
}

export default PrePuzzlePage