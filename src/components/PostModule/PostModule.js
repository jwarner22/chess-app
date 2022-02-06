import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import { IconWrap,PostPuzzleWrapper, PostPuzzleGrid, PostPuzzleHeaderImg, RewardH1, RewardH2, ModuleExperience, FinishButton } from './PostModuleElements'
import {Modules} from '../PostLogin/Views/PatternRecognition/CourseTiles/Data';
import Chart from './ScoreChart';
import StarRating from './StarRating'

const PostPuzzleMockup = (props) => {
    const [linkUrl, setLinkUrl] = useState('');
    const module = Modules.find(module => module.type_ref === props.userData.title)

    useEffect(() =>{
        if (props.completedTraining) setLinkUrl('completed-training');
        else if (props.isDaily) setLinkUrl('/home/daily');
        else setLinkUrl('/home/practice');
    }, [])

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
                    <Link to={linkUrl}>
                    <FinishButton>
                        Return to {props.isDaily ? 'Daily Puzzles' : 'Dashboard'}
                    </FinishButton>
                    </Link>
                    <div>
                    <StarRating {...props}/>
                    </div>
            </PostPuzzleGrid>
        </PostPuzzleWrapper>
        </>
    )
    }
    return null;
}

export default PostPuzzleMockup
