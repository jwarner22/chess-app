import {
    StatContainer, 
    StatWrapper, 
    StatImage, 
    StatTitle,
StatContentWrapper,
Stat} from "./LargeTileElements"



const LargeTile = (props) => {
    const {value, title, image} = props;
    // const src = {(props.title === "Accuracy") ? icon : icon2}
    return (
        <>
            <StatContainer>
                <StatWrapper>
                <StatImage src={image}/>
                    <StatContentWrapper>
                    <Stat>
                        {(title === 'Accuracy') ? `${value}%` : value}
                    </Stat>
                    <StatTitle>
                        {title}
                    </StatTitle>
                    </StatContentWrapper>
                </StatWrapper>
            </StatContainer>
            {/* <LargeTileContainer>
                <LargeTileWrapper>
                    <LargeTileContent>
                        <LargeTileIconWrapper>
                            <TileIcon src={(title === "Accuracy") ? icon : icon2}/>
                        </LargeTileIconWrapper>
                        <LargeTileTitle>
                        {title}
                        </LargeTileTitle>
                        <LargeTileData>
                        
                        </LargeTileData>
                        <LargeTileTip>
                        {(title === 'Accuracy') ? 'Try to stay above 90%' : 'Keep climbing'}
                        
                        </LargeTileTip>
                    </LargeTileContent>
                </LargeTileWrapper>
            </LargeTileContainer> */}
        </>
    )
}

export default LargeTile
