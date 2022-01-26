import React, {useState, useEffect} from 'react';
import { TimerSpan, TimerWrapper } from './TimerElements'

const Timer = (props) => {
    const [counter, setCounter] = useState(0);

    const {toggleTimer} = props;

    useEffect(() => {
        if(toggleTimer){
          const timeout = setTimeout(() => {
            setCounter(counter + 1);
          }, 1000);
          console.log(toggleTimer)
      
          return () => {
            clearTimeout(timeout);
          };
        }}, [counter])

  return <TimerWrapper>
      <TimerSpan>
          {counter}
      </TimerSpan>
  </TimerWrapper>;
};

export default Timer;
