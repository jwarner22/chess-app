import { TileWrapper, TileHeader, TileHeadline, TileSubheadline } from "./PuzzleTileElements"
import styled from 'styled-components'
import { PageContainer } from "../Page"

const OpeningTreeTiles = (props) => {
  console.log(props)
  return (
    <OpeningTreeTileWrapper>
        <TileHeader>
         <TileHeadline>{props.name}</TileHeadline>
        <TileSubheadline>{props.moves}</TileSubheadline>
        <h3>{props.popularity}</h3>
        </TileHeader>
    </OpeningTreeTileWrapper>
  )
}

export default OpeningTreeTiles

export const OpeningTreeTileWrapper = styled(TileWrapper)`
    background: ${props => props.current ? '#fff' : '#F85c37'};
    max-width: ${props => props.current ? '1080px' : null};
    margin: ${props => props.current ? '0px auto' : null};
    justify-content: center;
    display: flex;
`