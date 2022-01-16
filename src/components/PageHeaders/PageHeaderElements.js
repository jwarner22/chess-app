import React from 'react'
import styled from 'styled-components'

export const PageHeaderContainer = styled.div`
    border-bottom: 2px solid rgba(84, 96, 108, 0.7);
    display: flex;
    justify-content: center;
    padding: 16px;
    width: 100%;
    background: #fff;
`

export const PageHeaderTitle = styled.h1`
    font-size: 19px;
    font-weight: 700;
    color: #000;
    opacity: 70%;
`

export const SettingsIconWrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    margin: 12px;
`

export const SettingsIcon = styled.img`
    max-width: 30px;
`