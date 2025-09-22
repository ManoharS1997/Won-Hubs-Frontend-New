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

export const BackBtn = styled.button`
    background: transparent;
    color: #000;
    padding: 0px;
    display: flex;
    margin-right: 5px;
    border: none;
`

export const Card = styled.li`
    flex: 0 0 calc(25% - 10px);
    max-width: calc(25% - 10px);
    height: 180px;
    background: #adb5bd;
    color: #000;
    border-radius: 10px;
    padding: 15px;
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

export const Cards = styled.ul`
    display: flex;
    flex-wrap: wrap ;
    column-gap: 13px;
    row-gap: 13px;
    height: 95%;
    /* max-height: 82vh; */
    width: 100%;
    overflow-y: auto;
    animation: ${fadeIn} 0.5s ease-in-out;
    padding-left: 0px;

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
`

export const ContentContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 15px;
    background-color: #fff;
    border-radius: 10px;
`

export const ContentContainer1 = styled.div`
    width: 100%;
    height: 100%;
    background: #d9d9d9;
    padding: 10px;
`

export const CustomContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`

export const Heading = styled.h1`
    font-size: 2rem;
    display: flex;
    align-items: center;
    height: 5vh;
    margin: 0px;
`

export const LinkComp = styled(Link)`
    flex: 0 0 calc(25% - 10px);
    max-width: calc(25% - 10px);
    height: 180px;
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

export const MainContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-grow: 1;
`

export const PTag = styled.p`
    color: #fff;
    width: fit-content;
    padding: 0px 3px 0px 3px;
    border-radius: 5px;
    mix-blend-mode: difference;
`

export const Topcon = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 5vh;
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
`