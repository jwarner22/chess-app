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

import {useWindowSize} from '../../../../Hooks/UseWindowSize';

function CourseTile(props){
    const windowSize = useWindowSize();
    const isMobile = windowSize[0] <= 640;

    const {headline, subheading, img} = props

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
