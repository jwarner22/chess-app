import styled from 'styled-components'

const CategoryTitle = (props) => {
  return (<Title>
      {props.children}
  </Title>
  )};

export default CategoryTitle;

const Title = styled.h1`
    color: #243862;
    padding: 24px 0px;
    text-align: center;
    
`
