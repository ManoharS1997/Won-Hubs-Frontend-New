import styled, { keyframes } from "styled-components"

export const NotFoundContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
`

export const NotFoundTitile = styled.h1`
    font-size: xx-large;
`

export const RefreshBtn = styled.button`
    background-color: #4361ee;
    color: #fff;
    outline: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    /* margin-top: 10%; */
`

// loader styles
export const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`

export const ProgressBar = styled.div`
    width: 80%;
    max-width: 400px;
    height: 20px;
    background-color: #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
`

const fillAnimation = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
`

export const Progress = styled.div`
    width: 0;
    height: 100%;
    background-color: #FF5C35;
    animation: ${fillAnimation} 4s infinite;
`
