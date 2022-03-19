import {useState} from 'react'
import styled from 'styled-components'
import {AiFillLock} from '@react-icons/all-files/ai/AiFillLock'

const Lock = (props) => {
    const [favorites, setFavorites] = useState(false)
    const {locked} = props;

  return (
      <>
    <FavoriteContainer >
        <FavoriteIcon onClick={() => {setFavorites(!favorites)}} favorites={favorites} locked={locked} />
    </FavoriteContainer>
    </>
  )
}

export default Lock

const FavoriteContainer = styled.div`
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    cursor: pointer;
  `
const FavoriteIcon = styled(AiFillLock)`
    width: 100%;
    height: 100%;
    stroke-width: 1px;
    transition: 0.3s ease-in-out;
`