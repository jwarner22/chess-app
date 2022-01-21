import React from 'react'
import { 
    PrePuzzleWrapper, 
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
RightStatWrapper} from "../../../../PrePuzzle/PrePuzzleElements"
import { StartButton } from '../../DailyPuzzle/ModalElements'

const PrePuzzleTile = (props) => {

    return (
        <div>
    <PrePuzzleWrapper>
        <PrePuzzleTitle>
            {props.openingData.headline}
        </PrePuzzleTitle>
        <PrePuzzleSubheading>
            Opening Training
        </PrePuzzleSubheading>
        <PrePuzzleContentContainer>
            <StatsWrapper>
                <StatsGrid>
                    <LeftStatWrapper>
                    <PuzzleEloTitle>
                        High Score
                    </PuzzleEloTitle>
                    </LeftStatWrapper>
                    <PuzzleElo>
                        {props.userOpeningData.high_score}
                    </PuzzleElo>
                    <RightStatWrapper>
                    <HighScoreTitle>
                        Completions
                    </HighScoreTitle>
                    </RightStatWrapper>
                    <HighScore>
                        {props.userOpeningData.completed}
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
                        <StartButton onClick={props.onStartClick}>
                            Start
                        </StartButton>
                    </InstructionsContainer>
                </PrePuzzleContentContainer>
            </PrePuzzleWrapper>
        </div>
    )
}

export default PrePuzzleTile
