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
    width: 100%;
    padding-top: 60px;
`

export const AnnouncementContainer = styled.div`
    display: grid;
    height: 200px;
    align-content: center;
    grid-gap: 16px;
    position: relative;
`

export const AnnouncementTitleH1 = styled.h1`
    margin-top: 24px;
    margin-bottom: 24px;
    font-size: 48px;
    line-height: 1.1;
    font-weight: 600;
    color: #394149;
    text-align: center;
`

export const AnnouncementP = styled.p`
    font-size: 1rem;
    text-align: left; 
`

export const CoursesWrapper = styled.div`
    display: flex;
    border: 1px solid green;
    justify-content: center;
`

export const ModuleWrapper = styled.div `
    display: flex;
    max-width: 1100px;
    border: 1px solid red;
    margin: 20px;
    height: auto;
    width: 100%;
    justify-content: center;
`

export const ModuleGrid = styled.ul`
    display: grid;
    grid-template-rows: repeat(5, 200px);
    grid-template-columns: 1fr;
    border: 1px dotted blue;
    width: 100%;
    grid-gap: 20px;
    `
