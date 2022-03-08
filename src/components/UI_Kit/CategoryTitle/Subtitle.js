import styled from 'styled-components'

const Subtitle = (props) => {
    return (<Sub>
        {props.children}
    </Sub>
    )};
  
  export default Subtitle;
  
  const Sub = styled.h2`
      color: #243862;
      padding: 24px 0px;
      text-align: center;
  `