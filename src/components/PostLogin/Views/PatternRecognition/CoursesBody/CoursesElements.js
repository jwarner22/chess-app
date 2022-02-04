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
    z-index: 6666;
`

export const MenuWrapper = styled.div`
    display: flex;
    width: 100%;
    /* padding: 0 24px; */
    background: #EEF0FF;
    overflow: hidden;
    padding-top: 12px;
    justify-content: center;
`
export const MenuGrid = styled.ul`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 24px;
    overflow-x: scroll;
    -webkit-overflow-scrolling:touch;
    -ms-overflow-style: none;
    padding: 0 24px 12px 24px;
`
export const MenuTiles = styled.li`
    display: flex;
    width: 110px;
    height: 70px;
    background: ${({testBackground}) => (testBackground ? "red" : "#fff")}
    border: 1px solid #010EFF;
    box-shadow: 0px 5px 8px rgba(1, 14, 255, 0.25);
    border-radius: 25px;
    list-style-type: none;
    cursor: pointer;

`
export const MenuContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`

export const MenuImg = styled.img`
    width: 35%;
    padding-top: 8px;
`

export const MenuTitle = styled.span`
    font-size: 10px;
    color: #010EFF;
    padding: 8px 0;
`

export const EndgamesLabelWrapper = styled.div`
    display: flex;
    min-height: 80px; 
    background: rgba(97,186,255,1);
    justify-content: flex-start;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    justify-content: center;
    width: 100%;
    position: sticky;
    top: 0px; 
`

export const TacticsLabelWrapper = styled.div`
    display: flex;
    min-height: 80px; 
    background: #FBAB7E;
    justify-content: flex-start;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    justify-content: center;
    width: 100%;
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
    width: 100%;
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
    padding: 24px 0px 30% 0px;
    background: #EEF0FF;
    height: 100%;
`

export const ModuleWrapper = styled.div `
    max-width: 1170px;
    /* border: 1px solid red; */
    margin: 0 24px 0px 24px;
    height: auto;
    width: 100%;

`

export const ModuleGrid = styled.ul`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(100px, 240px)minmax(100px, 240px));
grid-gap: 36px;
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
