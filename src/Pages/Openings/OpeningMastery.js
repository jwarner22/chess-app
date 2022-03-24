import styled from 'styled-components';
import { useContext } from 'react';
import LargeConatiner from '../../components/UI_Kit/Boxes/Containers/LargeConatiner';
import CategoryTitle from '../../components/UI_Kit/CategoryTitle/CategoryTitle';
import MasteryTiles from './MasteryTiles';

import { UserContext } from '../../providers/GlobalState';

const OpeningMastery = () => {

const [openingStats] = useContext(UserContext);

console.log(openingStats)

  return (<>
        <CategoryTitle>OpeningMastery</CategoryTitle>
          <LargeConatiner>
            <MasteryTiles />
        </LargeConatiner>
    </>
  )
}

export default OpeningMastery



