import React from 'react'
import {Link} from "react-router-dom"
import { IconWrap,PostPuzzleWrapper, PostPuzzleGrid, PostPuzzleHeaderImg, RewardH1, RewardH2, ModuleExperience, FinishButton } from './PostPuzzleMockupElements'
import headerImg from "../Images/RewardHeaderImg.svg"
import {Modules} from '../components/PostLogin/CoursesBody/CourseTile/Data.js';

const PostPuzzleMockup = (props) => {
    
    const module = Modules.find(module => module.type_ref === props.userData.title)

    if (!props.savingResults) {
    return (
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
                        {props.failure ? 'Sorry.': 'Congrats!'}
                    </RewardH1>
                    <RewardH2>
                        {props.perfect && 'Perfect Run!'}
                        {(!props.failure && !props.perfect) && 'You Passed!'}
                        {(props.failure) && 'Module Failed'}
                    </RewardH2>
                    <ModuleExperience>
                        {props.userData.rating ? `Score: ${props.score}` : ''}
                    </ModuleExperience>
                    <Link to="/dailyPuzzle">
                    <FinishButton>
                        Return to Daily Puzzles
                    </FinishButton>
                    </Link>
            </PostPuzzleGrid>
        </PostPuzzleWrapper>
    )
    }
    return null;
}

export default PostPuzzleMockup
