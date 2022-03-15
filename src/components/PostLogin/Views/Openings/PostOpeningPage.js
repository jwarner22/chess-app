import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import { IconWrap,PostPuzzleWrapper, PostPuzzleGrid, PostPuzzleHeaderImg, RewardH1, RewardH2, ModuleExperience, FinishButton } from '../../../PostModule/PostModuleElements'
import {Modules} from '../../../../data/ModuleData';
import Chart from '../../../PostModule/ScoreChart';

const PostOpeningPage = (props) => {
    const [linkUrl, setLinkUrl] = useState('');
    const img = Modules[3].img;
    const stats = props.location.state.stats;
    let historyData = [stats.history_1, stats.history_2, stats.history_3, stats.history_4, stats.history_5, stats.history_6, stats.history_7];
    //historyData = historyData.toString(); // convert to single string for copatibility
    historyData = historyData.map((value, index) => {
        return(
          {
            name: index.toString(),
            score: value
          }
        )
      });
    const mastery = props.location.state.stats.mastery;

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
                        {props.location.state.currentOpening.name}
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
                    <Chart data={historyData}/>
                    <ModuleExperience>
                        {`Mastery: ${mastery}`}
                    </ModuleExperience>
                    <Link to={linkUrl}>
                    <FinishButton>
                        Return to {props.location.state.isDaily ? 'Daily Puzzles' : 'Openings'}
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
