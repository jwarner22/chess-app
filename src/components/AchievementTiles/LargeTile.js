import React from 'react'
import {LargeTileContainer, LargeTileWrapper, LargeTileContent, LargeTileIconWrapper, LargeTileTitle, LargeTileData, LargeTileTip} from "./LargeTileElements"

const LargeTile = () => {
    return (
        <>
            <LargeTileContainer>
                <LargeTileWrapper>
                    <LargeTileContent>
                        <LargeTileIconWrapper>
                        </LargeTileIconWrapper>
                        <LargeTileTitle>
                                Accuracy
                        </LargeTileTitle>
                        <LargeTileData>
                            95%
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
