import { useState, useEffect } from "react";

// COMPONENT IMPORTS
import WonContext from "../../../../../context/WonContext";
import TableComponent from "../../../../TableComponent/pages/TableComponent";
import { getTableColumnNames, getTableData } from "../../../../../utils/CheckAndExecuteFlows/CRUDoperations";

import {
    CustomContainer, CustomViewContainer, FormContent, SideNavNContentContainer,
} from '../components/StyledComponents'
const hostedUrl = import.meta.env.VITE_HOSTED_API_URL

const RolesTable = () => {
    const [loading, setLoading] = useState(true)
    const [RolesData, setRolesData] = useState([]) //state for table data 
    const [TableColumnNames, setTableColumnNames] = useState([])

    // <<<<API CALL
    useEffect(() => {
        fetchRolesData()
    }, [])

    // API CALL >>>>>

    const fetchRolesData = async () => {
        try {
            const data = await getTableData('roles')
            const newColumnNames = await getTableColumnNames('roles')
            if (data?.roles?.length === 0) {
                // setUsersData(ApprovalsDummyData)
            } else {
                setRolesData(data.roles)
            }
            setTableColumnNames(newColumnNames.columns)
        } catch {
            console.log('Error fetching Roles Data')
        }
    }

    return (
        <WonContext.Consumer>
            {value => {
                const { recordsPerPage } = value

                return (
                    <CustomViewContainer>
                        <SideNavNContentContainer>
                            <CustomContainer>
                                <FormContent>
                                    <TableComponent
                                        tableData={RolesData}
                                        recordsPerPage={recordsPerPage}
                                        tableName={'roles'}
                                        TableColumnNames={TableColumnNames}
                                        setTableColumnNames={setTableColumnNames}
                                        id={'id'}
                                        showConfigurefieldsBtn={true}
                                        title='Roles'
                                        fetchTableData={fetchRolesData}
                                        rdtColValue={'id'}
                                        redirectionPath={`/role/`}
                                        createNewPath={'role'}
                                    />
                                </FormContent>
                            </CustomContainer>
                        </SideNavNContentContainer>
                    </CustomViewContainer>
                )
            }}
        </WonContext.Consumer>
    )
}
export default RolesTable    