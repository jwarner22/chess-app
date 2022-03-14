import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {Link} from "react-router-dom"
import { IconWrap,PostPuzzleWrapper, PostPuzzleGrid, PostPuzzleHeaderImg, ModuleTitle, SlideContentWrapper } from './PostModuleElements'
import {Modules} from '../../data/ModuleData';
import { FaThumbsDown } from "@react-icons/all-files/fa/FaThumbsDown";
import {FaThumbsUp} from"@react-icons/all-files/fa/FaThumbsUp"
import Button from '../UI_Kit/Button/Button';
import RewardSlideOne from './RewardSlideOne';
import EloRewards from './RewardSlideTwo';
import { PageContainer } from '../UI_Kit/Page';

const PostPuzzleMockup = (props) => {
    const [linkUrl, setLinkUrl] = useState('');
    const [rewardsSlide, setRewardsSlide] = useState(1)
    const module = Modules.find(module => module.type_ref === props.userData.title)
    const {perfect, failure, scoreData, score, isDaily, initialRating, newRating} = props

    useEffect(() =>{
        if (props.completedTraining) setLinkUrl('completed-training');
        else if (props.isDaily) setLinkUrl('/home/daily');
        else setLinkUrl('/home/practice');
    }, [])

    const handleSlide = () => {
        setRewardsSlide(prev => prev + 1)
    }

    const isFirstSlide = rewardsSlide === 1

    if (!props.savingResults) {
    return (
        <>
        <PageContainer>
        <PostPuzzleWrapper>
        <IconWrap type={module.type}>
                    <PostPuzzleHeaderImg src={module.img}/>
                    <ModuleTitle>
                        {module.headline}
                    </ModuleTitle>
                </IconWrap>
            <PostPuzzleGrid>
                        {isFirstSlide ? (
                        <>
                        <RewardSlideOne 
                        perfect={perfect} 
                        failure={failure} 
                        data={scoreData} 
                        score={score}
                        />
                        <PostPuzzleButton primary onClick={handleSlide}>
                            Next
                        </PostPuzzleButton>
                        </>) : ( <> 
                            <EloRewards 
                            perfect={perfect} 
                            failure={failure} 
                            data={scoreData} 
                            score={score}
                            initialRating={initialRating}
                            newRating={newRating}
                            />
                        <Link to={linkUrl}>
                            <PostPuzzleButton primary>
                                Return to {props.isDaily ? 'Daily Puzzles' : 'Dashboard'}
                            </PostPuzzleButton>
                         </Link>
                         </>
                         )}
                    </PostPuzzleGrid>
                    <RatingFeedbackContainer>
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
                    </RatingFeedbackContainer>
        </PostPuzzleWrapper>
        </PageContainer>
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

const RatingFeedbackContainer = styled.div`
    height: 120px;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const RatingHeader = styled.h4`
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