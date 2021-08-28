import React from "react"
import styled from "styled-components"

export const MobileNavbarWrapper = styled.div`
    position: fixed;
    width: 100vw;
    bottom: 0;
    transform: translateZ(0);
    background-color: #fff;
    padding-top: 8px;
`
export const MobileNavbarItems = styled.div`
    display: flex;
   flex: 1;
    padding: 0 2rem;
    justify-content: space-around;
`

export const MobileNavbarItem = styled.div`
   display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.2rem;
`
export const MobileNavbarIcon = styled.span`

`