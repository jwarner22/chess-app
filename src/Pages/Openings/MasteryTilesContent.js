import styled from 'styled-components'
import {H3} from "../../components/UI_Kit/Text/H3"
import Button from "../../components/UI_Kit/Button/Button"
import OpeningMasteryProgressBar from './OpeningMasteryProgressBar'

const MasteryTilesContent = () => {
  return ( <>
  <TileHeader>
    <H3>Closed Spanish</H3>
    <OpeningMasteryProgressBar />
    </TileHeader>
    <TileFooter>
        <MasteryTileButton>
            Continue
        </MasteryTileButton>
        <FooterStatsContainer>
            <StatWrapper>
                <StatHeadline>
                    Completed Lines
                </StatHeadline>
                <StatContent>
                    45
                </StatContent>
            </StatWrapper>
            <StatWrapper>
                <StatHeadline>
                    Opening Popularity
                </StatHeadline>
                <StatContent>
                    4th
                </StatContent>
            </StatWrapper>
        </FooterStatsContainer>
    </TileFooter>
    </>
  )
}

export default MasteryTilesContent

const TileHeader = styled.div`
    padding: 24px;
`

const TileFooter = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    background: #EEF0FF;
    height: 30%;
    padding: 24px;
    flex-wrap: wrap;
`
const MasteryTileButton = styled(Button)`
    background: #FF8B59;
    color: #fff;
    font-weight: 600;
    max-height: 50px;
    margin: auto 0px;
`

const FooterStatsContainer = styled.div`
    display: flex;
`
const StatWrapper = styled.div`
    background: #fff;
    margin: 0px 6px;
    padding: 12px 24px;
    border-radius: 10px;
`
const StatHeadline = styled.h5`
    font-weight: 400;
`
const StatContent = styled.h6`
    font-size: 24px;
`
