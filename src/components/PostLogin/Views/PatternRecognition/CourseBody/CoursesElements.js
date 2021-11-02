import styled from 'styled-components'

export const CategoryLabelContainerTop = styled.div`
    background-color: #f3f3f3;
    position: sticky;
    top: 0px;
` 

export const CategoryLabelContainer = styled.div`
    top: 0;
    position: sticky;
    background-color: #f6f9fc;
`

export const EndgamesLabelWrapper = styled.div`
    display: flex;
    min-height: 80px; 
    background: #59C0F3;
    justify-content: flex-start;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    justify-content: center;
    width: 100vw;
    position: sticky;
    top: 0px; 
`

export const TacticsLabelWrapper = styled.div`
    display: flex;
    min-height: 80px; 
    background: #efb458;
    justify-content: flex-start;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    justify-content: center;
    width: 100vw;
    position: sticky;
    top: 0px; 
`

export const CheckmatesLabelWrapper = styled.div`
    display: flex;
    min-height: 80px; 
    background: #5068F9;
    justify-content: flex-start;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    justify-content: center;
    width: 100vw;
    position: sticky;
    top: 0px; 
`


export const CategoryLabel = styled.h2`
    color: white;
    margin-top: auto;
    margin-bottom: auto;
`

export const CoursesWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 40px 0px;
    background: #F3F5F9;
    /* min-height: 100vh; */
`

export const ModuleWrapper = styled.div `
    max-width: 1170px;
    /* border: 1px solid red; */
    margin: 0 16px 30px 16px;
    height: auto;
    width: 100%;

`

export const ModuleGrid = styled.ul`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(100px, 240px)minmax(100px, 240px));
grid-gap: 16px;
justify-content: space-around;
align-items: stretch;
`
/* border: 1px dotted blue; */
    /* @media screen and (max-width: 1064px) {
        padding: 0 20px;
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
        grid-gap: 8px;
    } */


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
