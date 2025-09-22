import styled from "styled-components";

export const RolesTableContainer = styled.div`
    width: 100vw;
    height: 100vh;
    flex-grow: 1;
    background-color: #fff;
    padding: 0px;
    font-family: Arial, Helvetica, sans-serif;
    background-color: #fff;
    display: flex;
    flex-direction: column;
`

export const BodyContainer = styled.div`
    width: 100vw;
    display: flex;
    height: 93vh;
    margin-top: 7vh;
    background-color: #d9d9d9;
`

export const ContentContainer = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    background-color: #e5e5e5;
`

export const RoleForm = styled.form`
    width: 100%;
    height: 65%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
`

export const FormTitle = styled.h1`
    font-family: Arial, Helvetica, sans-serif;
    width: 100%;
    text-align: center;
    color: green;

`

export const InputField = styled.div`
    height: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    margin: 7px 0px;

    /* border: 1px solid; */
`

export const CustomLabel = styled.label`
    font-size: 12px;
    font-weight: 600;
    margin-right: 20px;
    width: 20%;
    text-align: right;

    /* border: 1px solid; */
`

export const CustomInput = styled.input`
    width: 30%;
    height: 100%;
    padding: 5px;
    background-color: #fff;
    outline: none;
    border: 1px solid #6e6f70;
    border-radius: 5px;
    color: #000;
    font-size: 0.8rem;
`

export const TablesTabsContainer = styled.div`
    width: 100%;
    height: 35%;
    background-color: #cffccc;
    border-radius: 15px;
    padding: 2%;
    display: flex;
    flex-direction: column;
    margin-top: auto;

`

export const TabsList = styled.div`
    width: 100%;
    background-color: transparent;
    display: flex;
    align-items: center;
`

export const TabItem = styled.button`
    background-color: #fff;
    color: #000;
    padding: 5px;
    border-radius: 3px 3px 0px 0px;
    border: 1px solid green;
    border-bottom: ${props => props.active ? 'none' : '1px solid green'};
    border-top: ${props => props.active ? '3px solid green' : '1px solid green'};
`

export const TabsContentContainer = styled.div`
    background-color: #fff;
    width: 100%;
    height: 95%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    border-radius: 0px 0px 3px 3px;
    border-radius: 0pc 0px 15px 15px;
`

export const UpdateBtn = styled.button`
    background-color: #000;
    color: #fff;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    width: 100px;
    align-self: center;
    /* margin: 20px; */
`

export const BackBtn = styled.button`
    width: 30px;
    height: 30px;
    background-color: #FFFFFF;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px;
    margin: 0px;
    outline: none;
    border-style: none;
`

//  users tab styles


export const CustomText = styled.p`
    font-size: 12px;
    font-weight: 600;
    color: #000;
    padding: 10px 25px;
    background-color: #fff;
`

export const CustomSpan = styled.span`
    font-size: 12px;
    font-weight: normal;
`

export const TableContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;

    &::-webkit-scrollbar{
        width: 5px;
    }
    &::-webkit-scrollbar-track{
        background: transparent;
    }
`

export const CustomTable = styled.table`
    width: 100%;
    height: fit-content;
    flex-grow: 1;
    margin: 0px;
    background-color: #fff;

    &::-webkit-scrollbar{
        width: 5px;
    }
`

export const CustomThead = styled.thead`
`

export const CustomTh = styled.th`
    text-align: center;
    background-color: #284B63;
    color: #FFFFFF;
    border: 1px solid #FFFFFF;
`

export const CustomTr = styled.tr`
`

export const CustomTbody = styled.tbody`
`


export const CustomTd = styled.td`
    text-align: left;
    padding: 8px;
`