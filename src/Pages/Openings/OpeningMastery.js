import styled from 'styled-components'
import LargeConatiner from '../../components/UI_Kit/Boxes/Containers/LargeConatiner'
import CategoryTitle from '../../components/UI_Kit/CategoryTitle/CategoryTitle'
import MasteryTiles from './MasteryTiles'

const OpeningMastery = () => {
  return (<>
        <CategoryTitle>OpeningMastery</CategoryTitle>
          <LargeConatiner>
            <MasteryTiles />
        </LargeConatiner>
    </>
  )
}

export default OpeningMastery



