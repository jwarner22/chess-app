import React from 'react';
import { FormWrap } from '../Login/LoginElements';
import { PageContainer } from './Page';
import error from '../../Images/ErrorBoundary.svg'
import styled from 'styled-components'
import CategoryTitle from './CategoryTitle/CategoryTitle';


export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError : false};
    }
    static getDerivedStateFromError(error) {
        return {hasError: true}
    }
    componentDidCatch(error,errorInfo) {
        //logErrorToMyService(error, errorInfo)
        console.log('Error Boundary', error, errorInfo)
    }
    render() {
        if(this.state.hasError) {
            return <PageContainer>
                        <FormWrap>
                            <ErrorContainer>
                                <CategoryTitle>
                                    Oops...Something went wrong.
                                </CategoryTitle>
                                <img src={error} 
                                style={{height: '50%', width: '100%'}}
                                />
                            </ErrorContainer>
                        </FormWrap>
                    </PageContainer>
        }
        return this.props.children
    }
}

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    justify-content: center;
    align-items: center;
    margin: 24px;
`