import styled from 'styled-components'

export const CoursesWrapper = styled.div`
    display: flex;
    justify-content: ${props => props.opening ? "flex-start" : "center"};
    padding: ${props => props.opening ? '0px' : '24px 0px 24px 0px'};
    align-items: center;
    flex-direction: column;
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