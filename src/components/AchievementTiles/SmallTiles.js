import React, {useState, useEffect} from 'react'
import {Modules} from '../PostLogin/Views/PatternRecognition/CourseTiles/Data'
import {Line} from 'rc-progress';
import {SmallTileContainer, 
    SmallTileWrapper, 
    SmallTileContent, 
    SmallTileIconWrapper, 
    SmallTileIcon,
    SmallTileTitle, 
    ProgressBarWrapper, 
    SmallTileDescription,
    SmallTileCategory,
    SmallTileValue,
    SmallTileIconContainer
} from "./SmallTileElements"
import { SettingsInputComponent } from 'styled-icons/material';
//import { ChessPawn, ChessKnight, ChessBishop, ChessRook, ChessQueen, ChessKing } from 'styled-icons/fa-solid';

const SmallTile = (props) => {
    const {achievement} = props;

    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [module, setModule] = useState({})
    const [percent, setPercent] = useState(0);
    // const [lowValue, setLowValue] = useState(0);
    // const [highValue, setHighValue] = useState(0);

    const color = 'blue';
    const strokeWidth = (props.isMobile) ? 5 : 2;

    useEffect(() => {
        matchCategory()
        matchModule()
        calcPercent()
    }, [])

    const matchCategory = () => {
        switch(achievement.category) {
            case 'high_score':
                setCategory('New High Score')
                setDescription('You set a new high score!')
                break;
    
            case 'high_rating':
                setCategory('New High Rating')
                setDescription('Your rating hit an all time high')
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
            // setLowValue(0)
            // setHighValue(value)
        } else if (value <= achievement.value && achievement.value < (value + increment)) { 
            setPercent(((achievement.value-(value))/increment)*100)
            // setLowValue(value)
            // setHighValue(value + increment)
        } else if ((value + increment) <= achievement.value && achievement.value < value + (2*increment)) { 
            setPercent(((achievement.value-(value+increment))/increment)*100)
            // setLowValue(value + increment)
            // setHighValue(value + (2*increment))
        } else if ((value + 2*increment) <= achievement.value && achievement.value < value + (3*increment)) { 
            setPercent(((achievement.value-(value+2*increment))/increment)*100)
            // setLowValue(value + (2*increment))
            // setHighValue(value + (3*increment))
        } else if ((value + 3*increment) <= achievement.value && achievement.value < value + (4*increment)) { 
            setPercent(((achievement.value-(value+3*increment))/increment)*100)
            // setLowValue(value + (3*increment))
            // setHighValue(value + (4*increment))
        } else if ((value + 4*increment) <= achievement.value) { 
            setPercent(((achievement.value-(value+4*increment))/increment)*100)
            // setLowValue(value + (4*increment))
            // setHighValue(value + (5*increment))
        }
        
    }

    return (
        <>
            <SmallTileContainer>
                <SmallTileWrapper>
                    <SmallTileContent>
                        <SmallTileIconContainer>
                        <SmallTileIconWrapper>
                            <SmallTileIcon src={module.img}/>
                        </SmallTileIconWrapper>
                        </SmallTileIconContainer>
                        <SmallTileTitle category={achievement.category}>
                                {module.headline}
                            </SmallTileTitle>
                           <SmallTileCategory>{category}</SmallTileCategory>
                            {/* <SmallTileDescription>
                                {description} 
                            </SmallTileDescription> */}
                            <SmallTileValue>
                                {(achievement.value !== 0) ? `${achievement.value}` : ''} {(achievement.diff == null) ? '' : `+${achievement.diff}`}
                            </SmallTileValue>
                            
                    </SmallTileContent>
                </SmallTileWrapper>
            </SmallTileContainer>
        </>
    )
}

export default SmallTile

// {(achievement.category !== 'perfect') && <ProgressBarWrapper props={props}></ProgressBarWrapper>}
// {(achievement.value !== 0) && <Line percent={percent} strokeWidth={strokeWidth} strokeColor={color} />}


// const RankIcon = (props) => { 
//     const {achievement} = props;
//     let value = 0;
//     let increment = 0;

//     switch(achievement.category) {
//         case 'high_score':
//             value = 100;
//             increment = 100;
//             break;
//         case 'high_rating':
//             value = 800;
//             increment = 400;
//             break;
//         case 'perfect':
//             return  null;
//         default:
//             return null;
//     }

//     if (achievement.value < value) { 
//         //setRank('Novice')
//         return <ChessPawn size={40} color='blue'/>
//     } else if (value <= achievement.value && achievement.value < (value + increment)) { 
//         //setRank('Intermediate');
//         return <ChessKnight size={40} color='blue'/>
//     } else if ((value + increment) <= achievement.value && achievement.value < value + (2*increment)) { 
//         //setRank('Advanced');
//         return <ChessBishop size={40} color='blue'/>
//     } else if ((value + 2*increment) <= achievement.value && achievement.value < value + (3*increment)) { 
//         //setRank('Expert');
//         return <ChessRook size={40} color='blue'/>
//     } else if ((value + 3*increment) <= achievement.value && achievement.value < value + (4*increment)) { 
//         //setRank('Master');
//         return <ChessQueen size={40} color='blue'/>
//     } else if ((value + 4*increment) <= achievement.value) { 
//         //setRank('Grandmaster');
//         return <ChessKing size={40} color='blue'/>
//     } else {
//         return null;
//     }

// }

//</ProgressBarWrapper>