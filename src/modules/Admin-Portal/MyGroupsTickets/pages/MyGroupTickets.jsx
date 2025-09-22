import { useState, useEffect } from "react";

// ICON IMPORTS

//COMPONENT IMPORTS
import WonContext from "../../../../context/WonContext.jsx";
import TableComponent from "../../../TableComponent/pages/TableComponent.jsx";
import { getTableData, getTableColumnNames } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations.jsx";

import {
    ActionsContainer,
    AllText,
    AndBtn,
    AndOrBtnClose,
    BackBtn,
    ConfigureButton,
    CustomContainer,
    CustomViewContainer,
    DropdownMenu,
    DropdownToggle,
    FilterBtn,
    FilterContainer,
    FormContent,
    HeaderContainer,
    MenuItem,
    MultiLevelDropdownContainer,
    OrBtn,
    SearchInput,
    SideNavNContentContainer,
    StyledDropDown,
    StyledItem,
    StyledMenu,
    StyledToggle,
    SubMenu,
    SubMenuItem,
    TitleContainer
} from './StyledComponents.jsx'

const MyGroupTickets = () => {
    const [MyGroupTicketsData, setMyGroupTicketsData] = useState([])
    const [TableColumnNames, setTableColumnNames] = useState([])

    // <<<<API CALL

    useEffect(() => {
        fetchTicketsData()
    }, [])

    const fetchTicketsData = async () => {
        try {
            const data = await getTableData('group_names')
            const newColumnNames = await getTableColumnNames('group_names')
            if (data?.connections?.length === 0) {
                // setUsersData(ApprovalsDummyData)
            } else {
                setMyGroupTicketsData(data.connections)
            }
            setTableColumnNames(newColumnNames.columns)
        } catch {
            console.log('Error fetching CMDB Data')
        }
    }

    // API CALL >>>>>


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
                                        tableData={MyGroupTicketsData}
                                        recordsPerPage={recordsPerPage}
                                        tableName={'group_names'}
                                        TableColumnNames={TableColumnNames}
                                        setTableColumnNames={setTableColumnNames}
                                        id={'id'}
                                        showConfigurefieldsBtn={true}
                                        title='Group Names'
                                        fetchTableData={fetchTicketsData}
                                        rdtColValue={'id'}
                                        redirectionPath={`/group/`}
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
export default MyGroupTickets  