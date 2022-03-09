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
        <TileSubheadline>{props.popularity}</TileSubheadline>
        </TileHeader>
    </OpeningTreeTileWrapper>
  )
}

export default OpeningTreeTiles

export const OpeningTreeTileWrapper = styled(TileWrapper)`
    background: ${props => props.current ? '#fff' : '#F85c37'};
    width: ${props => props.current ? '640px' : null};
    justify-content: center;
    display: flex;
`