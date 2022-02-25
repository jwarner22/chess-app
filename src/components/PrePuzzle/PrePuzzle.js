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
    PuzzleEloTitle, 
    HighScoreTitle,
    LeftStatWrapper,
RightStatWrapper,
PrePuzzleTileContainer} from "./PrePuzzleElements";
import Button from "../UI_Kit/Button/Button"
import {DailyPuzzleIcon} from "../PostLogin/Views/DailyPuzzle/DailyPuzzleElements"
import {Modules} from '../../data/ModuleData';
import { BackButtonWrapper } from '../Puzzle/Utilities/Progress';
import BackButton from '../BackButton';
import BenefitsContainer from '../UI_Kit/Boxes/Containers/Benefits';

const PrePuzzlePage = (props) => {
    const module = Modules.find(element => element.type_ref === props.moduleData.theme);    

    function handleStartButtonClick() {
        props.togglePrePuzzleCallback()
    }

    function handleSwapButtonClick() {
        props.swapModule();
    }

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
                        <BenefitsContainer headline={module.headline} category={module.type} />
                             <InstructionsContainer>
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
    margin: 12px;
    padding: 12px 24px;
    font-weight: 400;
`