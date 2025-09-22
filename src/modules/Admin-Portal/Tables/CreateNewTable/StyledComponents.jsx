import styled from "styled-components";

export const ActionBtnsCon = styled.div`
    width: 500px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const AddColumnBtn = styled.button`
    background-color: #665a38;
    color: #fff;
    border-radius: 5px;
`;

export const AddColumnInput = styled.input`
    border: 1px solid #dedbd3;
    border-radius: 3px;
    padding: 6px;
    background-color: #fff;
`;

export const AddRow = styled.button`
    width: 250px;
    background-color: #80651b;
    color: #fff;
    border-radius: 5px;
`;

export const ColumnActionsContainer = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    width: 350px;
    display: flex;

    & > label {
        margin-right: 10px;
    }

    & > input {
        margin-right: 10px;
    }
`;

export const DeleteRowBtn = styled.button`
    background-color: #fff;
    padding: 5px;
`;

export const DeleteTableBtn = styled.button`
    margin-top: 20px;
    background-color: #a3130b;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
`;

export const ErrorMsgOnSave = styled.p`
    margin-top: 30px;
    margin-left: 15%;
`;

export const RowInput = styled.input`
    border: 1px solid #dedbd3;
    border-radius: 3px;
    padding: 5px;
    margin: 0;
`;

export const SaveButton = styled.button`
    margin-top: 20px;
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
`;

export const Table = styled.table`
    border: 1px solid #ed4a09;
    border-collapse: collapse;
    margin-top: 20px;
    margin-left: 0;
`;

export const TableNameInput = styled.input`
    border: 1px solid #dedbd3;
    border-radius: 3px;
    padding: 6px;
    background-color: #fff;
`;

export const TableNameLabel = styled.label`
`;

export const TablePageContainer = styled.div`
    padding: 20px;
    background-color: #fff;
    width: fit-content;
    flex-grow: 1;
    height: fit-content;
    border-radius: 15px;
`;

export const TdTag = styled.td`
    padding: 0%;
    border: 1px solid #ed4a09;
    padding: 6px;
`;

export const ThTag = styled.th`
    text-align: center;
    border: 1px solid #ed4a09;
    padding: 6px;
`;

export const TrTag = styled.tr`
`;
