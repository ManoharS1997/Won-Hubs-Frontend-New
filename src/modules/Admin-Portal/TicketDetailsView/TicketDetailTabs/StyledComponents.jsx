import styled from "styled-components";

export const ConLeft = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
`;

export const ConRight = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
`;

export const DetailsTabContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 30px 30px 30px 30px;
    overflow: auto;
    width: 100%;
`;

export const DropDown = styled.select`
    border-radius: 3px;
    width: 60%;
    margin-left: 10px;
    padding: 0px;
    height: 30px;
    border: 1px solid #ccc;
`;

export const EachElement = styled.div`
    display: flex;
    width: 100%;
    margin: 1px;
`;

export const HistoryTable = styled.table`
    width: 100%;
    height: 100%;
    overflow-y: auto;
`;

export const Input = styled.input`
    height: 30px;
    border-radius: 3px;
    width: 60%;
    margin-left: 10px;
    padding: 5px;
    background: #fff;
    color: #000;
    border: 1px solid #ccc;
`;

export const Label = styled.label`
    width: 30%;
    text-align: right;
    align-self: center;
`;

export const TabDataTable = styled.div`
    overflow-y: auto;
    min-height: fit-content;
    max-height: 80%;

    &::-webkit-scrollbar {
        width: 4px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }
`;

export const TabItem = styled.button`
    padding: 10px;
    outline: none;
    width: 150px;
    cursor: pointer;
    background-color: #fff;
    color: #000;
    border-style: none;
    font-weight: 600;
    margin: 0px 15px;
    border-radius: 0px;
    border-bottom: ${(props) =>
        props.isactive === "true" ? "2px solid #000" : "none"};
`;

export const TableBody = styled.tbody``;


export const TableData = styled.td`
    padding: 1% 3%;
`;

export const TableHead = styled.thead``;


export const TableHeader = styled.th`
    padding: 1% 3%;
`;

export const TableRow = styled.tr``;

export const TabsConatiner = styled.div`
    width: 100%;
    height: 30%;
    box-sizing: border-box;
    margin: 0px;
    position: relative;
`;

export const TabsHeadContainer = styled.div`
    height: 15%;
`;
