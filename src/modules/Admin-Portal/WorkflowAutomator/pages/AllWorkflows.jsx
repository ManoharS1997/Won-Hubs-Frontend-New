import { useState, useEffect } from "react";
import { getTableData, getTableColumnNames } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";

//Component imports
import WonContext from "../../../../context/WonContext";
import TableComponent from "../../../TableComponent/pages/TableComponent";
import WONLoader from "../../../../shared/components/loader";

import {
  CustomContainer, CustomViewContainer, FormContent, SideNavNContentContainer,
} from './StyledComponents'


const AllWorkflows = () => {
  const [WorkflowsData, setWorkflowsData] = useState([])
  const [isFetchingData, setIsFetchingData] = useState(false)

  const [TableColumnNames, setTableColumnNames] = useState([])

  // <<<<API CALL
  useEffect(() => {
    fetchAllFlowsData()
  }, [])
  // API CALL >>>>>

  const fetchAllFlowsData = async () => {
    try {
      const data = await getTableData('flows')
      const newColumnNames = await getTableColumnNames('flows')
      if (data?.flows?.length === 0) {
        // setUsersData(ApprovalsDummyData)
      } else {
        data?.flows && setWorkflowsData(data.flows)
      }
      setTableColumnNames(newColumnNames.columns)
    } catch {
      console.log('Error fetching Flows Data')
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
                  {isFetchingData ?
                    <WONLoader />
                    :
                    <TableComponent
                      tableData={WorkflowsData}
                      recordsPerPage={recordsPerPage}
                      tableName={'flows'}
                      TableColumnNames={TableColumnNames}
                      setTableColumnNames={setTableColumnNames}
                      id={'id'}
                      showConfigurefieldsBtn={true}
                      title='Flows'
                      fetchTableData={fetchAllFlowsData}
                      rdtColValue={'id'}
                      createNewPath={'workflows'}
                    // redirectionPath={`/flow/`}
                    />}
                </FormContent>
              </CustomContainer>
            </SideNavNContentContainer>
          </CustomViewContainer>
        )
      }}
    </WonContext.Consumer>
  )
}
export default AllWorkflows    