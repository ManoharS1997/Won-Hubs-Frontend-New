import styled from "styled-components";

export const Card = styled.li`
    flex: 0 0 calc(25% - 10px);
    max-width: calc(25% - 10px);
    height: 180px;
    list-style-type: none;
    border-radius: 7px;
    background: #9d8189;
    display: flex;
    flex-direction: column;
    padding: 8px;
    margin: 0px;
`
export const ContentContainer = styled.div`
    width: 85vw;
    height: 93vh;
    padding: 10px;
`
export const CartCards = styled.ul`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    border-radius: 7px;
    column-gap: 10px;
    row-gap: 10px;
    height: max-content;
    max-height: 100%;
    width: 100%;
    overflow-y: auto;
    padding: 10px;
    background: #fec5bb;

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
export const CustomContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
`
export const MainContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
`
export const PTag = styled.p`
    padding: 0px;
    margin: 0px;
`
export const SampleDiv = styled.div`
    display: flex;
    align-items: center;
`