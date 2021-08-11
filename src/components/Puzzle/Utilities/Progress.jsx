import React, {useEffect, useState} from "react";
import { Line, ProgressProps } from "rc-progress";

// src: https://github.com/react-component/progress
//class Example extends React.Component<ProgressProps, any> {

function ProgressBar(props) {
    const [percent,setPercent] = useState(0);
    const [color,setColor] = useState('#247CF1')
    const baseColor = '#247CF1';
    const incorrectColor = '#F24F3D';
    const correctColor = '#30F218';
    const outcome = props.outcome;
    const returnPercent = props.returnPercent;

    useEffect(() => {
        if (props.percent === undefined) {
            setDisplay(outcome)
        } else{
            setPercent(props.percent)
        }
    },[props.count])

    const setDisplay = result => {
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


