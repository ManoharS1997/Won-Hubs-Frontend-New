import { useState, useEffect } from "react";

// COMPONENT IMPORTS
import WonContext from "../../../../context/WonContext";
import TableComponent from "../../../TableComponent/pages/TableComponent";
import { getTableColumnNames, getTableData } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";

import {
    CustomContainer, CustomViewContainer, FormContent, SideNavNContentContainer,
} from './StyledComponents'


const DepartmentsTableListView = () => {
    const [DepartmentsData, setDepartmentsData] = useState([])
    const [TableColumnNames, setTableColumnNames] = useState([])

    // <<<<API CALL
    useEffect(() => {
        fetchDepartmentData()
    }, [])
    // API CALL >>>>>

    const fetchDepartmentData = async () => {
        try {
            const data = await getTableData('department')
            const newColumnNames = await getTableColumnNames('department')
            if (data?.department?.length === 0) {
                // setUsersData(ApprovalsDummyData)
            } else {
                setDepartmentsData(data.department)
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
                                        tableData={DepartmentsData}
                                        recordsPerPage={recordsPerPage}
                                        tableName={'department'}
                                        TableColumnNames={TableColumnNames}
                                        setTableColumnNames={setTableColumnNames}
                                        id={'id'}
                                        showConfigurefieldsBtn={true}
                                        title='Department'
                                        fetchTableData={fetchDepartmentData}
                                        rdtColValue={'id'}
                                        // redirectionPath={`/department/`}
                                    />
                                </FormContent>
                            </CustomContainer>
                            {/* {openSettings ? <Settings /> : null} */}
                        </SideNavNContentContainer>
                    </CustomViewContainer>
                )
            }}
        </WonContext.Consumer>
    )
}
export default DepartmentsTableListView  