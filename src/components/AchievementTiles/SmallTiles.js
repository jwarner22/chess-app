import React, {useState, useEffect} from 'react'
import {Modules} from '../../data/ModuleData'
import {SmallTileContainer, 
    SmallTileWrapper, 
    SmallTileContent, 
    SmallTileIconWrapper, 
    SmallTileIcon,
    SmallTileTitle, 
    SmallTileCategory,
    SmallTileValue,
    SmallTileIconContainer,
    ValueDiff
} from "./SmallTileElements"

const SmallTile = (props) => {
    const {achievement} = props;
    const [category, setCategory] = useState('')
    const [module, setModule] = useState({})
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        matchCategory()
        matchModule()
        calcPercent()
    }, [])

    const matchCategory = () => {
        switch(achievement.category) {
            case 'high_score':
                setCategory('New High Score')
                break;
    
            case 'high_rating':
                setCategory('New High Rating')
                break;
    
            case 'perfect':
                setCategory('Perfect Module')
                break;
                
            default:
                return '';
        }
    }

    const matchModule = () => {
        let module = Modules.find(module => module.type_ref ===achievement.theme)
        setModule(module)
    }

    const calcPercent = () => {

        let value = 0;
        let increment = 0;
    
        switch(achievement.category) {
            case 'high_score':
                value = 100;
                increment = 100;
                break;
            case 'high_rating':
                value = 800;
                increment = 400;
                break;
            case 'perfect':
                return  null;
            default:
                return null;
        }

        if (achievement.value < value) { 
            setPercent(((achievement.value)/value)*100)
        } else if (value <= achievement.value && achievement.value < (value + increment)) { 
            setPercent(((achievement.value-(value))/increment)*100)
        } else if ((value + increment) <= achievement.value && achievement.value < value + (2*increment)) { 
            setPercent(((achievement.value-(value+increment))/increment)*100)
        } else if ((value + 2*increment) <= achievement.value && achievement.value < value + (3*increment)) { 
            setPercent(((achievement.value-(value+2*increment))/increment)*100)
        } else if ((value + 3*increment) <= achievement.value && achievement.value < value + (4*increment)) { 
            setPercent(((achievement.value-(value+3*increment))/increment)*100)
        } else if ((value + 4*increment) <= achievement.value) { 
            setPercent(((achievement.value-(value+4*increment))/increment)*100)
        }
        
    }

    if (typeof module === 'undefined') return null;
    
    return (
        <>
            <SmallTileContainer>
                <SmallTileWrapper>
                    <SmallTileContent>
                        <SmallTileIconContainer>
                        <SmallTileIconWrapper type={module.type}>
                            <SmallTileIcon src={module.img}/>
                        </SmallTileIconWrapper>
                        </SmallTileIconContainer>
                        <SmallTileTitle category={achievement.category}>
                                {module.headline}
                            </SmallTileTitle>
                           <SmallTileCategory>{category}</SmallTileCategory>
                            <SmallTileValue>
                                {(achievement.value !== 0) ? `${achievement.value}` : ''} {(achievement.diff == null | achievement.diff === 0) ? null : <ValueDiff>{`+${achievement.diff}`}</ValueDiff>}
                            </SmallTileValue>
                            
                    </SmallTileContent>
                </SmallTileWrapper>
            </SmallTileContainer>
        </>
    )
}

export default SmallTile
