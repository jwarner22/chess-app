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
                        {value}
                        </LargeTileData>
                        <LargeTileTip>
                        Try to stay above 90%
                        </LargeTileTip>
                    </LargeTileContent>
                </LargeTileWrapper>
            </LargeTileContainer>
        </>
    )
}

export default LargeTile
