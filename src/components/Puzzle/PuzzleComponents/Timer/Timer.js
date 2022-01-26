import React, {useState, useEffect} from 'react';
import { TimerSpan, TimerSpanBuffer, TimerWrapper } from './TimerElements'

const Timer = (props) => {
    const [counter, setCounter] = useState(0);

    const {toggleTimer, count} = props;

    //resets counter if the count updates
    useEffect(() => {
      setCounter(0)
    }, [count])

    //starts and stops timer based on the toggleTimer state
    useEffect(() => {
        if(toggleTimer){
          const timeout = setInterval(() => {
            setCounter((prevCount) => prevCount + 10)
          }, 10);
          console.log(toggleTimer)
          return () => {
            clearInterval(timeout);
          };
        }}, [counter, toggleTimer, count])

  return <TimerWrapper>
          <TimerSpanBuffer>
              <TimerSpan>{("0" + Math.floor((counter / 60000) % 60)).slice(-2)}:</TimerSpan>
              <TimerSpan>{("0" + Math.floor((counter / 1000) % 60)).slice(-2)}:</TimerSpan>
              <TimerSpan>{("0" + ((counter / 10) % 100)).slice(-2)}</TimerSpan>
            </TimerSpanBuffer>
            {/* <TimerSpan>
                {counter}
            </TimerSpan> */}
  </TimerWrapper>;
};

export default Timer;
