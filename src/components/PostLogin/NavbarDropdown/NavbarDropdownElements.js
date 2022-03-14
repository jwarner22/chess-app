import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const NavbarDropdownContainer = styled.div`
    width: 10.5em;
    margin: 0px auto;
`

export const NavbarDropdownHeader = styled.img`
    cursor: pointer;
    width: 80%;
    margin: 0px auto;
    margin-bottom: 0.8em;
    padding: 0.4em 2em 0.4em 1em;
  `

export const NavbarListDropdownContainer = styled.div`
    transition: 0.3s ease-in-out;
`

export const NavbarDropdownList = styled.ul`
    padding: 0;
    margin: 0;
    padding-left: 1em;
    background: #ffffff;
    border: 2px solid #e5e5e5;
    box-sizing: border-box;
    color: #3faffa;
    font-size: 1.3rem;
    font-weight: 500;
  
  &:first-child {
    padding-top: 0.8em;
  }
`

export const NavbarDropdownListItem = styled.li`
  list-style: none;
  margin-bottom: 0.8em;
`;

export const DropdownWrapper = styled.div`
    color: #fff;
`

export const DropdownMenu = styled.ul`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 80px);
    text-align: center;
`

export const DropdownLink = styled(Link)`
    text-decoration: none;
    cursor: pointer;
`