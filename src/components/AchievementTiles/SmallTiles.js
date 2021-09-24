import React from 'react'
import {SmallTileContainer, 
    SmallTileWrapper, 
    SmallTileContent, 
    SmallTileIconWrapper, 
    SmallTileTitle, 
    ProgressBarWrapper, 
    SmallTileDescription,
    SmallTileIconContainer
} from "./SmallTileElements"

const SmallTile = () => {
    return (
        <>
            <SmallTileContainer>
                <SmallTileWrapper>
                    <SmallTileContent>
                        <SmallTileIconContainer>
                        <SmallTileIconWrapper>
                        </SmallTileIconWrapper>
                        </SmallTileIconContainer>
                        <SmallTileTitle>
                                Hot Streak
                            </SmallTileTitle>
                            <ProgressBarWrapper>

                            </ProgressBarWrapper>
                            <SmallTileDescription>
                                Reach a 3 day streak
                            </SmallTileDescription>
                    </SmallTileContent>
                </SmallTileWrapper>
            </SmallTileContainer>
        </>
    )
}

export default SmallTile
