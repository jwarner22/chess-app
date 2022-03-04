import { TileWrapper, TileHeader, TileHeadline, TileSubheadline } from "./PuzzleTileElements"
import styled from 'styled-components'
import { PageContainer } from "../Page"

const OpeningTreeTiles = (props) => {
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

const OpeningTreeTileWrapper = styled(TileWrapper)`
    background: #F85c37
`