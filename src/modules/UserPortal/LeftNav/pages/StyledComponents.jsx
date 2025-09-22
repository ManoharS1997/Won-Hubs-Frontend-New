import styled from "styled-components"

export const Alert = styled.span`
    align-self:flex-start;
    margin-left:10px;
    height: 15px;
    width: 15px;
    font-size: 9px;
    background-color: red;
    color: #ffffff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const CustomLi = styled.li `
    width: 100%;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 10px;
    display: flex;
    background-color: ${(props) => props.active ? '#284B63' : 'inherit'};
    color: ${(props) => props.active ? '#ffffff' : '#fff'};
    
    &:hover {
        background-color: ${(props) => props.active ? '#284B63' : '#ffffff'} ;
        color: ${({active}) => active ? '#fff' : '#000'};
    }
`

export const CustomUl = styled.ul `
    display: flex;
    list-style: none;
    flex-direction: column;
    padding-left: 0px;
    width: 100%;
`

export const LeftNavContainer = styled.div `
    width: 15vw;
    height: 93vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 5px;
    margin: 0px;
    background-color: #353535;
    position: relative;
    color: #fff;
`