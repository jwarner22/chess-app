import React, {useState, useEffect} from 'react'
import styled from "styled-components"
import {Link} from 'react-router-dom'
import {
    MenuWrapper,
    MenuGrid,
    MenuTile,
    MenuContent,
    MenuTitle,
    MenuImg
} from './CoursesElements'
import EngameTiles from './EngameTiles'
import TacticTiles from './TacticTiles'
import CheckmateTiles from './CheckmateTiles'
import endgameImg from "../../../../../Images/kingIconBlue.svg"
import tacticsImg from "../../../../../Images/TacticsIconBlue.svg"
import checkmateImg from "../../../../../Images/checkmateIconBlue.svg"


const Body = (props, {activeMenuTile, inactiveMenuTile}) => {
    const [showEndgameTiles, setShowEngameTiles] = useState(true);
    const [showTacticTiles, setShowTacticTiles] = useState(false);
    const [showCheckmateTiles, setShowCheckmateTiles] = useState(false);

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


    return (
        <>
        <MenuWrapper>
            <MenuGrid className="menuGrid">
                <MenuTile  className="endgameButton"onClick={handleShowEngameTiles}>
                    <MenuContent>
                        <MenuImg src={endgameImg} />
                        <MenuTitle>
                            Endgames
                        </MenuTitle>
                    </MenuContent>
                </MenuTile>
                <MenuTile className="tacticButton" onClick={handleShowTacticTiles}>
                    <MenuContent>
                        <MenuImg src={tacticsImg} />
                            <MenuTitle>
                                Tactics
                        </MenuTitle>
                    </MenuContent>
                </MenuTile>
                <MenuTile className="checkmateButton" onClick={handleShowCheckmateTiles}>
                    <MenuContent>
                        <MenuImg src={checkmateImg} />
                            <MenuTitle>
                                Checkmates
                            </MenuTitle>
                    </MenuContent>
                </MenuTile>
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