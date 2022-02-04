import React from 'react';
import styled from 'styled-components'

const CategoryTitle = (props) => {
  return (<div>
      {props.children}
  </div>
  )};

export default CategoryTitle;

const Title = styled.h1`
    color: #54606c;
    padding: 24px 0px;
    text-align: center;
`
