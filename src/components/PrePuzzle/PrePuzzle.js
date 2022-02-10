import React from 'react'
import styled from "styled-components"
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
PrePuzzleTileContainer} from "./PrePuzzleElements";
import Button from "../UI_Kit/Button/Button"
import {DailyPuzzleIcon} from "../PostLogin/Views/DailyPuzzle/DailyPuzzleElements"
import { StartButton } from '../PostLogin/Views/DailyPuzzle/ModalElements'
import {Modules} from '../PostLogin/Views/PatternRecognition/CourseTiles/Data';
import { BackButtonWrapper } from '../Puzzle/Utilities/Progress';
import BackButton from '../BackButton';

const PrePuzzlePage = (props) => {
    const module = Modules.find(element => element.type_ref === props.moduleData.theme)

    function handleStartButtonClick() {
        props.togglePrePuzzleCallback()
    }

    function handleSwapButtonClick() {
        props.swapModule();
    }
    console.log(props.moduleData)

    return (
        <PuzzlePageContainer>
            <BackButtonWrapper>
                <BackButton />
            </BackButtonWrapper>
                <PrePuzzleIconWrapper type={module.type}>
                    <DailyPuzzleIcon src={module.img} />
                </PrePuzzleIconWrapper>
                <PrePuzzleTileContainer>
                <PrePuzzleWrapper>
                    <PrePuzzleTitle>
                        {module.headline}
                    </PrePuzzleTitle>
                    <PrePuzzleSubheading>
                        {module.subheading}
                    </PrePuzzleSubheading>
                    <PrePuzzleContentContainer>
                        <StatsWrapper>
                            <StatsGrid>
                                <LeftStatWrapper>
                                <PuzzleEloTitle type={module.type}>
                                    Rating
                                </PuzzleEloTitle>
                                </LeftStatWrapper>
                                <PuzzleElo>
                                    {props.rating}
                                </PuzzleElo>
                                <RightStatWrapper>
                                <HighScoreTitle type={module.type}>
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
                                    <PrePuzzleButton primary onClick={handleStartButtonClick}>
                                        Start
                                    </PrePuzzleButton>
                                    {props.isDaily ? <PrePuzzleButton onClick={handleSwapButtonClick}>
                                        Swap
                                    </PrePuzzleButton> : null}
                                    </div>
                                </InstructionsContainer>
                            </PrePuzzleContentContainer>
                        </PrePuzzleWrapper>
                        </PrePuzzleTileContainer>
                    </PuzzlePageContainer>
    )
}

export default PrePuzzlePage

const PrePuzzleButton = styled(Button)`

`