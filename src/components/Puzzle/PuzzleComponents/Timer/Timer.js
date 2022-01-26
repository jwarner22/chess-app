import React, {useState, useEffect} from 'react';
import { TimerSpan, TimerWrapper } from './TimerElements'

const Timer = (props) => {

  return <TimerWrapper>
      <TimerSpan>
          {props.counter}
      </TimerSpan>
  </TimerWrapper>;
};

export default Timer;
