import { useState, useEffect } from "react";

//Component imports
import WonContext from "../../../context/WonContext";
import TableComponent from "../../TableComponent/pages/TableComponent";
import { getTableColumnNames, getTableData, FetchTableColumns } from "../../../utils/CheckAndExecuteFlows/CRUDoperations";

import {
    CustomContainer, CustomViewContainer, FormContent, SideNavNContentContainer,
} from '../Alerts/pages/StyledComponents.jsx'
import { set } from "date-fns";

const TestingTableView = () => {
    const [AlertsData, setAlertsData] = useState([]) //state for table data  
    const [TableColumnNames, setTableColumnNames] = useState([])

    // <<<<API CALL
    useEffect(() => {
        fetchAllAlertsData()
    }, [])
    // API CALL >>>>>

    const fetchAllAlertsData = async () => {
        try {
            const columnNames = await FetchTableColumns('Dummy_Test')
            const TableData=await getTableData('Dummy_Test')
            // console.log(TableData,"TableData")
            setAlertsData(TableData.Dummy_Test)
          
            if (columnNames?.length > 0) {
                setTableColumnNames(columnNames)
            } else {
                // console.log(data.alerts, "Alerts Hereeee")
                // setAlertsData(data.alerts)
            }
            //   setTableColumnNames(newColumnNames.columns)
        } catch (e) {
            console.log(e, "Error Here")
            console.log('Error fetching Alerts Data')
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
                                        tableData={AlertsData}
                                        recordsPerPage={recordsPerPage}
                                        tableName={'formtest'}
                                        TableColumnNames={TableColumnNames}
                                        setTableColumnNames={setTableColumnNames}
                                        id={'id'}
                                        showConfigurefieldsBtn={true}
                                        title='Alerts'
                                        fetchTableData={fetchAllAlertsData}
                                        rdtColValue={'id'}
                                        createNewPath='alert'
                                        formData={AlertsData}
                                    // redirectionPath={`/alert/`}
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
export default TestingTableView 