import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {TileWrapper, 
    TileHeadline, 
    TileIconImg, 
    TileIconWrap, 
    TileHeader, 
    TileSubheadline,
    TileButton,
    TileButtonWrap
} from "./CourseTileElements";


function CourseTile(props){

    const [windowDimension, setWindowDimension] = useState(null);
  //const [openModal, setOpenModal] = useState(false)
  const {headline, subheading, img} = props

//   function handleOpenModal() {
//       setOpenModal(prev => !prev)
//   }

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

  const TileContent = () => { 
    return (
        <>
        <TileIconWrap>
            <TileIconImg src={img} loading={'lazy'}/>
        </TileIconWrap>
        <TileHeadline>
            {headline}
        </TileHeadline> 
        <TileSubheadline>
            {subheading}
        </TileSubheadline>
        </>
    )
    }


  const isMobile = windowDimension <= 640;  

    return (
        <>
        <TileWrapper type={props.type}>
            <TileHeader>
                {isMobile ? (<Link style={{textDecoration: 'none'}} to={{pathname: '/dashboard/module', state: {module: props}, isDaily: false}}>
<TileContent /></Link>) : (<TileContent />)}
                {isMobile ? ( null ) : (
                <TileButtonWrap>
                <Link style={{textDecoration: 'none'}} to={{pathname: '/dashboard/module', state: {module: props}, isDaily: false}}>
                    <TileButton type={props.type}>
                        Start
                    </TileButton>
                    </Link>
                    {/* <InfoModalWrapper>
                        <InfoModalIcon src={info} onClick={handleOpenModal}/>
                        <InfoModal openModal={openModal} setOpenModal={setOpenModal} />
                    </InfoModalWrapper> */}
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
