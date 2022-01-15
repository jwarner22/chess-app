import React from 'react'
import {PageHeaderContainer, PageHeaderTitle} from "./PageHeaderElements"

const PageHeader = (props) => {
    return (
        <PageHeaderContainer>
            <PageHeaderTitle>
                {props.pageTitle}
            </PageHeaderTitle>
        </PageHeaderContainer>
    )
}

export default PageHeader
