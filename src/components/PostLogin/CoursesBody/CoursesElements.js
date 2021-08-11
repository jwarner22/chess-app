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
`

export const CategoryLabel = styled.h2`
    color: white;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 30px;

`

export const CoursesWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 40px;
`

export const ModuleWrapper = styled.div `
display: flex;
max-width: 1170px;
/* border: 1px solid red; */
margin-bottom: 30px;
height: auto;
width: 100%;
padding-top: 10px;

`

export const ModuleGrid = styled.ul`
display: grid;
grid-auto-rows: auto;
grid-template-columns: 1fr 1fr 1fr;
/* border: 1px dotted blue; */
width: 100%;
grid-gap: 40px;
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
