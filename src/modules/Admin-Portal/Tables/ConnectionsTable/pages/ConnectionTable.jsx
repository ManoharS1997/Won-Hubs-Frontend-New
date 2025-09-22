import { useState, useEffect } from "react";

// COMPONENT IMPORTS
import WonContext from "../../../../../context/WonContext";
import TableComponent from "../../../../TableComponent/pages/TableComponent";
import { getTableData, getTableColumnNames } from "../../../../../utils/CheckAndExecuteFlows/CRUDoperations";

import {
    CustomContainer, CustomViewContainer, FormContent,
} from '../../UsersTable/StyledComponents'

const ConnectionsTable = () => {
    const [ConnectionsData, setConnectionsData] = useState([])
    const [TableColumnNames, setTableColumnNames] = useState([])

    // <<<<API CALL
    useEffect(() => {
        fetchConnectionsData()
    }, [])
    // API CALL >>>>>

    const fetchConnectionsData = async () => {
        try {
            const data = await getTableData('connections')
            const newColumnNames = await getTableColumnNames('connections')
            if (data?.connections?.length === 0) {
                // setUsersData(ApprovalsDummyData)
            } else {
                setConnectionsData(data.connections)
            }
            setTableColumnNames(newColumnNames.columns)
        } catch {
            console.log('Error fetching CMDB Data')
        }
    }

    return (
        <WonContext.Consumer>
            {value => {
                const { recordsPerPage } = value

                return (
                    <CustomViewContainer>
                        <CustomContainer>
                            <FormContent>
                                <TableComponent
                                    tableData={ConnectionsData}
                                    recordsPerPage={recordsPerPage}
                                    tableName={'connections'}
                                    TableColumnNames={TableColumnNames}
                                    setTableColumnNames={setTableColumnNames}
                                    id={'id'}
                                    showConfigurefieldsBtn={true}
                                    title='Connections'
                                    fetchTableData={fetchConnectionsData}
                                    rdtColValue={'id'}
                                    // redirectionPath={`/connections/`}
                                    createNewPath={`new-connection`}
                                />
                            </FormContent>
                        </CustomContainer>
                    </CustomViewContainer>
                )
            }}
        </WonContext.Consumer>
    )
}
export default ConnectionsTable  