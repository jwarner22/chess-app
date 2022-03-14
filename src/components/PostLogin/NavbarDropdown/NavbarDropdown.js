import {useState} from 'react'
import { NavbarDropdownContainer, 
    NavbarDropdownHeader, 
    NavbarListDropdownContainer,
    NavbarDropdownList, 
    NavbarDropdownListItem,
    DropdownLink
} from './NavbarDropdownElements'
import placeholder from "../../../Images/user.png"

const NavbarDropdown = (props) => {

    const {openDropdown, dropdownToggle, handleLogout} = props
  return (<>
      <NavbarDropdownContainer>
            <NavbarDropdownHeader src={placeholder} onClick={dropdownToggle} />
            {openDropdown &&
            <NavbarListDropdownContainer>
                <NavbarDropdownList >
                    <NavbarDropdownListItem>
                        List Item
                    </NavbarDropdownListItem>
                    <NavbarDropdownListItem>
                        List Item
                    </NavbarDropdownListItem>
                    <NavbarDropdownListItem>
                        List Item
                    </NavbarDropdownListItem>
                    <DropdownLink onClick={handleLogout} to='/login'>
                    <NavbarDropdownListItem >
                        Logout
                    </NavbarDropdownListItem>
                    </DropdownLink>
                </NavbarDropdownList>
            </NavbarListDropdownContainer>
        }   
    </NavbarDropdownContainer>
    </>
  )
}

export default NavbarDropdown