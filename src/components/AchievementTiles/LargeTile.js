import React from 'react'
import {LargeTileContainer, 
    TileIcon, 
    LargeTileWrapper, 
    LargeTileContent, 
    LargeTileIconWrapper, 
    LargeTileTitle, 
    LargeTileData, 
    LargeTileTip, 
    StatContainer, 
    StatWrapper, 
    StatImage, 
    StatTitle,
StatContentWrapper,
Stat} from "./LargeTileElements"
import icon from "../../Images/Aim.png"
import icon2 from "../../Images/rating.png"



const LargeTile = (props) => {
    const {value, title, image} = props;
    // const src = {(props.title === "Accuracy") ? icon : icon2}
    return (
        <>
            <StatContainer>
                <StatWrapper>
                <StatImage src={image}/>
                    <StatContentWrapper>
                    <Stat>
                        {(title === 'Accuracy') ? `${value}%` : value}
                    </Stat>
                    <StatTitle>
                        {title}
                    </StatTitle>
                    </StatContentWrapper>
                </StatWrapper>
            </StatContainer>
            {/* <LargeTileContainer>
                <LargeTileWrapper>
                    <LargeTileContent>
                        <LargeTileIconWrapper>
                            <TileIcon src={(title === "Accuracy") ? icon : icon2}/>
                        </LargeTileIconWrapper>
                        <LargeTileTitle>
                        {title}
                        </LargeTileTitle>
                        <LargeTileData>
                        
                        </LargeTileData>
                        <LargeTileTip>
                        {(title === 'Accuracy') ? 'Try to stay above 90%' : 'Keep climbing'}
                        
                        </LargeTileTip>
                    </LargeTileContent>
                </LargeTileWrapper>
            </LargeTileContainer> */}
        </>
    )
}

export default LargeTile
