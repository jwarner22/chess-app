import styled from 'styled-components'


export const CoursesWrapper = styled.div`
display: flex;
border: 1px solid green;
justify-content: center;
background-color: #f9fbfc;
`

export const ModuleWrapper = styled.div `
display: flex;
max-width: 1100px;
border: 1px solid red;
margin: 20px;
height: auto;
width: 100%;
justify-content: center;
padding-top: 50px;

`

export const ModuleGrid = styled.ul`
display: grid;
grid-template-rows: repeat(5, 142px);
grid-template-columns: 1fr;
border: 1px dotted blue;
width: 724px;
grid-gap: 20px;
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
`
