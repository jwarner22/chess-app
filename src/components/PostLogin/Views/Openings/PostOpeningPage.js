import React from 'react'
import {Link} from "react-router-dom"
import { IconWrap,PostPuzzleWrapper, PostPuzzleGrid, PostPuzzleHeaderImg, RewardH1, RewardH2, ModuleExperience, FinishButton } from '../../../PostModule/PostModuleElements'
import {Modules} from '../PatternRecognition/CourseTiles/Data';
import Chart from '../../../PostModule/ScoreChart';
//import Chart from './ScoreChart';

const PostPuzzleMockup = (props) => {
    const img = Modules[3].img;
    
    if (!props.savingResults) {
    return (
        <>
        <PostPuzzleWrapper>
            <PostPuzzleGrid>
                <IconWrap>
                    <PostPuzzleHeaderImg src={img}/>
                </IconWrap>
                    <ModuleExperience>
                        {props.openingData.headline}
                    </ModuleExperience>
                    <RewardH1>
                        {/* {props.perfect && 'Congrats!'}
                        {(!props.failure && !props.perfect) && 'Nice Job!'} */}
                        Nice Job!
                    </RewardH1>
                    {/* <RewardH2 props={props}>

                        {props.perfect && 'perfect run!'}
                        {(!props.failure && !props.perfect) && 'you passed'}
                        {(props.failure) && 'module failed'}
                    </RewardH2> */}
                    <Chart data={props.scoreData}/>
                    <ModuleExperience>
                        {`Score: ${props.score}`}
                    </ModuleExperience>
                    <Link to={props.isDaily ? "/dailyPuzzle" : '/openings'}>
                    <FinishButton>
                        Return to {props.isDaily ? 'Daily Puzzles' : 'Openings'}
                    </FinishButton>
                    </Link>
            </PostPuzzleGrid>
        </PostPuzzleWrapper>
        </>
    )
    }
    return null;
}

export default PostPuzzleMockup
