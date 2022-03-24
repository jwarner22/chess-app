import React from 'react'
import styled from 'styled-components'
import ProgressBar from '../../components/UI_Kit/Progress/ProgressBar'

const OpeningMasteryProgressBar = () => {
  return (<>
    <ProgressContainer>
        <ProgressLabelWrap>
        <ProgressLabel>
            Mastery Progress
        </ProgressLabel>
        <RankWrapper>
            Next rank:
        </RankWrapper>
        </ProgressLabelWrap>
        <ProgressBar />
    </ProgressContainer>
    </>
  )
}

export default OpeningMasteryProgressBar

const ProgressContainer = styled.div`
    width: 100%;
    margin: 12px auto;
`
const ProgressLabel = styled.h4`
    color: #243862;
    margin: 24px 0px 12px 0px; 
`
const ProgressLabelWrap = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-end;
`

const RankWrapper = styled.div`

`