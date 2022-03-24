import styled from 'styled-components'

const LargeConatiner = (props) => {
  return (
    <ContentWrapper>{props.children}</ContentWrapper>
  )
}

export default LargeConatiner

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 24px;
`