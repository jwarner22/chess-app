import React from 'react'
import {LargeTileContainer, LargeTileWrapper, LargeTileContent, LargeTileIconWrapper, LargeTileTitle, LargeTileData, LargeTileTip} from "./LargeTileElements"

const LargeTile = (props) => {
    const {value, title} = props;
    return (
        <>
            <LargeTileContainer>
                <LargeTileWrapper>
                    <LargeTileContent>
                        <LargeTileIconWrapper>
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
