import React from 'react'
import {Link} from "react-router-dom"
import { PostPuzzleWrapper, PostPuzzleGrid, PostPuzzleHeaderImg, RewardH1, RewardH2, ModuleExperience, FinishButton } from './PostPuzzleMockupElements'
import headerImg from "../Images/RewardHeaderImg.svg"

const PostPuzzleMockup = () => {
    return (
        <PostPuzzleWrapper>
            <PostPuzzleGrid>
                <PostPuzzleHeaderImg src={headerImg}/>
                    <RewardH1>
                        Congrats!
                    </RewardH1>
                    <RewardH2>
                        You passed!
                    </RewardH2>
                    <ModuleExperience>
                        (Insert metrics from game here)
                    </ModuleExperience>
                    <Link to="/dashboard">
                    <FinishButton>
                        Back to Dashboard
                    </FinishButton>
                    </Link>
            </PostPuzzleGrid>
        </PostPuzzleWrapper>
    )
}

export default PostPuzzleMockup
