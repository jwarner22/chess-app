import styled from 'styled-components'

export const InfoBoxContainer = styled.div`
    display: flex;
    background: #fff;
    box-shadow:rgba(0, 0, 0, 0.2) 0px 10px 50px;
    width: 90%;
    max-width: 780px;
    flex-direction: column;
    margin: auto;
    border-radius: 15px;
    margin-top: 80px;
    align-items: center;
`

export const InfoBoxTitle = styled.span`
    text-align: center;
    padding-bottom: 4px;
    padding-top: 16px;
    color: #161D4E;
    margin: 0px 8px;
    font-weight: 600;
    font-size: 24px;
    margin-top: 40px;
`

export const InfoBoxSubTitle = styled.span`
    text-align: center;
    padding: 4px;
    color: #C4C5D4;
    font-weight: 300;
    font-size: 14px;
    margin: 4px;
`
export const InfoBoxImageContainer = styled.div`
    position: absolute;
    background: #5649B1;
    display: flex;
    justify-content: center;
    border-radius: 50px;
    width: 80px;
    height: 80px;
    top: 40px;
    margin: auto;
    display: flex;
    justify-content: center;
`

export const InfoBoxImg = styled.img`
    width: 60%;
`

export const InfoBoxHeadline = styled.span`
    text-align: center;
    padding-bottom: 4px;
    padding-top: 16px;
    color: #282425;
    margin: 0px 8px;
    font-weight: 400;
    font-size: 16px;
    margin-top: 24px;
`

export const InfoBoxStatContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
`

export const InfoBoxStat= styled(InfoBoxTitle)`
    font-size: 22px;
    margin-top: 0px;
    padding-top: 8px;
    margin-bottom: 24px;
`