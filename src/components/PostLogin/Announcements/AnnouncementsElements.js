import styled from 'styled-components'

export const AnnouncementWrapper = styled.div` 
    display: flex;
    justify-content: center;
    background-color: #f6f9fc;
`

export const AnnouncementContainerWrapper = styled.div`
    display: flex;
    max-width: 1170px;
    /* border: 1px solid red; */
    margin: 10px;
    height: auto;
    padding-top: 60px;
`

export const AnnouncementContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 200px;
    align-content: center;
    grid-gap: 16px;
`

export const AnnouncementTitleH1 = styled.h1`
    margin-top: 24px;
    margin-bottom: 5px;
    font-size: 32px;
    line-height: 1.1;
    font-weight: 400;
    color: #394149;
    text-align: left;
`

export const AnnouncementP = styled.p`
    font-size: 1rem;
    text-align: left; 
    grid-column: 1;
`
export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-content: flex-end;
    grid-row: 1;
    grid-column: 2;
    padding-top: 15px;
`

export const ProgressBarWrapper = styled.div`
    grid-column: span 2;
    grid-row: 3;
    background-color: grey;
    color: white;
    text-align: center;
`