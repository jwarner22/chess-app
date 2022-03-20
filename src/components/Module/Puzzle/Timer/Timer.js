import React, {useState, useEffect} from 'react';
import { TimerSpan, TimerSpanBuffer, TimerWrapper } from './TimerElements'

const Timer = (props) => {
    const [counter, setCounter] = useState(0);

    const {toggleTimer, count, resetCounter} = props;

    //resets counter if the puzzle count changes
    useEffect(() => {
      setCounter(0)
    }, [count])

    useEffect(() => {
      if (toggleTimer) {
        setCounter(0)
      }
    }, [toggleTimer])
    //starts and stops timer based on the toggleTimer state
    useEffect(() => {
        if(toggleTimer){
          const timeout = setInterval(() => {
            setCounter((prevCount) => prevCount + 10)
          }, 10);
          return () => {
            clearInterval(timeout);
          };
        }

      }, [counter, toggleTimer, count])

  return <TimerWrapper>
          <TimerSpanBuffer>
              {("0" + Math.floor((counter / 60000) % 60)).slice(-2)}:
              {("0" + Math.floor((counter / 1000) % 60)).slice(-2)}
             {/* {("0" + ((counter / 10) % 100)).slice(-2)} */}
            </TimerSpanBuffer>
            {/* <TimerSpan>
                {counter}
            </TimerSpan> */}
  </TimerWrapper>;
};

export default Timer;
