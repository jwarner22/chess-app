import styled from 'styled-components'

export const AnnouncementWrapper = styled.div` 
    display: flex;
    width: 100%;
    border-bottom: .125rem solid #e1e5e7;
    justify-content: center;
    margin: 0 auto;
    padding-top: 80px;
    height: auto;
    position: relative;
`

export const AnnouncementContainer = styled.div`
    display: grid;
    height: 200px;
    align-content: center;
    max-width: 1100px;
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
    text-align: center; 
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
