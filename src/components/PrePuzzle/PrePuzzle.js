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
RightStatWrapper,
PrePuzzleTileContainer} from "./PrePuzzleElements"
import {DailyPuzzleIcon} from "../PostLogin/Views/DailyPuzzle/DailyPuzzleElements"
import { StartButton } from '../PostLogin/Views/DailyPuzzle/ModalElements'
import {Modules} from '../PostLogin/Views/PatternRecognition/CourseTiles/Data';

const PrePuzzlePage = (props) => {
    console.log({props: props})
    const module = Modules.find(element => element.id === props.moduleData.id)

    function handleStartButtonClick() {
        props.togglePrePuzzleCallback()
    }

    function handleSwapButtonClick() {
        props.swapModule();
    }

    return (
        <PuzzlePageContainer>
                <PrePuzzleIconWrapper>
                    <DailyPuzzleIcon src={module.img} />
                </PrePuzzleIconWrapper>
                <PrePuzzleTileContainer>
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
                                    Rating
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
                                    <div>
                                    <StartButton onClick={handleStartButtonClick}>
                                        Start
                                    </StartButton>
                                    {props.isDaily ? <StartButton onClick={handleSwapButtonClick}>
                                        Swap
                                    </StartButton> : null}
                                    </div>
                                </InstructionsContainer>
                            </PrePuzzleContentContainer>
                        </PrePuzzleWrapper>
                        </PrePuzzleTileContainer>
                    </PuzzlePageContainer>
    )
}

export default PrePuzzlePage