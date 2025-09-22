import styled,{keyframes} from "styled-components";
import { Link } from 'react-router-dom';

const fadeIn = keyframes`
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
`
const scaleUp = keyframes`
    from {
        transform: scale(0.9);
    }
    to {
        transform: scale(1);
    }
`
const swing = keyframes`
    0% {
    transform: rotate(0deg);
    animation-timing-function: ease-out;
    }

    25% {
    transform: rotate(70deg);
    animation-timing-function: ease-in;
    }

    50% {
    transform: rotate(0deg);
    animation-timing-function: linear;
    }
`;

const swing2 = keyframes`
    0% {
    transform: rotate(0deg);
    animation-timing-function: linear;
    }

    50% {
    transform: rotate(0deg);
    animation-timing-function: ease-out;
    }

    75% {
    transform: rotate(-70deg);
    animation-timing-function: ease-in;
    }
`;

export const MainContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
`
export const CustomContainer = styled.div`
    margin-top: 7vh;
    display: flex;
`
export const ContentContainer1 = styled.div`
    width: 83vw;
    height: 93vh;
    background: #d9d9d9;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const ContentContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
`
export const Heading = styled.h1`
    font-size: 2rem;
    display: flex;
    align-items: center;
    height: 5vh;
    margin: 0px;
`
export const Cards = styled.ul`
    display: flex;
    flex-wrap: wrap ;
    column-gap: 13px;
    row-gap: 13px;
    height: fit-content;
    max-height: 82vh;
    width: 100%;
    overflow-y: auto;
    animation: ${fadeIn} 0.5s ease-in-out;
    padding-left: 0px;
    margin: 10px;


    &::-webkit-scrollbar{
        width: 7px;
    }
    
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: transparent;
    }
    
    &:hover::-webkit-scrollbar-thumb {
        background-color: #d9d9d9;
    }
    
    /* border: 1px solid; */
`
export const Card = styled.li`
    flex: 0 0 calc(25% - 10px);
    max-width: calc(25% - 10px);
    height: 180px;
    /* max-height: calc(35% - 10px); */
    background: #adb5bd;
    color: #000;
    border-radius: 10px;
    padding: 15px;
    /* margin-bottom: 10px; */
    transition: 0.3s;
    border: 2px solid transparent;
    font-size: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    animation: ${scaleUp} 0.5s ease-in-out;
    position: relative;

    &:hover {
        transform: scale(0.95);
    }
    list-style-type: none;
    box-shadow: 1px 1px 10px #dee2e6;
`
export const LinkComp = styled(Link)`
    flex: 0 0 calc(25% - 10px);
    max-width: calc(25% - 10px);
    height: 180px;
    /* max-height: calc(35% - 10px); */
    background: #adb5bd;
    border-radius: 10px;
    padding: 15px;
    transition: 0.3s;
    border: 2px solid transparent;
    font-size: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    animation: ${scaleUp} 0.5s ease-in-out;

    &:hover {
        transform: scale(0.95);
    }
`

export const BackBtn = styled.button`
    background: transparent;
    color: #000;
    padding: 0px;
    display: flex;
    margin-right: 5px;
    border: none;

    /* border: 1px solid; */
`
export const Topcon = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 5vh;

    /* border: 1px solid red; */
`
export const CardImg = styled.input`
    display: none;
    margin: 0px;

`
export const CardImgCon = styled.div`
    position: absolute;
    bottom: 2px;
    right: 5px;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    padding: 0px;
    background: #fff;

    border: 1px solid #adb5bd;
`
export const UploadImageBtn = styled.button`
    padding: 0px;
    background: transparent;
    color: #000;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    /* border: 1px solid red; */
`
export const PTag = styled.p`
    color: #fff;
    /* background: #dee2e6; */
    width: fit-content;
    padding: 0px 3px 0px 3px;
    border-radius: 5px;
    mix-blend-mode: difference;
`
export const NewtonsCradle = styled.div`
    --uib-size: 50px;
    --uib-speed: 1.2s;
    --uib-color: #474554;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--uib-size);
    height: var(--uib-size);
`;

export const Dot = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    width: 25%;
    transform-origin: center top;

    &::after {
        content: '';
        display: block;
        width: 100%;
        height: 25%;
        border-radius: 50%;
        background-color: var(--uib-color);
    }

    &:first-child {
        animation: ${swing} var(--uib-speed) linear infinite;
    }

    &:last-child {
        animation: ${swing2} var(--uib-speed) linear infinite;
    }
`;