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
    margin: 30px;
    height: auto;
    padding-top: 120px;
`

export const AnnouncementContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: auto;
    width: 100%;
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
export const CalendarTitle = styled.div`
    display: flex;
    margin-top: 10px;
    margin-bottom: 5px;
    grid-column: span 2;
    font-size: 24px;
    font-weight: 600;
    color: #394149;
`

export const CalendarWrapper = styled.div`
    grid-column: span 2;
    display: grid;
    grid-template-columns: repeat(7, 1fr) 40%;
    grid-template-rows: 1;
    justify-items: flex-start;
    align-self: center;
    grid-gap: 10px;
`
export const CalendarDaysWrapper = styled.div`
    min-width: 80px;
    min-height: 80px;
    background-color: #247cf1;
    border-radius: 10px;
`
export const DaysSpanWrapper = styled.div`
    line-height:80px;
    width:100%;
    height:100%;
    text-align: center;
`


export const CalendarDays = styled.h1`
    color: #fff;
`
