import React from 'react'
import { RewardH1, RewardH2, ModuleExperience, SlideContentWrapper, ChartContainer } from './PostModuleElements'
import Chart from './ScoreChart'

const RewardSlideOne = (props) => {
  return ( <>

            <RewardH1>
                {props.perfect && 'Congrats!'}
                {(!props.failure && !props.perfect) && 'Nice Job!'}
            </RewardH1>
            <RewardH2 props={props}>
                {props.perfect && 'perfect run'}
                {(!props.failure && !props.perfect) && 'you passed'}
                {(props.failure) && 'module failed'}
            </RewardH2>
            <Chart data={props.data}/>
            <ModuleExperience>
                {`Score: ${props.score}`}
            </ModuleExperience>
        </>
  )
}

export default RewardSlideOne