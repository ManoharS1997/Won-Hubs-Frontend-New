import { useState, useEffect } from "react";

// COMPONENT IMPORTS
import TableComponent from "../../../TableComponent/pages/TableComponent.jsx";
import WonContext from "../../../../context/WonContext.jsx";
import { getTableColumnNames, getTableData } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations.jsx";
import { TasksDummyData } from "../../../../DataFile/DefaultDataFile.jsx";

const hostedUrl = import.meta.env.VITE_HOSTED_API_URL

import {
    ActionsContainer, AllText, AndBtn, AndOrBtnClose, BackBtn, ConfigureButton,
    DropdownMenu, DropdownToggle, FilterBtn, FilterContainer, FormContent,
    HeaderContainer, MenuItem, MultiLevelDropdownContainer, OrBtn,
    SearchInput, StyledDropDown, StyledItem, StyledMenu, StyledToggle,
    SubMenu, SubMenuItem, TitleContainer,
} from '../pages/StyledComponents.jsx';

// const defaultColumnsInTable = ['id', 'name', 'status', 'approval_state', 'short_description', 'priority'];

export default function Tasks() {
    const [tasksData, setTasksData] = useState(TasksDummyData)
    const [selectedRows, setSelectedRows] = useState([]);
    const [TableColumnNames, setTableColumnNames] = useState([])
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [filterConditions, setFilterConditions] = useState([
        { filter: '', condition: '', searchText: '', logicalOperator: '', filterDisplayText: '' }
    ]);

    // const ColumnNames = selectedColumns.map((column) =>
    //     column.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())
    // )

    useEffect(() => {
        fetchTasksData()
    }, [tasksData])

    const fetchTasksData = async () => {
        try {
            const data = await getTableData('tasks')
            const newColumnNames = await getTableColumnNames('tasks')
            if (data?.tasks?.length === 0) {
                setTasksData(TasksDummyData)
            } else {
                setTasksData(data.tasks)
            }
            setSelectedColumns(newColumnNames.columns)
            setTableColumnNames(newColumnNames.columns)
        } catch {
            console.log('Error fetching Tasks Data')
        }
    }

    const applyFilterCondition = (data, { filter, searchText, condition }) => {
        const normalizeText = (text) => text.toString().toLowerCase();

        const filterFunctions = {
            'Like': (item) => normalizeText(item[filter]).includes(normalizeText(searchText)),
            'Not Like': (item) => !normalizeText(item[filter]).includes(normalizeText(searchText)),
            'Equals To': (item) => normalizeText(item[filter]) === normalizeText(searchText),
            'Not Equals To': (item) => normalizeText(item[filter]) !== normalizeText(searchText),
        };

        return data.filter(filterFunctions[condition] || (() => true));
    };

    const applyLogicalOperator = (result, nextConditionResult, logicalOperator) => {
        const logicalOperators = {
            'AND': (item) => nextConditionResult.includes(item),
            'OR': (item) => !result.includes(item), // Change here to return records not present in the original result
        };

        return result.concat(nextConditionResult.filter(logicalOperators[logicalOperator] || (() => true)));
    };

    const filteredData = () => {
        let result = [...tasksData];

        // Apply existing filter conditions
        filterConditions.forEach((condition) => {
            if (condition.filter && condition.condition) {
                result = applyFilterCondition(result, condition);
            }
        });

        // Apply searching text filter
        // if (searchingText.trim() !== '') {
        //     result = result.filter((item) =>
        //         Object.values(item).some((value) => {
        //             // Check if value is not null or undefined before calling toString
        //             const stringValue = value !== null && value !== undefined ? value.toString().toLowerCase() : '';
        //             return stringValue.includes(searchingText.toLowerCase());
        //         })
        //     );
        // }

        // Apply logical operators
        for (let i = 1; i < filterConditions.length; i++) {
            const logicalOperator = filterConditions[i].logicalOperator;

            if (logicalOperator && result.length > 0) {
                const nextConditionResult = applyFilterCondition(tasksData, filterConditions[i]);
                result = applyLogicalOperator(result, nextConditionResult, logicalOperator);
            }
        }

        return result;
    }


    return (
        <WonContext.Consumer>
            {value => {
                const { recordsPerPage } = value
                return (
                    <FormContent>
                        <TableComponent
                            selectedColumns={selectedColumns}
                            TableColumnNames={TableColumnNames}
                            setTableColumnNames={setTableColumnNames}
                            filteredData={filteredData}
                            recordsPerPage={recordsPerPage}
                            tableData={tasksData}
                            id={'id'}
                            selectedRows={selectedRows}
                            tableName={'tasks'}
                            showConfigurefieldsBtn={true}
                            title='Tasks'
                            fetchTableData={fetchTasksData}
                            rdtColValue={'id'}
                            // redirectionPath={`/task/`}
                        />
                    </FormContent>
                )
            }}
        </WonContext.Consumer>
    )
}