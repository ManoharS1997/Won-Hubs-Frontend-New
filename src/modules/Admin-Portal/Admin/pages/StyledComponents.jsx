import styled from "styled-components";

export const AdminPopupContainer = styled.div`
    width: inherit;
    height: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    background-color: #fff;
    margin: 0;
    /* padding: 0; */
    padding: 0px 10px 10px 10px;
    
`

export const AdminHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px; 
`

export const UseId = styled.h1`
    font-size:14px;
    margin: 0px;
    text-align: right;
    /* width: 70%; */
`

export const CloseBtn = styled.button`
    padding: 2px;
    border-radius: 50%;
    background-color: #fff;
    color: #000;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: red;
        color: #fff;
        outline: none;
    }
    
`

export const AdminProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 0pc;
`

export const ProfileInitialCon = styled.div`
    background-color: #b374ad;
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;

`

export const ProfileInitialLabel = styled.label`
    padding: 10px 0px 10px 18px;
    font-size: 20px;
    align-self: center;
`

export const ProfileInitialEditBtn = styled.button`
    padding: 0px 0px 1px 1px;
    height: 18px;
    width: 18px;
    background-color: #3d3b3d;
    color: #fff;
    align-self: flex-end;
    border-radius: 50%;
`

export const GreetingMsg = styled.h1`
    font-size: 23px;
    padding: 0;
    margin: 2px;
`

export const ManageAccountBtn = styled.button`
    border: 1px solid #dedcde;
    width: 90%;
    border-radius: 30px;
    color: #7238ba;
    background-color: #fff;
`

export const LogOutBtn = styled.button`
    background-color: #3b50ad;
    color: #fff;
    width: 30%;
    padding: 8px;
`

export const PopupContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: white;
    height: 15%;
    width: 20%;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 3px 3px 3px 3px;
`

export const AdminPopupContent = styled.div`    
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0px 0px 1px 0px;
    padding: 15px;
    z-index: 10;
`