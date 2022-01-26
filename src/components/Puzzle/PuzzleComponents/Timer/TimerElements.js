import styled from "styled-components";

export const TimerWrapper = styled.div`
  display:flex;
  width: 50%;
  padding: 0px 12px;
  justify-content: flex-start;
`



export const TimerSpan = styled.span`
    display: inline-block;
    color: #fff;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 2px;
`

export const TimerSpanBuffer = styled.div`
    min-width: 150px;
    font-size: 16px;
    line-height: 50px;
    font-weight: bold;
    padding: 0 2vmin;
    white-space: nowrap;
    will-change: transform;
    display: flex;
    color: #fff;
`