import styled from 'styled-components'

const Tile = (props) => {
  return (
    <TileContainer>{props.children}</TileContainer>
  )
}
export default Tile

const TileContainer = styled.div`
    border-radius: 35px;
    background-color: #fff;
    color: #243862;
    box-shadow: 0px 8px 15px rgba(1, 14, 255, 0.24);
    max-width: 1080px;
    width: 100%;
    overflow: hidden;
`

