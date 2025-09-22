import { useState, useEffect, useContext } from "react";

import WonContext from "../../../context/WonContext";
import TableComponent from "../../TableComponent/pages/TableComponent"
import { getTableData, getTableColumnNames } from "../../../utils/CheckAndExecuteFlows/CRUDoperations";

export default function IntegrationsTable() {
    const [integrationsList, setIntegrationsList] = useState([])
    const [TableColumnNames, setTableColumnNames] = useState([])
    const { recordsPerPage } = useContext(WonContext)

    // <<<<API CALL
    useEffect(() => {
        fetchIntegrationsData()
    }, [])
    // API CALL >>>>>

    const fetchIntegrationsData = async () => {
        try {
            const data = await getTableData('integrations')
            const newColumnNames = await getTableColumnNames('integrations')
            if (data?.integrations?.length === 0) {
                // setUsersData(ApprovalsDummyData)
            } else {
                setIntegrationsList(data.integrations)
            }
            setTableColumnNames(newColumnNames.columns)
        } catch {
            console.log('Error fetching CMDB Data')
        }
    }

    return (
        <div className="w-full h-full p-2">
            <TableComponent
                tableData={integrationsList}
                recordsPerPage={recordsPerPage}
                tableName={'integrations'}
                TableColumnNames={TableColumnNames}
                setTableColumnNames={setTableColumnNames}
                id={'id'}
                showConfigurefieldsBtn={true}
                title='Integrations'
                fetchTableData={fetchIntegrationsData}
                rdtColValue={'id'}
                redirectionPath={`/integration-editor/Desktop/`}
                createNewPath={`new-integration`}
            />
        </div>
    )
}