import React from 'react';
import { OpeningTreeTileWrapper } from './OpeningTreeTiles';
import { TileWrapper, TileHeader, TileHeadline, TileSubheadline, CurrentHeadlineWrapper } from "./PuzzleTileElements";

const CurrentOpeningTreeTile = (props) => {
  return (
      <>
    <OpeningTreeTileWrapper current>
        <CurrentHeadlineWrapper>
        <TileHeadline current>{props.name}</TileHeadline>
        </CurrentHeadlineWrapper>
        <TileHeader current>
        <TileSubheadline current>Move Sequence: {props.moves}</TileSubheadline>
        <h3>Popularity: {props.popularity}</h3>
        </TileHeader>
    </OpeningTreeTileWrapper>
    </>
  )
}

export default CurrentOpeningTreeTile