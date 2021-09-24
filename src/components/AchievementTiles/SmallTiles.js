import React, {useState, useEffect} from 'react'
import {SmallTileContainer, 
    SmallTileWrapper, 
    SmallTileContent, 
    SmallTileIconWrapper, 
    SmallTileTitle, 
    ProgressBarWrapper, 
    SmallTileDescription,
    SmallTileIconContainer
} from "./SmallTileElements"

const SmallTile = (props) => {
    const [category, setCategory] = useState('')
    const {achievement} = props;
    
    useEffect(() => {
        matchCategory()
    }, [])

    const matchCategory = () => {
        switch(achievement.category) {
            case 'high_score':
                setCategory('High Score')
                break;
    
            case 'high_rating':
                setCategory('Record Rating')
                break;
    
            case 'perfect':
                setCategory('Perfect Module')
                break;
                
            default:
                return '';
        }
    }


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
                                {category} - {achievement.theme}
                            </SmallTileTitle>
                            <ProgressBarWrapper>

                            </ProgressBarWrapper>
                            <SmallTileDescription>
                                Reach a 3 day streak - {(achievement.value !== 0) ? achievement.value : ''}
                            </SmallTileDescription>
                    </SmallTileContent>
                </SmallTileWrapper>
            </SmallTileContainer>
        </>
    )
}

export default SmallTile
