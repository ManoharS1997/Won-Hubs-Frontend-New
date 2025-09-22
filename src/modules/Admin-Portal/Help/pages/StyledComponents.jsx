import styled from "styled-components";

export const HelpOption = styled.li`
    width: 100%;
    text-transform: capitalize;
    padding: 5px 10px;
    color: #284B63;
    border-radius: 5px;
    
    &:hover{
        background-color: #c3c5c7;
        color: #fff;
    }
`

export const HelpOptionList = styled.ul`
    padding-left: 0px;
    list-style: none;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    margin: 0px;
`

export const HelpPopupContent = styled.div`    
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background-color: #fff;
    padding: 10px;
    row-gap: 10px;
`

export const HelpSearch = styled.input`
    border: none;
    width: 90%;
    color: #000;
    outline: none;
    padding: 5px;
    background-color: #fff;
`

export const HelpSearchContainer = styled.div`
    border: 1px solid #ccc;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px;
    padding-right: 3px;
    border-radius: 4px;
`