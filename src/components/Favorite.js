import {useState} from 'react'
import styled from 'styled-components'
import {MdFavorite} from '@react-icons/all-files/md/MdFavorite'
import {useSpring, animated} from 'react-spring'

const Favorite = (props) => {
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

export default Favorite

const FavoriteContainer = styled.div`
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    cursor: pointer;
  `
const FavoriteIcon = styled(MdFavorite)`
    width: 100%;
    height: 100%;
    color: ${props => props.favorites ? 'red' : 'transparent'};
    stroke: ${props => props.locked ? '#fff' : '#243862'};
    stroke-width: 1px;
    transition: 0.3s ease-in-out;
`