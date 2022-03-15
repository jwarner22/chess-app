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
    padding: 1em 1.5em 1em 1.5em;

    @media screen and (max-width: 768px) {
        display: none;
    }
  `

export const NavbarListDropdownContainer = styled.div`
    transition: 0.3s ease-in-out;
    opacity: ${props => props.openDropdown ? '1' : '0'};
`

export const NavbarDropdownList = styled.ul`
    padding: 0;
    margin: 0;
    text-align: center;
    background: #ffffff;
    box-sizing: border-box;
    color: #3faffa;
    font-size: 1.3rem;
    font-weight: 500;
    border-radius: 15px;
`

export const NavbarDropdownListItem = styled.li`
  list-style: none;
  padding: 0.4em 0em;
  transition: 0.2s ease-in-out;
  background: none;
  border-radius: 15px;
  box-shadow: 0px 5px 8px rgba(1, 14, 255, 0.25);
  
  &:hover{
      transition: 0.2s ease-in-out;
      background: #DBE6F8;
      border-radius: 15px;
    }
`;

export const DropdownWrapper = styled.div`
    color: #fff;
`


export const DropdownLink = styled(Link)`
    text-decoration: none;
    cursor: pointer;
    border-radius: 15px;
`