import React from 'react'
import {useSpring, animated} from 'react-spring'
import board from '../../Images/checker-board.svg'
import styled from 'styled-components'

const ChessboardLoader = () => {
    const styles = useSpring({
        loop: true,
        from: {rotateZ: 0},
        to: {rotateZ: 180},
    })
  return (
      <>
      <LoaderContainer>
        <animated.div style={{
            display: 'flex',
            height: '80px',
            width: '80px',
            justifyContent: 'center',
            ...styles,
        }}>
            <img src={board}/>
        </animated.div>
    </LoaderContainer>
    </>
  )
}

export default ChessboardLoader

const LoaderContainer = styled.div`
    position: fixed;
    justify-content: center;
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
`