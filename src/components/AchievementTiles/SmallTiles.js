import React, {useState, useEffect} from 'react'
import {Modules} from '../PostLogin/CoursesBody/CourseTile/Data'
import {Line} from 'rc-progress';
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
    const [description, setDescription] = useState('')
    const [module, setModule] = useState({})
    const {achievement} = props;
    const percent = (achievement.value/500)*100 // calculates percent of progress to max score (rudimentary initial setup)
    //const percent = 50;
    const color = 'blue';
    console.log(achievement.value)
    console.log(percent)
    useEffect(() => {
        matchCategory()
        matchModule()
    }, [])

    const matchCategory = () => {
        switch(achievement.category) {
            case 'high_score':
                setCategory('High Score')
                setDescription('You set a new high score!')
                break;
    
            case 'high_rating':
                setCategory('Record Rating')
                setDescription('Your rating hit an all time high for this theme.')
                break;
    
            case 'perfect':
                setCategory('Perfect Module')
                setDescription(`You didn't miss a single puzzle!`)
                break;
                
            default:
                return '';
        }
    }

    const matchModule = () => {
        let module = Modules.find(module => module.type_ref ===achievement.theme)
        setModule(module)
    }

    return (
        <>
            <SmallTileContainer>
                <SmallTileWrapper>
                    <SmallTileContent>
                        <SmallTileIconContainer>
                        <SmallTileIconWrapper>
                            <img src={module.img} alt='' />
                        </SmallTileIconWrapper>
                        </SmallTileIconContainer>
                        <SmallTileTitle>
                                {category} - {module.headline}
                            </SmallTileTitle>
                            <ProgressBarWrapper>
                            {(achievement.value !== 0) && <Line percent={percent} strokeWidth={5} strokeColor={color} />}
                            </ProgressBarWrapper>
                            <SmallTileDescription>
                                {description} {(achievement.value !== 0) ? `- ${achievement.value}` : ''}
                            </SmallTileDescription>
                    </SmallTileContent>
                </SmallTileWrapper>
            </SmallTileContainer>
        </>
    )
}

export default SmallTile

//</ProgressBarWrapper>