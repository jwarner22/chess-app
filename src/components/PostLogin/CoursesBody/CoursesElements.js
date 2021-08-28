import styled from 'styled-components'

export const CategoryLabelContainerTop = styled.div`
    background-color: #f3f3f3;
`

export const CategoryLabelContainer = styled.div`
    padding-top: 40px;

`

export const CategoryLabelWrapper = styled.div`
    display: flex;
    height: 65px; 
    background: #24F299;
    justify-content: flex-start;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    justify-content: center;
    width: 100vw;
`

export const CategoryLabel = styled.h2`
    color: white;
    margin-top: auto;
    margin-bottom: auto;

`

export const CoursesWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 40px;
    background-color: #f6f8f9;
`

export const ModuleWrapper = styled.div `
    max-width: 1170px;
    /* border: 1px solid red; */
    margin: 0 30px 30px 30px;
    height: auto;
    width: 100%;
    padding-top: 10px;

`

export const ModuleGrid = styled.ul`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(160px, 240px));
grid-gap: 24px;
justify-content: center;
/* border: 1px dotted blue; */
    /* @media screen and (max-width: 1064px) {
        padding: 0 20px;
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
        grid-gap: 8px;
    } */
`

export const Course = styled.li`
    border: 1px solid orange;
    list-style-type: none;
`

export const CourseHeadline = styled.h1`
    margin-bottom: 24px;
    font-size: 48px;
    line-height: 1.1;
    font-weight: 600;
    color: #fff;
`
