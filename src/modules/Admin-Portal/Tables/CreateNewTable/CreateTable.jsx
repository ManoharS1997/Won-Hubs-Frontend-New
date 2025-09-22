import { useState, useRef } from 'react';

import { MdDeleteOutline } from 'react-icons/md';

import {
    ActionBtnsCon,
    AddColumnBtn,
    AddColumnInput,
    AddRow,
    ColumnActionsContainer,
    DeleteRowBtn,
    DeleteTableBtn,
    ErrorMsgOnSave,
    RowInput,
    SaveButton,
    Table,
    TableNameInput,
    TableNameLabel,
    TablePageContainer,
    TdTag,
    ThTag,
    TrTag,
} from './StyledComponents';


const CreateTable = () => {
    const [tableName, setTableName] = useState('');
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [newColumnName, setNewColumnName] = useState('');
    const [error, setError] = useState('');
    const inputRefs = useRef([]);

    const addColumn = () => {
        if (newColumnName.trim() !== '') {
            setColumns([...columns, newColumnName]);
            setNewColumnName('');
            // Add empty data for the new column in existing rows
            const newRows = rows.map(row => [...row, '']);
            setRows(newRows);
        } else {
            alert('Column name cannot be empty!');
        }
    };

    const addRow = () => {
        const newRow = Array(columns.length).fill('');
        setRows([...rows, newRow]);
    };

    const deleteRow = index => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    };

    const saveTableData = () => {
        if (columns.length === 0 || rows.length === 0) {
            setError('Table is empty. Add columns and rows before saving.');
            return;
        }

        const tableData = rows.map(row => {
            const rowData = {};
            columns.forEach((column, index) => {
                rowData[column] = row[index];
            });
            return rowData;
        });

        // Convert the table data to a JSON string
        const jsonData = JSON.stringify({ tableName, tableData });

        // Log the JSON data (you can send it to your server or store it as needed)
        console.log('Table data saved:', jsonData);

        // Display an alert or perform any other action as needed
        alert('Table data saved!');
        setError('');
    };

    const deleteTable = () => {
        if (columns.length === 0 && rows.length === 0) {
            setError('Table is already empty.');
            return;
        }

        setTableName('');
        setColumns([]);
        setRows([]);
        setError('');
    };

    const handleEnterKey = (e, rowIndex, columnIndex) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            const nextColumnIndex = (columnIndex + 1) % columns.length;
            const nextRowIndex = (nextColumnIndex === 0) ? rowIndex + 1 : rowIndex;

            if (nextRowIndex < rows.length) {
                inputRefs.current[nextRowIndex][nextColumnIndex].focus();
            }
        }
    };

    return (
        <TablePageContainer>
            <h1>Create Table </h1>
            <ColumnActionsContainer>
                <TableNameLabel htmlFor="tableName">Table Name:</TableNameLabel>
                <TableNameInput
                    type="text"
                    id="tableName"
                    placeholder='Give a Name'
                    value={tableName}
                    onChange={e => setTableName(e.target.value)}
                />
            </ColumnActionsContainer>

            <ColumnActionsContainer>
                <AddColumnInput
                    type="text"
                    id="columnName"
                    value={newColumnName}
                    placeholder="Enter Column Name"
                    onChange={e => setNewColumnName(e.target.value)}
                    onKeyDown={e => handleEnterKey(e, 0, columns.length - 1)}
                />
                <AddColumnBtn onClick={addColumn}>Add Column</AddColumnBtn>
            </ColumnActionsContainer>

            <ColumnActionsContainer>
                <AddRow onClick={addRow}>Add Row</AddRow>
            </ColumnActionsContainer>

            <Table>
                {columns.length > 0 && (
                    <>
                        <thead>
                            <TrTag>
                                {columns.map((column, index) => (
                                    <ThTag key={index}>{column}</ThTag>
                                ))}
                                <ThTag></ThTag>
                            </TrTag>
                        </thead>
                        <tbody>
                            {rows.map((row, rowIndex) => (
                                <TrTag key={rowIndex}>
                                    {row.map((cell, columnIndex) => (
                                        <TdTag key={columnIndex}>
                                            <RowInput
                                                type="text"
                                                value={cell}
                                                onChange={(e) => {
                                                    const newRows = [...rows];
                                                    newRows[rowIndex][columnIndex] = e.target.value;
                                                    setRows(newRows);
                                                }}
                                                onKeyDown={(e) => handleEnterKey(e, rowIndex, columnIndex)}
                                                ref={(input) => {
                                                    if (!inputRefs.current[rowIndex]) {
                                                        inputRefs.current[rowIndex] = [];
                                                    }
                                                    inputRefs.current[rowIndex][columnIndex] = input;
                                                }}
                                            />
                                        </TdTag>
                                    ))}
                                    <TdTag>
                                        <DeleteRowBtn onClick={() => deleteRow(rowIndex)}>
                                            <MdDeleteOutline size={20} />
                                        </DeleteRowBtn>
                                    </TdTag>
                                </TrTag>
                            ))}
                        </tbody>
                    </>
                )}
            </Table>

            {columns.length > 0 && rows.length > 0 && (
                <ActionBtnsCon>
                    <DeleteTableBtn onClick={deleteTable}>Delete Table</DeleteTableBtn>
                    <SaveButton onClick={saveTableData}>Save Table Data</SaveButton>
                </ActionBtnsCon>
            )}
            {error && <ErrorMsgOnSave style={{ color: 'red' }}>{error}</ErrorMsgOnSave>}
        </TablePageContainer>
    );
};

export default CreateTable;
