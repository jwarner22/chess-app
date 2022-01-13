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

    const activeLife = livesIcon;
    const inactiveLife = lostLife;

    useEffect(() => {
        if(lives < 3){
            setLifeThree(false)
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
            <LifeOne>{lifeOne ? <LivesImg isMobile={props.isMobile} src={livesIcon}/> : <LivesImg isMobile={props.isMobile} src={lostLife}/>}</LifeOne>
            <LifeTwo>{lifeTwo ? <LivesImg isMobile={props.isMobile} src={livesIcon}/> : <LivesImg isMobile={props.isMobile} src={lostLife}/>}</LifeTwo>
            <LifeThree>{lifeThree ? <LivesImg isMobile={props.isMobile} src={livesIcon}/> : <LivesImg isMobile={props.isMobile} src={lostLife}/>}</LifeThree>
            </LivesGrid>
        </LivesWrapper>
        </div>
    )
}

export default Lives
