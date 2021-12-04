import React, {useState, useEffect} from 'react'
import styled from "styled-components"
import {Link} from 'react-router-dom'
import {CoursesWrapper, 
    ModuleWrapper, 
    ModuleGrid, 
    CategoryLabel,
    CategoryLabelWrapper,
    CategoryLabelContainer,
    TacticsLabelWrapper,
    CategoryLabelContainerTop,
    CheckmatesLabelWrapper,
    EndgamesLabelWrapper,
    MenuWrapper,
    MenuGrid,
    MenuTile
} from './CoursesElements'
import CourseTile from '../CourseTiles/CourseTiles'
import {Modules} from '../CourseTiles/Data';
import EngameTiles from './EngameTiles'
import TacticTiles from './TacticTiles'
import CheckmateTiles from './CheckmateTiles'

const Body = (props) => {
    const [showEndgameTiles, setShowEngameTiles] = useState(true);
    const [showTacticTiles, setShowTacticTiles] = useState(false);
    const [showCheckmateTiles, setShowCheckmateTiles] = useState(false)

    function handleShowEngameTiles(){
        if (showEndgameTiles === false) {
            setShowEngameTiles(true) 
        }
    }

    function handleShowTacticTiles(){
        if (showTacticTiles === false) {
            setShowTacticTiles(true)
        }
    }

    function handleShowCheckmateTiles(){
        if (showCheckmateTiles === false){
            setShowCheckmateTiles(true)
        } 
    }

    useEffect(() => {
       if (showTacticTiles === true) {
           setShowEngameTiles(false);
           setShowCheckmateTiles(false)
       }
    }, [showTacticTiles]);

    useEffect(() => {
        if (showEndgameTiles === true) {
            setShowTacticTiles(false);
            setShowCheckmateTiles(false)
        }
    }, [showEndgameTiles]);

    useEffect(() => {
        if (showCheckmateTiles === true) {
            setShowEngameTiles(false)
            setShowTacticTiles(false)
        }
    }, [showCheckmateTiles])
    
    const endgameActive = showEndgameTiles;
    const tacticActive = showTacticTiles;
    const checkmateActive = showCheckmateTiles;

    console.log(endgameActive)
    console.log(tacticActive)
    console.log(checkmateActive)

    return (
        <>
        <MenuWrapper>
            <MenuGrid className="menuGrid">
                <MenuTile className="endgameButton" onClick={handleShowEngameTiles}>Endgames</MenuTile>
                <MenuTile className="tacticButton" onClick={handleShowTacticTiles}>Tactics</MenuTile>
                <MenuTile className="checkmateButton" onClick={handleShowCheckmateTiles}>CheckMates</MenuTile>
            </MenuGrid>
        </MenuWrapper>
        {endgameActive ? (<EngameTiles className="endgameTiles"/>) : (null)}
        {tacticActive ? (<TacticTiles className="tacticTiles"/>) : (null)}
        {checkmateActive ? (<CheckmateTiles className="checkmateTiles"/>) : (null)}
        </>
    )
}

export default Body

const ModalLink = styled(Link)`
    position: relative;
    z-index: 10;
`


//backup old label container styling

{/* <CategoryLabelContainer>
<EndgamesLabelWrapper>
    <CategoryLabel>
        Endgames
    </CategoryLabel>
</EndgamesLabelWrapper>
</CategoryLabelContainer> */}