import styled from 'styled-components'

const Paragraph = (props) => {
  return (
    <ParagraphText>{props.children}</ParagraphText>
  )
}

export default Paragraph

const ParagraphText = styled.p`
    color: 243862;
    text-align: center;
    padding: 24px 0px;
`