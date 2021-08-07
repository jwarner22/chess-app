import React from 'react'
import {TileWrapper, 
    TileHeadline, 
    TileIcon, 
    TileIconWrap, 
    TileHeader, 
    TileSubheadline, 
    TileDescriptionWrapper,
    TileDescription
} from "./CourseTileElements"




const CourseTile = ({
    headline,
    subheading,
    description,
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
