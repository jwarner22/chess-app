import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { OpeningTreeTileWrapper } from './OpeningTreeTiles';
import { TileWrapper, TileHeader, TileHeadline, TileSubheadline, CurrentHeadlineWrapper, TileContent, CurrentOpeningContainer } from "./PuzzleTileElements";
import Button from "../Button/Button"

const CurrentOpeningTreeTile = (props) => {
    return (
      <>
      <CurrentOpeningContainer>
    <OpeningTreeTileWrapper current>
        <CurrentHeadlineWrapper>
        <TileHeadline current>{props.currentOpening.name}</TileHeadline>
        <TileSubheadline >Popularity: {props.currentOpening.popularity}% Mastery: {props.completions}</TileSubheadline>
        </CurrentHeadlineWrapper>
        <TileHeader current>
                <TileSubheadline current>Move Sequence: {props.currentOpening.moves}</TileSubheadline>
                <Link to={{pathname: `/pre-opening-test/${props.currentOpening.moves}`, state: props}}>
                <OpeningButton>Start</OpeningButton>
                </Link>
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