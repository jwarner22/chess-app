import React, {useEffect, useState} from "react";
import { Line, ProgressProps } from "rc-progress";

// src: https://github.com/react-component/progress
//class Example extends React.Component<ProgressProps, any> {

function ProgressBar(props) {
    const [percent,setPercent] = useState(0);
    const [color,setColor] = useState('#247CF1')
    // const [lastOutcome, setLastOutcome] = useState('incorrect') use to stop multiple incorrects in a row
    const baseColor = '#247CF1';
    const incorrectColor = '#F24F3D';
    const correctColor = '#30F218';
    const outcome = props.outcome;
    const returnPercent = props.returnPercent;
    console.log(percent)
    useEffect(() => {
        console.log({percent: props.percent})
        console.log({outcome: outcome});
        
        if (props.percent === undefined) {
            setDisplay(outcome)
            console.log('checking')
        } else{
            setPercent(props.percent)
        }

    },[props.count])

    const setDisplay = result => {
        console.log({progress: result})
        if (result === true && percent <= 85) {
            setColor(correctColor)
            setPercent(percent + 15)
        } else if (result === false && percent > 0) {
            setColor(incorrectColor)
            setPercent(percent - 5)
        } else if (percent > 85){
            setColor(correctColor)
            setPercent(100)
        } else {
            setColor(baseColor)
        }
        console.log(percent)
        returnPercent(percent)
    }

    const containerStyle = {
        width: "250px"
      };

    return(
        <div style={containerStyle}>
          <Line percent={percent} strokeWidth={4} strokeColor={color} />
        </div>
    )

}
export default ProgressBar


