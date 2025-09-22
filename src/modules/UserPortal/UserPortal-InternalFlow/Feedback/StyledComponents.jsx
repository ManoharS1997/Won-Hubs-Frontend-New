import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const scaleUp = keyframes`
    from {
        transform: scale(0.9);
    }
    to {
        transform: scale(1);
    }
`;

export const ArrowBtn = styled.button`
    background: transparent;
    align-self: flex-end;
    width: 25px;
    height: 25px;
    border: none;
    outline: none;
    margin: 0px;
    padding: 0px;
`;

export const Card = styled.li`
    flex: 0 0 calc(25% - 10px);
    max-width: calc(25% - 10px);
    height: calc(33.33% - 10px);
    background: #cbc0d3;
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
`;

export const CardHead = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Cards = styled.ul`
    display: flex;
    flex-wrap: wrap;
    column-gap: 13px;
    row-gap: 13px;
    height: 100%;
    max-height: 81vh;
    width: 100%;
    overflow-y: auto;
    padding: 10px;
    animation: ${fadeIn} 0.5s ease-in-out;

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
`;

export const CustomContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

export const HeaderTag = styled.h1`
    font-size: 1em;
`;

export const Heading = styled.h1`
    font-size: 25px;
    display: flex;
    align-items: center;
    font-weight: bold;
`;

export const HeartBtn = styled.button`
    background: transparent;
    padding: 0px;
    margin: 0px;
    height: fit-content;
    width: fit-content;
    display: flex;
    align-items: center;
    border: none;
    outline: none;
`;

export const HomeCon = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #fff;
`;

export const HomeDashCon = styled.div`
    background-color: #fff;
    width: 83vw;
    flex-grow: 1;
    padding: 15px;
    height: 100%;
`;

export const ParaTag = styled.p`
    font-size: 1em;
    margin: 1px;
`;

export const SpanTag = styled.span`
    margin-right: 5px;
    font-size: 15px;
    font-weight: bold;
`;

export const StarContainer = styled.div`
    display: flex;
    align-items: center;
`;
