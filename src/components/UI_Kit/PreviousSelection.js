import {GrLinkPrevious} from '@react-icons/all-files/gr/GrLinkPrevious'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'

const PreviousSelection = () => {
    let history = useHistory();

  return (
    <ClickPrevious>
        <PreviousIcon onClick={() => history.goBack()}>Previous</PreviousIcon>
    </ClickPrevious>
  )
}

export default PreviousSelection

const ClickPrevious = styled.div`
    display: flex;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    padding-top: 40px;
    padding-left: 40px;

    @media screen and (max-width: 450px){
        top: 0;
        left: 0;
        padding-top: 12px;
        padding-left: 12px;
    }
`

const PreviousIcon = styled(GrLinkPrevious)`
    width: 32px;
    height: 32px;
    stroke: #9CA1BC;
`