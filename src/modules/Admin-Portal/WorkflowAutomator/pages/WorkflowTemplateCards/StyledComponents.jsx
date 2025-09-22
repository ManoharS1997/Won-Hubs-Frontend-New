import styled from "styled-components";

export const BodyContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`

export const TemplateCard = styled.li`
    list-style: none;
    width: 100%;
    height: 150px;
    background-color: #353535;
    color: #fff;
    padding: 10px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: large;
    
    &:hover {
        background-color: #ccc;
        color: #3f37c9;
        border: 2px solid #3f37c9;
    }
`

export const Card = styled(TemplateCard)`
    height: 250px;
    background-color: #fff;
    color: #000;
    /* border: 1px solid; */
    
    &:hover{
        box-shadow: -5px 40px 80px 2px #adb5bd;
        background-color: #fff;
        color: #000;
        border: none;
    }
`

export const CloseTemplateBtn = styled.button `
    margin-left: auto;
    background-color: #fff;
    color: red;
    border-radius: 50%;
    padding: 0.25rem;
    width: fit-content;
    border: none;
    
    &:hover {
        background-color: red;
        color: #fff ;
    }
`

export const CustomContainer = styled.div`
    width: fit-content;
    flex-grow: 1;
    height: 100%;
    display: flex;
    padding: 10px;
    background-color: var(--background-color);
`

export const MainContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

export const TemplateCardslist = styled.ul`
    padding: 15px;
    margin: 0;
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    /* display: flex; */
    overflow: auto;
    width: 100%;
    height: 100%;
    max-height: 95%;
    background-color: var(--background-color);
    border-radius: 10px;
    row-gap: 35px;
    
    &::-webkit-scrollbar {
        width: 7px;
    }
    
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: transparent;
    }
    
    &:hover::-webkit-scrollbar-thumb {
        background-color: #ccc;
    }
`