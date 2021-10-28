import React from 'react'
import {LargeTileContainer, TileIcon, LargeTileWrapper, LargeTileContent, LargeTileIconWrapper, LargeTileTitle, LargeTileData, LargeTileTip} from "./LargeTileElements"
import icon from "../../Images/Aim.png"
import icon2 from "../../Images/rating.png"

const LargeTile = (props) => {
    const {value, title} = props;
    // const src = {(props.title === "Accuracy") ? icon : icon2}
    return (
        <>
            <LargeTileContainer>
                <LargeTileWrapper>
                    <LargeTileContent>
                        <LargeTileIconWrapper>
                            <TileIcon src={(title === "Accuracy") ? icon : icon2}/>
                        </LargeTileIconWrapper>
                        <LargeTileTitle>
                        {title}
                        </LargeTileTitle>
                        <LargeTileData>
                        {(title === 'Accuracy') ? `${value}%` : value}
                        </LargeTileData>
                        <LargeTileTip>
                        {(title === 'Accuracy') ? 'Try to stay above 90%' : 'Keep climbing'}
                        
                        </LargeTileTip>
                    </LargeTileContent>
                </LargeTileWrapper>
            </LargeTileContainer>
        </>
    )
}

export default LargeTile
