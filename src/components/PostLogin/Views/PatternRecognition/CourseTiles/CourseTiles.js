import React, { useEffect, useState } from "react";
import {TileWrapper, 
    TileHeadline, 
    TileIcon, 
    TileIconWrap, 
    TileHeader, 
    TileSubheadline,
    TileButton,
    TileButtonWrap,
    InfoModalIcon,
    InfoModalWrapper
} from "./CourseTileElements";
import info from "../../../../../Images/info.png"
import InfoModal from "./InfoModal";






function CourseTile(props){
    console.log(props)
  const [windowDimension, setWindowDimension] = useState(null);
  const [openModal, setOpenModal] = useState(false)
  const {headline, subheading, img} = props

  function handleOpenModal() {
      setOpenModal(prev => !prev)
  }

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
                    <InfoModalWrapper>
                        <InfoModalIcon src={info} onClick={handleOpenModal}/>
                        <InfoModal openModal={openModal} setOpenModal={setOpenModal} />
                    </InfoModalWrapper>
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
