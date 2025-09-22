import { useState, useEffect } from "react";

// COMPONENT IMPORTS
import TableComponent from "../../../TableComponent/pages/TableComponent.jsx";
import WonContext from "../../../../context/WonContext.jsx";
import { getTableColumnNames, getTableData } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations.jsx";
import { ApprovalsDummyData } from "../../../../DataFile/DefaultDataFile.jsx";

import { FormContent } from '../pages/StyledComponents.jsx';

const hostedUrl = import.meta.env.VITE_HOSTED_API_URL

// const defaultColumnsInTable = ['name', 'created_date', 'state', 'approved_by', 'requested_by', 'approval_group', 'short_description', 'due_date'];

export default function Approvals() {
    const [approvalsData, setTasksData] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    const [isAllCheckBoxActive, setIsAllCheckBoxActive] = useState(false)
    const [TableColumnNames, setTableColumnNames] = useState([])
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [filterConditions, setFilterConditions] = useState([
        { filter: '', condition: '', searchText: '', logicalOperator: '', filterDisplayText: '' }
    ]);
    // const ColumnNames = _.map(selectedColumns, (column) => _.capitalize(column.name.replace(/([A-Z])/g, ' $1')))
    // const conditions = ['Like', 'Not Like', 'Equals To', 'Not Equals To']

    useEffect(() => {
        fetchApprovalssData()
    }, [])

    const fetchApprovalssData = async () => {
        try {
            const data = await getTableData('approvals')
            const newColumnNames = await getTableColumnNames('approvals')
            if (data?.approvals?.length === 0) {
                setTasksData(ApprovalsDummyData)
            } else {
                setTasksData(data.approvals)
            }
            setSelectedColumns(newColumnNames.columns)
            setTableColumnNames(newColumnNames.columns)
        } catch {
            console.log('Error fetching Approvals Data')
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
        let result = [...approvalsData];

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
                const nextConditionResult = applyFilterCondition(approvalsData, filterConditions[i]);
                result = applyLogicalOperator(result, nextConditionResult, logicalOperator);
            }
        }

        return result;
    };

    const handleSelectAllCheckBox = (e) => {             //HANDLING SELECT ALL CHECKBOX
        setIsAllCheckBoxActive(e.target.checked);

        if (e.target.checked) {
            const allUserIds = approvalsData.map(item => item.ticket_id);
            setSelectedRows(allUserIds);
        } else {
            setSelectedRows([]);
        }
    };

    // console.log(approvalsData)

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
                            tableData={approvalsData}
                            id={'id'}
                            handleSelectAllCheckBox={handleSelectAllCheckBox}
                            isAllCheckBoxActive={isAllCheckBoxActive}
                            selectedRows={selectedRows}
                            tableName={'approvals'}
                            showConfigurefieldsBtn={true}
                            title='Approvals'
                            fetchTableData={fetchApprovalssData}
                            rdtColValue={'id'}
                        />
                    </FormContent>
                )
            }}
        </WonContext.Consumer>
    )
}