import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const Button = styled(Link)`
    border-radius: 50px;
    background: ${({primary}) => (primary ? '#247cf1' : '#010606')
    };
    white-space: nowrap;
    padding: ${({big}) => (big ? '14px 48px' : '12px 30px' )};
    color: ${({dark}) => (dark ? '#fff' : '#fff')};
    font-size: ${({fontBig}) => (fontBig ? '20px' : '16ox')};
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: ${({primary}) => (primary ? '#0e65d8' : '#247cf1' )};
        color: ${({dark}) => (dark ? '#fff' : '#fff')}
    }

    &:active {
        box-shadow: none;
    }
`;
