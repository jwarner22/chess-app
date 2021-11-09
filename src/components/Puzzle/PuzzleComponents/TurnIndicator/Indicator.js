import React from 'react'
import BlackIndicator from "./BlackIndicator"
import WhiteIndicator from "./WhiteIndicator"
import PuzzleBoard from '../PuzzleBoard.jsx'


const Indicator = (props) => {
    console.log(props)
    if (props.turnColor !== "black"){
    return  <BlackIndicator />}
    else return <WhiteIndicator />
    }


export default Indicator
