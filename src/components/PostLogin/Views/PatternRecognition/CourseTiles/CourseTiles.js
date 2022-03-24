import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import {TileWrapper, 
    TileHeadline, 
    TileIconImg, 
    TileIconWrap, 
    TileHeader, 
    TileSubheadline,
    TileButton,
    TileButtonWrap,
    MotifTileStatWrapper,
    MotifStatTitle,
    MotifStat
} from "./CourseTileElements";

import {useWindowSize} from '../../../../../hooks/UseWindowSize';

import { useContext } from "react";
import { UserContext } from "../../../../../providers/GlobalState";
import { motion } from "framer-motion";

const INITIAL_RATING = 600;


function CourseTile (props){
    const windowSize = useWindowSize();
    const isMobile = windowSize[0] <= 640;
    const {headline, subheading, img} = props
    const linkUrl = (props.category === 'opening') ? `/opening` : `/dashboard/module`;
    const {themesData, contextLoading, userData} = useContext(UserContext);
    const [rating, setRating] = useState(0);
    const {variants} = props

    useEffect(() => {
        if (!contextLoading) {

            if (!themesData.some(theme => theme.title === props.type_ref)) {
                if (userData == null) return; // if userData is null, don't do anything
                setRating(INITIAL_RATING); // if userData is not null, set the rating to the initial rating
                return;
            }
            let theme = themesData.find(theme => {
                if(theme.title === props.type_ref) {
                    return theme
                } else {
                    return null;
                }
            });
            setRating(theme.rating);
        }
    },[props])

    const TileContent = () => { 
    return (
        <>
        <TileIconWrap>
            <TileIconImg src={img} loading={'over-eager'}/>
        </TileIconWrap>
        <TileHeadline>
            {headline}
        </TileHeadline> 
        <TileSubheadline>
            {subheading}
        </TileSubheadline>
        {isMobile ? (
                <TileSubheadline>
                    Elo Rating: {contextLoading ? null:rating}
                </TileSubheadline>
        ) : ( null )}
        </>
    )
    }

    return (
        <>
        <TileWrapper 
            as={motion.li}
            variants={variants}
            type={props.type}
            >
            <TileHeader >
                {isMobile ? (<Link style={{textDecoration: 'none'}} to={{pathname: linkUrl, state: {module: props}, isDaily: false}}>
<TileContent /></Link>) : (<TileContent />)}
                {isMobile ? ( null ) : (
                <TileButtonWrap>
                <Link style={{textDecoration: 'none'}} to={{pathname: linkUrl, state: {module: props}, isDaily: false}}>
                    <TileButton type={props.type}>
                        Start
                    </TileButton>
                    </Link>
                    {/* <InfoModalWrapper>
                        <InfoModalIcon src={info} onClick={handleOpenModal}/>
                        <InfoModal openModal={openModal} setOpenModal={setOpenModal} />
                    </InfoModalWrapper> */}
                    {props.category !== 'opening' &&
                    <MotifTileStatWrapper>
                        <MotifStatTitle>
                            Elo Rating
                        </MotifStatTitle>
                        <MotifStat>
                            {contextLoading ? null: rating}
                        </MotifStat>
                    </MotifTileStatWrapper>
                }
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


export default React.memo(CourseTile)
