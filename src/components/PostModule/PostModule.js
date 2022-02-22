import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {Link} from "react-router-dom"
import { IconWrap,PostPuzzleWrapper, PostPuzzleGrid, PostPuzzleHeaderImg, RewardH1, RewardH2, ModuleExperience, FinishButton } from './PostModuleElements'
import {Modules} from '../PostLogin/Views/PatternRecognition/CourseTiles/Data';
import Chart from './ScoreChart';
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import Button from '../UI_Kit/Button/Button';

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
                <IconWrap type={module.type}>
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
                    <PostPuzzleButton primary>
                        Return to {props.isDaily ? 'Daily Puzzles' : 'Dashboard'}
                    </PostPuzzleButton>
                    </Link>
                    <RatingHeader>
                        How would you rate this module?
                    </RatingHeader>
                    <div>
                        <ThumbsUpButton>
                            <ThumbsUp />
                        </ThumbsUpButton>
                        <ThumbsDownButton>
                            <ThumbsDown />
                        </ThumbsDownButton>
                    {/* <StarRating {...props}/> */}
                    </div>
            </PostPuzzleGrid>
        </PostPuzzleWrapper>
        </>
    )
    }
    return null;
}

export default PostPuzzleMockup

const PostPuzzleButton = styled(Button)`
    font-weight: 600;
    margin: 24px 0px;
`

const RatingHeader = styled.h2`
    text-align: center;
    color: #54606c;
`

const ThumbsUpButton = styled.button`
    border: 0;
    background: transparent;
`

const ThumbsUp = styled(FaThumbsUp)`
    min-width: 40px;
    min-height: 40px;
    color: rgb(41, 204, 125);
    margin: 12px 12px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        transform: scale(1.2);
    }
`

const ThumbsDownButton = styled.button`
    border: 0;
    background: transparent;
`


const ThumbsDown = styled(FaThumbsDown)`
    min-width: 40px;
    min-height: 40px;
    color: rgb(253, 83, 72);
    margin: 12px 12px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        transform: scale(1.2);
    }
`