import React, {useState, useEffect}from 'react'
import styled from "styled-components"
import {LivesWrapper,
LivesGrid,
LivesImg,
LifeOne, 
LifeTwo,
LifeThree} from "./LivesElements"
import { CSSTransition } from "react-transition-group"
import { ReactComponent as HeartIcon } from "../../../../Images/heart.svg"
import { ReactComponent as XIcon } from "../../../../Images/close.svg"

const Lives = (props) => {
    const [lifeOne, setLifeOne] = useState(true)
    const [lifeTwo, setLifeTwo] = useState(true)
    const [lifeThree, setLifeThree] = useState(true)
    const {lives} = props;


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

    const heartIcon = {
        img: require('../../../../Images/heart.svg').default
    }
    
      const xIcon = {
        img: require('../../../../Images/close.svg').default
      }

    return (
        <>
        <LivesWrapper>
            <LivesGrid>
                <LivesImg isMobile={props.isMobile}>
                    {lifeOne ? <Heart /> : <X />}
                </LivesImg>
                <LivesImg isMobile={props.isMobile}>
                    {lifeTwo ? <Heart/> : <X />}
                </LivesImg>
                <LivesImg isMobile={props.isMobile}>
                    {lifeThree ? <Heart /> : <X />}
                </LivesImg>
            </LivesGrid>
        </LivesWrapper>
        </>
    )
}

export default Lives

const Heart = styled(HeartIcon)`
    width: 30px;
    height: 30px;
    transition: all 0.7s ease-in-out;
`

const X = styled(XIcon)`
    width: 30px;  
    height: 30px;
    transition: all 0.7s ease-in-out;  
`
