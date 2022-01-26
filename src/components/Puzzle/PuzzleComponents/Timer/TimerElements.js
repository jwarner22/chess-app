import styled from "styled-components";

export const TimerWrapper = styled.div`
  display:flex;
  width: 50%;
  justify-content: flex-end;
  padding: 0px 12px;
  align-items: center;
`



export const TimerSpan = styled.span`
    display: inline;
    color: #fff;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 0.36px;
`

export const TimerSpanBuffer = styled(TimerSpan)`
  letter-spacing: 0.36px;
`