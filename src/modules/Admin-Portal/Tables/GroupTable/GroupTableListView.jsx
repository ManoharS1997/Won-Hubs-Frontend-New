import { useState, useEffect } from "react";

// COMPONENT IMPORTS
import WonContext from "../../../../context/WonContext";
import TableComponent from "../../../TableComponent/pages/TableComponent";
// import { GroupsDummyData as Data } from "../../../../DataFile/DefaultDataFile";
import { getTableColumnNames, getTableData, FetchTableColumns } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";

const hostedUrl = import.meta.env.VITE_HOSTED_API_URL

import {
    CustomViewContainer, FormContent, SideNavNContentContainer,
} from './StyledComponents'

const GroupsTableListView = () => {
    const [GroupsData, setGroupsData] = useState([])
    const [TableColumnNames, setTableColumnNames] = useState([])
    const [designerKeyWord, setDesignerKeyWord] = useState("Groups")

    // <<<<API CALL
    useEffect(() => {
        fetchGroupsData()
    }, [])

    // API CALL >>>>>

    const fetchGroupsData = async () => {
        try {
            const data = await getTableData('Groups')
            const newColumnNames = await FetchTableColumns(designerKeyWord)
            console.log(newColumnNames, "column Names Hereee")
            console.log(data)
            if (data) {
                // setUsersData(ApprovalsDummyData)
                setGroupsData(data.Groups)
            }
            setTableColumnNames(newColumnNames)
        } catch (e) {
            console.log(e, "Error hereee")
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
                                    tableName={'Groups'}
                                    TableColumnNames={TableColumnNames}
                                    setTableColumnNames={setTableColumnNames}
                                    id={'id'}
                                    showConfigurefieldsBtn={true}
                                    title='Groups'
                                    fetchTableData={fetchGroupsData}
                                    rdtColValue={'id'}
                                    // redirectionPath={`/group/`}
                                    createNewPath={'group'}
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