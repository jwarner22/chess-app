import styled from 'styled-components'
import { OpeningTreeTileWrapper } from './OpeningTreeTiles';
import { TileWrapper, TileHeader, TileHeadline, TileSubheadline, CurrentHeadlineWrapper, TileContent, CurrentOpeningContainer } from "./PuzzleTileElements";
import Button from "../Button/Button"

const CurrentOpeningTreeTile = (props) => {
  return (
      <>
      <CurrentOpeningContainer>
    <OpeningTreeTileWrapper current>
        <CurrentHeadlineWrapper>
        <TileHeadline current>{props.name}</TileHeadline>
        <TileSubheadline >Popularity: {props.popularity}</TileSubheadline>
        </CurrentHeadlineWrapper>
        <TileHeader current>
                <TileSubheadline current>Move Sequence: {props.moves}</TileSubheadline>
                <OpeningButton>Start</OpeningButton>
        </TileHeader>
    </OpeningTreeTileWrapper>
    </CurrentOpeningContainer>
    </>
  )
}

export default CurrentOpeningTreeTile

const OpeningButton = styled(Button)`
  background:  #FF8B59;
  color: #fff;
`