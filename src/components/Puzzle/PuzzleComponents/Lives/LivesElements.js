import styled from "styled-components"

export const LivesWrapper = styled.div`
 display: flex;
 width: 50%;
 justify-content: flex-end;
 background: none;
 padding: 0px 12px;
`

export const LivesGrid = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 12px;
  margin: 12px 0px;
  
`
export const LifeOne = styled.li`
  max-width: 30px;
  list-style-type: none;
`
export const LifeTwo = styled.li`
  max-width: 30px;
  list-style-type: none;
`
export const LifeThree = styled.li`
  max-width: 30px;
  list-style-type: none;
`

export const LivesImg = styled.img`
    max-width: ${( props ) => (props.isMobile ? '25px' : '30px')};
`