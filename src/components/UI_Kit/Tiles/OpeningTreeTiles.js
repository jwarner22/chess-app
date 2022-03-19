import { TileWrapper, TileHeader, TileHeadline, TileSubheadline } from "./PuzzleTileElements"
import styled from 'styled-components'
import { PageContainer } from "../Page"
import  Favorite from "../../Favorite"

const OpeningTreeTiles = (props) => {
  
  return (
    <OpeningTreeTileWrapper {...props}>
        <TileHeader>
         <TileHeadline>{props.name}</TileHeadline>
        <TileSubheadline>Next move: {props.moves}</TileSubheadline>
        <TileSubheadline>Popularity: {props.popularity}%</TileSubheadline>
        </TileHeader>
        <Favorite locked={props.locked} />
    </OpeningTreeTileWrapper>
  )
}

export default OpeningTreeTiles

export const OpeningTreeTileWrapper = styled(TileWrapper)`
    background: ${props => {
      if (props.locked) {
        return "#808080"
      } else if (props.current) {
        return "#fff"
      } else {
        return "#F85c37"
      }
    }};
    opacity: ${props => props.locked ? 0.5 : 1};
    width: ${props => props.current ? '640px' : null};
    justify-content: center;
    display: flex;
    position: relative;
`

//props.current ? '#fff' : '#F85c37'};