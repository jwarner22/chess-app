import React from 'react'
import { SectionHeaderContainer, SectionHeaderTitle } from './SectionHeaderElements'

const SectionHeader = (props) => {
    return (
        <SectionHeaderContainer>
            <SectionHeaderTitle>
                {props.sectionTitle}
            </SectionHeaderTitle>
        </SectionHeaderContainer>
    )
}

export default SectionHeader
