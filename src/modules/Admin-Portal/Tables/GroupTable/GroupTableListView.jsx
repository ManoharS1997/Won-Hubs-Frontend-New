import { useState, useEffect } from "react";

// COMPONENT IMPORTS
import WonContext from "../../../../context/WonContext";
import TableComponent from "../../../TableComponent/pages/TableComponent";
// import { GroupsDummyData as Data } from "../../../../DataFile/DefaultDataFile";
import { getTableColumnNames ,getTableData} from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";

const hostedUrl = import.meta.env.VITE_HOSTED_API_URL

import {
    CustomViewContainer, FormContent, SideNavNContentContainer,
} from './StyledComponents'

const GroupsTableListView = () => {
    const [GroupsData, setGroupsData] = useState([])
    const [TableColumnNames, setTableColumnNames] = useState([])

    // <<<<API CALL
    useEffect(() => {
        fetchGroupsData()
    }, [])

    // API CALL >>>>>

    const fetchGroupsData = async () => {
        try {
            const data = await getTableData('group_names')
            const newColumnNames = await getTableColumnNames('group_names')
            if (data?.group_names?.length === 0) {
                // setUsersData(ApprovalsDummyData)
            } else {
                setGroupsData(data.group_names)
            }
            setTableColumnNames(newColumnNames.columns)
        } catch {
            console.log('Error fetching Groups Data')
        }
    }

    return (
        <WonContext.Consumer>
            {value => {
                const { recordsPerPage } = value

                return (
                    <CustomViewContainer>
                        <SideNavNContentContainer>
                            <FormContent>
                                <TableComponent
                                    tableData={GroupsData}
                                    recordsPerPage={recordsPerPage}
                                    tableName={'group_names'}
                                    TableColumnNames={TableColumnNames}
                                    setTableColumnNames={setTableColumnNames}
                                    id={'id'}
                                    showConfigurefieldsBtn={true}
                                    title='Groups'
                                    fetchTableData={fetchGroupsData}
                                    rdtColValue={'id'}
                                    // redirectionPath={`/group/`}
                                />
                            </FormContent>
                        </SideNavNContentContainer>
                    </CustomViewContainer>
                )
            }}
        </WonContext.Consumer>
    )
}
export default GroupsTableListView     