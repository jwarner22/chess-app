import React from 'react'
import {Link} from "react-router-dom"
import { IconWrap,PostPuzzleWrapper, PostPuzzleGrid, PostPuzzleHeaderImg, RewardH1, RewardH2, ModuleExperience, FinishButton } from './PostModuleElements'
import headerImg from "../../Images/RewardHeaderImg.svg"
import {Modules} from '../PostLogin/Views/PatternRecognition/CourseTiles/Data';
import Chart from './ScoreChart';

const PostPuzzleMockup = (props) => {
    
    const module = Modules.find(module => module.type_ref === props.userData.title)

    if (!props.savingResults) {
    return (
        <>
        <PostPuzzleWrapper>
            <PostPuzzleGrid>
                <IconWrap>
                    <PostPuzzleHeaderImg src={module.img}/>
                </IconWrap>
                    <ModuleExperience>
                        {module.headline}
                    </ModuleExperience>
                    <div>


                    </div>
                    <RewardH1>
                        {props.perfect && 'Congrats!'}
                        {(!props.failure && !props.perfect) && 'Nice Job!'}
                    </RewardH1>
                    <RewardH2 props={props}>

                        {props.perfect && 'perfect run!'}
                        {(!props.failure && !props.perfect) && 'you passed'}
                        {(props.failure) && 'module failed'}
                    </RewardH2>
                    <Chart data={props.scoreData}/>
                    <ModuleExperience>
                        {`Score: ${props.score}`}
                    </ModuleExperience>
                    <Link to={props.isDaily ? "/dailyPuzzle" : '/dashboard'}>
                    <FinishButton>
                        Return to {props.isDaily ? 'Daily Puzzles' : 'Dashboard'}
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
