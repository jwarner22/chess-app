import React from 'react'
import { ModalBodyImg, ModalBodyH3, ModalBodyP} from "./ModalElements"


//content is being passed from the ModelData array of objects
export const ModalContent = ({
    headline, 
    subheading, 
    img
}) => {
    return (
        <>
            <ModalBodyImg src={img}/>
            <ModalBodyH3>
                {headline}
            </ModalBodyH3>
            <ModalBodyP>
                {subheading}
            </ModalBodyP>
        </>
    )
}
