//import React, {useState, useEffect} from 'react';
import ReactLoading from "react-loading";
import styled from "styled-components";


const Loader = () => {
  return(
    <LoaderContainer>
    <ReactLoading
    type={"cylon"}
    color={"#247cf1"}
    height={100}
    width={100}
  />
  </LoaderContainer>
  )
}
export default Loader

const LoaderContainer = styled.div`
    justify-content: center;
    display: flex;
    align-items: center;
    height: 100vh;
    width: 100vw;
`
