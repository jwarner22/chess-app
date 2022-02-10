import styled from 'styled-components'

export const CoursesWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 24px 0px 24px 0px;
    background: #EEF0FF;
    height: 100%;
    flex-direction: column;
    align-items: center;
`

export const ModuleGrid = styled.ul`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(100px, 240px)minmax(100px, 240px));
grid-gap: 18px;
justify-content: space-around;
align-items: stretch;
`

export const ModuleWrapper = styled.div `
    max-width: 1170px;
    /* border: 1px solid red; */
    margin: 0 24px 0px 24px;
    height: auto;
    width: 100%;
    padding: 0 24px 0px 24px;

`