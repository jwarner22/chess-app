import React, {useState, useEffect, useContext} from 'react'
import {Link} from "react-router-dom"
import { IconWrap,PostPuzzleWrapper, PostPuzzleGrid, PostPuzzleHeaderImg, RewardH1, RewardH2, ModuleExperience, FinishButton } from '../../../PostModule/PostModuleElements'
import {Modules} from '../../../../data/ModuleData';
import Chart from '../../../PostModule/ScoreChart';
import {MultiChart} from '../../../PostModule/ScoreChart';

import { calcMastery } from '../../../Module/Utilities/Scoring';

import { UserContext } from "../../../../providers/GlobalState.js";


const PostOpeningPage = (props) => {
    const [linkUrl, setLinkUrl] = useState('');
    const [multi, setMulti] = useState(false);
    const img = Modules[3].img;
    // const openingMasteryRank = props.location.state.openingMasteryRank;
    // const thisOpeningRank = props.location.state.thisOpeningRank;
    // const newOpeningRank = props.location.state.newOpeningRank;
    const {openingMasteryRank, thisOpeningRank, newOpeningRank, completedDaily} = props.location.state;
    const {openingStats} = useContext(UserContext);

    const opening = openingStats.find(opening => opening.opening_id === props.location.state.openingId);

    console.log({openingMasteryRank: openingMasteryRank, thisOpeningRank: thisOpeningRank, newOpeningRank: newOpeningRank})
    
    let historyData = [opening.history_1, opening.history_2, opening.history_3, opening.history_4, opening.history_5, opening.history_6, opening.history_7];
    //historyData = historyData.toString(); // convert to single string for copatibility
    historyData = historyData.map((value, index) => {
        return(
          {
            name: index.toString(),
            score: value
          }
        )
      });

    sessionStorage.removeItem("dailyPageVisit")
    const parentIds = opening.parent_ids.split(',').map(item => parseInt(item));
    const parents = openingStats.filter(item => parentIds.some(id => id === item.opening_id));
    let parentHistory = [{},{},{},{},{},{},{}];
    let parentHistoryData = parentHistory.map((parent, index) => {
        let historyPoint = {}
        historyPoint.name = index.toString();
        let historyNum = `history_${index+1}`;
        parents.forEach((parentItem, index) => {
                let parentId = parentItem.opening_id;
                historyPoint[parentId] = parentItem[historyNum];
        });
        return(historyPoint)
    })
    console.log({props: props})

    useEffect(() =>{
        //if (props.completedTraining) setLinkUrl('completed-training');
        if (props.location.state.isDaily && props.location.state.completedDaily) {
            setLinkUrl('/completed-training');
        } else if (props.location.state.isDaily) {
            setLinkUrl('/home/daily');
        } else {
            setLinkUrl(`/home/openings`);
        }
    }, [])

    const handleNextClick = () => {
        setMulti(true)
    }

    if (!props.savingResults) {
    return (
        <>
        <PostPuzzleWrapper>
            <PostPuzzleGrid>
                <IconWrap>
                    <PostPuzzleHeaderImg src={img}/>
                </IconWrap>
                    <ModuleExperience>
                        {opening.name}
                    </ModuleExperience>
                    <RewardH1>
                        {/* {props.perfect && 'Congrats!'}
                        {(!props.failure && !props.perfect) && 'Nice Job!'} 
                        Nice Job!*/}
                                                    
                    </RewardH1>
                    <RewardH2 props={props}>

                        {/* {props.perfect && 'perfect run!'}
                        {(!props.failure && !props.perfect) && 'you passed'}
                        {(props.failure) && 'module failed'} */}
                        Mastery
                    </RewardH2>
                    {/* <ModuleExperience>
                        {/* {`Mastery: ${opening.history_7} (+${opening.history_7 - opening.history_6})`} 
                        Mastery
                    </ModuleExperience> */}
                    <Chart data={historyData} />
                    {/* {multi && <MultiChart data={parentHistoryData} lineData={parents}/>}
                    {!multi && <FinishButton onClick={handleNextClick}>Next</FinishButton>} */}

                    <Link to={linkUrl}>
                    <FinishButton>
                        Return to {props.location.state.isDaily ? 'Daily Training' : 'Openings'}
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
