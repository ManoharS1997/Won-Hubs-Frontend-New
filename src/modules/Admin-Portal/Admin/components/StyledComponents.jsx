import styled from "styled-components";

export const CustomHeading = styled.h1`
    font-weight: 700;
    background-color: #ffffff;
    padding: 5px;
    border-radius: 15px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const WidgetTitle = styled.span`
    font-size: larger;
    font-weight: 700;
`




export const AddNewDashboardLayoutBtn = styled.button`
    padding: 5px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
`

export const CustomText = styled.p`
    width: 100%;
    margin: 0;
    padding: 5px 10px;
    border: 1px solid #000;
    border-radius: 5px;
    font-size: small;
    
    &:hover {
        color: blue;
        border-color: blue;
    }
`

export const TitleInput = styled.input`
    width: 100%;
    padding: 5px 10px;
    border-radius: 5px;
    border: none;
    border: 1px  solid #4361ee;
    outline: none;
`

export const DeleteLayoutBtn = styled.button`
    margin: 0 0px 0 10px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline: none;
    border: none;
    
    &:hover {
        color: red;
    }
`


