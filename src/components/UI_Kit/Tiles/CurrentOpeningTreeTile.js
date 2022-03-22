import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { OpeningTreeTileWrapper } from './OpeningTreeTiles';
import { TileWrapper, TileHeader, OpeningTileHeadline, OpeningTileSubheadline, CurrentHeadlineWrapper, TileContent, CurrentOpeningContainer } from "./PuzzleTileElements";
import Button from "../Button/Button"
import {Rating} from 'react-simple-star-rating'
import { calcMastery } from '../../Module/Utilities/Scoring';

import {useWindowSize} from '../../../hooks/UseWindowSize'; 
import Favorite from '../../Favorite';


const CurrentOpeningTreeTile = (props) => {
  const windowSizeWidth = useWindowSize()[0];
  const isMobile = windowSizeWidth <= 640;
  
  return (
      <>
      <CurrentOpeningContainer>
    <OpeningTreeTileWrapper current>
        <CurrentHeadlineWrapper>
        <OpeningTileHeadline current>{props.currentOpening.name}</OpeningTileHeadline>
        <div style={{color:"#fff", fontSize: "12px" }}>Popularity:</div>
        <OpeningTileSubheadline>{props.popularity}%</OpeningTileSubheadline>
        <OpeningTileSubheadline >Mastery: <StarRating mastery={props.mastery} isMobile={isMobile}/></OpeningTileSubheadline>
        </CurrentHeadlineWrapper>
        <TileHeader current>
                <OpeningTileSubheadline current>Move Sequence: {props.currentOpening.pgn}</OpeningTileSubheadline>
                <Link to={{pathname: `/pre-opening-test/${props.currentOpening.uci}`, state: {...props, 'isDaily': false}}}>
                <OpeningButton>Start</OpeningButton>
                </Link>
                <Favorite userId={props.userId} openingId={props.currentOpening.opening_id} locked={props.locked} />
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

const StarRating = (props) => {
  const {mastery,isMobile} = props;
  const size = isMobile ? 16 : 20;
  
  let rating = calcMastery(mastery); // max rating for mastery (for alpha = 1000, mastery is ~20000)

  return(
    <Rating ratingValue={rating} size={size} readonly={true} fillcolor="#1161d4"/>
  )
}

