import React, {useEffect, useState} from "react";
import { Line, ProgressProps } from "rc-progress";
import styled from "styled-components"

// src: https://github.com/react-component/progress
//class Example extends React.Component<ProgressProps, any> {

function ProgressBar(props) {
    const [percent,setPercent] = useState(0);
    const [color,setColor] = useState('#247CF1')
    const [results, setResults] = useState([]);
    const baseColor = '#247CF1';
    const incorrectColor = '#F24F3D';
    const correctColor = '#30F218';
    const perfectColor = '#FFF90C';
    const outcome = props.outcome;
    const returnPercent = props.returnPercent;
    const increment = 20; // increment for progress - hardcoded for now
    const decrement = 10; // decrement for failed puzzle

    useEffect(() => {
        if (props.percent === undefined) {
            setDisplay(outcome)
        } else{
            setPercent(props.percent)
        }
    },[props.outcomes])

    useEffect(() => {
    returnPercent(percent)
    },[percent])
    
    const setDisplay = result => {
        if (result === true && percent < 100) {
            setColor(correctColor)
            setPercent(prevPercent => prevPercent + increment)
        } else if (result === false && percent > 0) {
            setColor(incorrectColor)
            setPercent(prevPercent => prevPercent - decrement)
        } else if (percent >= 100 && result === true){
            setColor(correctColor)
            setPercent(100)
            if (results.every(outcome => outcome === true)) {
                setColor(perfectColor)
            }
        } else {
        }
        setResults(prevResults => [...prevResults, result])
    }

    const containerStyle = {
        width: "480px"
      };

    return(
        <HeaderWrapper >
          <Line percent={percent} strokeWidth={4} strokeColor={color} />
        </HeaderWrapper>
    )

}
export default ProgressBar

const HeaderWrapper = styled.div`
    width: 360px;
`
