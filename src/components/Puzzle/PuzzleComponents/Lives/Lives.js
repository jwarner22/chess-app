import React, {useState, useEffect}from 'react'
import {LivesWrapper,
LivesGrid,
LivesImg,
LifeOne, 
LifeTwo,
LifeThree} from "./LivesElements"
import livesIcon from "../../../../Images/heart.svg"
import lostLife from "../../../../Images/close.svg"

const Lives = (props) => {
    const [lifeOne, setLifeOne] = useState(true)
    const [lifeTwo, setLifeTwo] = useState(true)
    const [lifeThree, setLifeThree] = useState(true)
    const {lives} = props;
    console.log(lives)
    console.log(lifeThree)

    const activeLife = livesIcon;
    const inactiveLife = lostLife;

    useEffect(() => {
        console.log(`effect is running`)
        if(lives < 3){
            setLifeThree(false)
            console.log(`state updated`)
            }
        if(lives < 2){
            setLifeTwo(false)
        }
        if(lives < 1){
            setLifeOne(false)
        }
    }, [lives])



    return (
        <div>
    <   LivesWrapper>
            <LivesGrid>
            <LifeOne>{lifeOne ? <LivesImg src={livesIcon}/> : <LivesImg src={lostLife}/>}</LifeOne>
            <LifeTwo>{lifeTwo ? <LivesImg src={livesIcon}/> : <LivesImg src={lostLife}/>}</LifeTwo>
            <LifeThree>{lifeThree ? <LivesImg src={livesIcon}/> : <LivesImg src={lostLife}/>}</LifeThree>
            </LivesGrid>
        </LivesWrapper>
        </div>
    )
}

export default Lives
