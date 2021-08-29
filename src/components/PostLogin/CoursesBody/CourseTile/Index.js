import React from 'react'
import {TileWrapper, 
    TileHeadline, 
    TileIcon, 
    TileIconWrap, 
    TileHeader, 
    TileSubheadline,
    TileButton,
    TileButtonWrap
} from "./CourseTileElements"




const CourseTile = ({
    headline,
    subheading,
    img
}) => {
    return (
        <>
        <TileWrapper>
            <TileHeader>
                <TileIconWrap>
                    <TileIcon src={img}/>
                </TileIconWrap>
                <TileHeadline>
                    {headline}
                </TileHeadline> 
                <TileSubheadline>
                    {subheading}
                </TileSubheadline>
                <TileButtonWrap>
                    <TileButton>
                        Start
                    </TileButton>
                    </TileButtonWrap>
            </TileHeader>
            {/* <TileDescriptionWrapper>
                <TileDescription>
                    {description}
                </TileDescription>
            </TileDescriptionWrapper> */}
        </TileWrapper>
        </>
    )
}

export default CourseTile
