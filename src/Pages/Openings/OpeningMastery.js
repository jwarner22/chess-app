import styled from 'styled-components';
import { useContext } from 'react';
import LargeConatiner from '../../components/UI_Kit/Boxes/Containers/LargeConatiner';
import CategoryTitle from '../../components/UI_Kit/CategoryTitle/CategoryTitle';
import MasteryTiles from './MasteryTiles';
import { OpeningData } from '../../components/PostLogin/Views/Openings/OpeningData';

import { UserContext } from '../../providers/GlobalState';

const OpeningMastery = () => {

  function sortByMoves(a,b) {
    if(a.moves.length > b.moves.length)
    return 1
    if(a.moves.length === b.moves.length)
    return 0
    return -1
  }
  
  const sortedOpenings = OpeningData.sort(sortByMoves).slice(0, 9);


const {openingStats} = useContext(UserContext);

console.log(sortedOpenings)

  return (<>
        <CategoryTitle>Opening Mastery</CategoryTitle>
          <LargeConatiner>   
              {sortedOpenings.map((module, id) => {
                return(
                <MasteryTiles key={id} {...module}/>
              )})}

        </LargeConatiner>
    </>
  )
}

export default OpeningMastery

const MasteryTileGrid = styled.ul`
  display: grid;
  grid-gap: 24px;
  width: 100%;
  justify-content: center;
  grid-template-rows: max-content;
`

