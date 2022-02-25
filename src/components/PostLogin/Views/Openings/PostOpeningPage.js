import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import { IconWrap,PostPuzzleWrapper, PostPuzzleGrid, PostPuzzleHeaderImg, RewardH1, RewardH2, ModuleExperience, FinishButton } from '../../../PostModule/PostModuleElements'
import {Modules} from '../../../../data/Data';
import Chart from '../../../PostModule/ScoreChart';

const PostOpeningPage = (props) => {
    const [linkUrl, setLinkUrl] = useState('');
    const img = Modules[3].img;

    useEffect(() =>{
        if (props.completedTraining) setLinkUrl('completed-training');
        else if (props.isDaily) setLinkUrl('/home/daily');
        else setLinkUrl('/home/openings');
    }, [])

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
                    <Link to={linkUrl}>
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

export default PostOpeningPage
