import React from 'react'
import {Link} from "react-router-dom"
import { PostPuzzleWrapper, PostPuzzleGrid, PostPuzzleHeaderImg, RewardH1, RewardH2, ModuleExperience, FinishButton } from './PostPuzzleMockupElements'
import headerImg from "../Images/RewardHeaderImg.svg"

const PostPuzzleMockup = (props) => {
    console.log(props)
    if (!props.savingResults) {
    return (
        <PostPuzzleWrapper>
            <PostPuzzleGrid>
                <PostPuzzleHeaderImg src={headerImg}/>
                    <RewardH1>
                        {props.failure ? 'Sorry.': 'Congrats!'}
                    </RewardH1>
                    <RewardH2>
                        {props.perfect && 'Perfect Run!'}
                        {(!props.failure && !props.perfect) && 'You Passed!'}
                        {(props.failure) && 'Module Failed'}
                    </RewardH2>
                    <ModuleExperience>
                        {`Your new rating for ${props.userData.title} is ${props.userData.rating}`}
                    </ModuleExperience>
                    <Link to="/dashboard">
                    <FinishButton>
                        Return to Dashboard
                    </FinishButton>
                    </Link>
            </PostPuzzleGrid>
        </PostPuzzleWrapper>
    )
    }
    return null;
}

export default PostPuzzleMockup
