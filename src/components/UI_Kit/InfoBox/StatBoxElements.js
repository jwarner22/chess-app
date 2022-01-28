import styled from 'styled-components'
import { InfoBoxTitle
 } from './InfoBoxElements'

export const StatBoxHeadline = styled.span`
    text-align: center;
    padding-bottom: 4px;
    padding-top: 16px;
    color: #282425;
    margin: 0px 8px;
    font-weight: 400;
    font-size: 16px;
    margin-top: 24px;
`

export const StatContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
`

export const InfoBoxStat= styled(InfoBoxTitle)`
    font-size: 22px;
    margin-top: 0px;
    padding-top: 8px;
    margin-bottom: 24px;
    `