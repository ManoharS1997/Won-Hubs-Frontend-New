import { useState, useEffect } from "react";

//Component imports
import WonContext from "../../../../context/WonContext"
import TableComponent from "../../../TableComponent/pages/TableComponent";
import { getTableColumnNames, getTableData } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";

import {
  CustomContainer, CustomViewContainer, FormContent, SideNavNContentContainer,
} from './StyledComponents'


const Alerts = () => {
  const [AlertsData, setAlertsData] = useState([]) //state for table data  
  const [TableColumnNames, setTableColumnNames] = useState([])

  // <<<<API CALL
  useEffect(() => {
    fetchAllAlertsData()
  }, [])
  // API CALL >>>>>

  const fetchAllAlertsData = async () => {
    try {
      const data = await getTableData('alerts')
      const newColumnNames = await getTableColumnNames('alerts')
      if (data?.alerts?.length === 0) {
        // setUsersData(ApprovalsDummyData)
      } else {
        setAlertsData(data.alerts)
      }
      setTableColumnNames(newColumnNames.columns)
    } catch {
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
                    tableName={'alerts'}
                    TableColumnNames={TableColumnNames}
                    setTableColumnNames={setTableColumnNames}
                    id={'id'}
                    showConfigurefieldsBtn={true}
                    title='Alerts'
                    fetchTableData={fetchAllAlertsData}
                    rdtColValue={'id'}
                    createNewPath='alert'
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
export default Alerts 