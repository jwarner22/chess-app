import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { OpeningTreeTileWrapper } from './OpeningTreeTiles';
import { TileWrapper, TileHeader, OpeningTileHeadline, OpeningTileSubheadline, CurrentHeadlineWrapper, TileContent, CurrentOpeningContainer } from "./PuzzleTileElements";
import Button from "../Button/Button"
import {Rating} from 'react-simple-star-rating'

import {useWindowSize} from '../../../hooks/UseWindowSize';


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
                <Link to={{pathname: `/pre-opening-test/${props.currentOpening.uci}`, state: props}}>
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

const StarRating = (props) => {
  const {mastery,isMobile} = props;
  const size = isMobile ? 16 : 20;

  // generalized logarithmic function for non-linear mastery rating
  // equation: x/(a+x), where x is mastery value and a is a constant defined as the growth rate of the rating as a function of mastery
  const alpha = 1000; // growth rate (how rapidly the rating increases)
  let rating = (mastery/(alpha+mastery))*100; // rating calc
  if (rating > 95) rating = 100; // max rating for mastery (for alpha = 1000, mastery is ~20000)

  return(
    <Rating ratingValue={rating} size={size} readonly={true} fillcolor="#1161d4"/>
  )
}

// function getRating(mastery, max_mastery) {
//   console.log({mastery: mastery, max_mastery: max_mastery})
//     if (mastery > max_mastery) {
//         return 5;
//     } 
//     if (mastery > max_mastery*0.8) {
//         return 4;
//     }
//     if (mastery > max_mastery*0.6) {
//         return 3;
//     }
//     if (mastery > max_mastery*0.4) {
//         return 2;
//     }
//     if (mastery > max_mastery*0.2) {
//         return 1;
//     }
//     if (mastery > 0) {
//         return 1;
//     }
//         return 0;
// }
