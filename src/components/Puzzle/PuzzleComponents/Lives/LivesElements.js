import styled from "styled-components"

export const LivesWrapper = styled.div`
 display: flex;
 width: 100%;
 justify-content: center;
 
`

export const LivesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 12px;
  margin: 12px 0px;
  
`
export const LifeOne = styled.div`
  max-width: 30px;
`
export const LifeTwo = styled.div`
  max-width: 30px;
`
export const LifeThree = styled.div`
  max-width: 30px;
`

export const LivesImg = styled.img`
    max-width: ${( props ) => (props.isMobile ? '25px' : '30px')};
`