import styled from "styled-components";

export const CheckBoxTag = styled.input`
    background-color: '#fff';
    color: #fff; 
`;

export const CloseManageAccountBtn = styled.button`
    margin-left: auto;
    margin-right: 2px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: transparent;
    color: #000;
    outline: none;
    padding: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-style: none;
    &:hover {
        background-color: red;
        color: #FFFFFF;
    }
`;

export const CustomContainer = styled.div`
    width: 100%;
    /* height: 100%; */
    /* overflow-y: auto; */
`;

export const CustomContainer2 = styled.div`
    width: 100%;
    height: 94%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar{
    width: 5px;
    }
    &::-webkit-scrollbar-track{
        background: transparent;
    }
    &::-webkit-scrollbar-thumb{
        background: transparent;
    }
    &:hover&::-webkit-scrollbar-thumb{
        background: #a4c3b2;
    }
`;

export const CustomTbody = styled.tbody``;

export const CustomTd = styled.td`
    text-align: left;
    border: none ;
    text-align: left;
    padding: 2px 8px 2px 8px;
    margin: 5px;
`;

export const CustomTh = styled.th`
    border: 1px solid #dddddd;
    padding: 8px;
    text-align: left;
    margin: 5px;
    height: 20%;
    background-color:  var(--primary-color);
    color: #fff;
    border: none;
    position: sticky;
    top: 0;
`;

export const CustomThead = styled.thead`
    background-color: var(--primary-color);
    color: #ffffff;
    padding: 10px;
    width: 100%;
`;

export const CustomTr = styled.tr`
    border-bottom: 1px solid #e5e5e5;
    overflow-y: auto;
    border-radius: 15px;
    
    &:hover {
        background-color: #e5e5e5; 
    }
`;

export const CustomUserTable = styled.table`
    width: 100%;
    height: fit-content;
    flex-grow: 1;
    margin: 0px;
    background-color: #fff;
    border-collapse: collapse;
`;

export const FieldsSearchContainer = styled.div`
    width: 100%;
    height: fit-content;
    padding: 3px;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const FieldSearchBar = styled.input`
    background-color: #fff;
    color: #000;
    width: 100%;
    height: 100%;
    padding: 6px;
    /* outline: none; */
    border: 1px solid #d9d9d9;
    border-radius: 7px;
`;

export const ManageAccountContent = styled.div`
    height: 90%;
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 1px;
    column-gap: 15px;
`;

export const ManageAccountPopUp = styled.div`
    width: 100%;
    height:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    background-color: #fff;
    padding: 2px;
    overflow: hidden;
    outline: none;
    overflow: auto;
`;

export const ModelCustomContainerRight = styled.div`
    height: 100%;
    width:85%;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 1px;
`;

export const ModelHeaderContainer = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-top: 5px;
`;

export const ModelHeadingText = styled.h1`
    font-size: 22px;
    padding: 4px;
    margin: 1px;
`;

export const TableContainer = styled.div`
    background-color: #fff;
    color: #000;
    width: 100%;
    max-height: 78vh;
    overflow-y: auto;

    &::-webkit-scrollbar{
        width: 7px;
    }
    &::-webkit-scrollbar-track{
        background: transparent;
    }
`;

export const DragCardItem = styled.div`
     width: 100%;
     padding: 10px;
     display: flex;
     align-items: center;
     column-gap: 15px;
     border: 1px solid #d9d9d9;
     margin: 0px;
     border-radius: 7px;
     background-color: ${({ isSelected }) => isSelected ? 'var(--primary-color)' : '#fff'};
    cursor: grab;
    color:   ${({ isSelected }) => isSelected ? 'var(--secondary-color)' : '#000'};
`

export const ConfigureFieldsListContainer = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    height: 95%;
    padding: 0 0.5rem;
    
    &::-webkit-scrollbar{
        width: 5px;
    }
    &::-webkit-scrollbar-thumb {
        /* color: azure; */
        background-color: #cfe1b9;
        border-radius: 50px;
        
        &:hover{
            background-color: #008000;
        }
    }

`