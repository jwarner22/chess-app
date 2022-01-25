import React, {useEffect, useState} from "react";
import { Circle, Line } from "rc-progress";
import styled from "styled-components"
// src: https://github.com/react-component/progress
//class Example extends React.Component<ProgressProps, any> {

import {useWindowSize} from '../../Hooks/UseWindowSize';

function ProgressBar(props) {
    const [percent,setPercent] = useState(0);
    const [color,setColor] = useState('#247CF1')
    const [results, setResults] = useState([]);
    //const [windowDimension, setWindowDimension] = useState(null); 
    const windowDimensions = useWindowSize();
    const isMobile = windowDimensions[0] < 640;

    const baseColor = '#247CF1';
    const incorrectColor = '#F24F3D';
    const correctColor = '#30F218';
    const perfectColor = '#FFF90C';
    const outcome = props.outcome;
    const returnPercent = props.returnPercent;
    const increment = 20; // increment for progress - hardcoded for now
    const decrement = 10; // decrement for failed puzzle
    const trailColor = 'rgba(255, 255, 255, 0.3)'

    // useEffect(() => {
    //     setWindowDimension(window.innerWidth);
    //   }, []);
    
    //   useEffect(() => {
    //     function handleResize() {
    //       setWindowDimension(window.innerWidth);
    //     }
    
    //     window.addEventListener("resize", handleResize);
    //     return () => window.removeEventListener("resize", handleResize);
    //   }, []);
    
    //   const isMobile = windowDimension <= 640;

    useEffect(() => {
            setDisplay(outcome)
    },[props.outcomes])

    useEffect(() => {
      if (props.percent != null) {
      setPercent(props.percent)
      if (props.outcome === true) {
        setColor(correctColor)
      } else if (props.outcome === false) {
        setColor(incorrectColor)
      }
    }
    },[props.percent, props.outcome])

    useEffect(() => {
      returnPercent(percent)
    },[percent])
    
    useEffect(() => {
        setColor(baseColor) // reset color to base color on retry on continue
    },[props.count, props.retry])

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
          setPercent(0)
        }
        setResults(prevResults => [...prevResults, result])
    }

    const progressHeight = {
        height: "8px"
    }

    return(
        <>
        <HeaderWrapper >
            {isMobile ? ( <Line style={progressHeight} percent={percent} strokeWidth={3} strokeColor={color} trailWidth={3} trailColor={trailColor}/> ) : (
          <Circle percent={percent} strokeWidth={3} strokeColor={color} trailWidth={3} trailColor={trailColor}/>)}
        </HeaderWrapper>
        </>
    )

}
export default ProgressBar



const HeaderWrapper = styled.div`
    display: flex;
    width: 60%;
    align-items: center;
    justify-content: center;
`

export const BackButtonWrapper = styled.div`
    display: flex;
    padding-right: 15px;
    justify-content: flex-start;
    align-items: center;
`