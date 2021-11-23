import React from 'react'
import {LivesWrapper,
LivesGrid,
LivesImgRed} from "./LivesElements"
import lives from "../../../../Images/heart.svg"

const Lives = () => {

    let lives = [{
        img: require("../../../../Images/heart.svg")
    },{
        img: require("../../../../Images/heart.svg")
    },{
        img: require("../../../../Images/heart.svg")
    }
]

    return (
        <div>
    <   LivesWrapper>
            {/* <LivesGrid>
            <LivesImgRed src={lives}/>
            <LivesImgRed src={lives}/>
            <LivesImgRed src={lives}/>
            </LivesGrid> */}
        </LivesWrapper>
        </div>
    )
}

export default Lives
