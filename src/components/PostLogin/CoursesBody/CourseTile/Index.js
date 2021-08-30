import React, { useEffect, useState } from "react";
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


  const [windowDimension, setWindowDimension] = useState(null);

  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowDimension <= 640;  

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
                {isMobile ? ( null ) : (
                <TileButtonWrap>
                    <TileButton>
                        Start
                    </TileButton>
                </TileButtonWrap>
                )}
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
