import { useState, useEffect } from "react";

// COMPONENT IMPORTS
import WonContext from "../../../../context/WonContext";
import TableComponent from "../../../TableComponent/pages/TableComponent";
import { getTableColumnNames, getTableData } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";

import {
  CustomContainer, CustomViewContainer, FormContent, SideNavNContentContainer,
} from './StyledComponents'

const AllDesigns = () => {
  const [designsData, setDesignsData] = useState([])
  const [TableColumnNames, setTableColumnNames] = useState([])

  // <<<<API CALL
  useEffect(() => {
    fetchConnectionsData()
  }, [])
  // API CALL >>>>>

  const fetchConnectionsData = async () => {
    try {
      const data = await getTableData('designs')
      const newColumnNames = await getTableColumnNames('designs')
      if (data?.designs?.length === 0) {
        // setUsersData(ApprovalsDummyData)
      } else {
        setDesignsData(data.designs)
      }
      setTableColumnNames(newColumnNames.columns)
    } catch {
      console.log('Error fetching Design Data')
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
                    tableData={designsData}
                    recordsPerPage={recordsPerPage}
                    tableName={'designs'}
                    TableColumnNames={TableColumnNames}
                    setTableColumnNames={setTableColumnNames}
                    id={'id'}
                    showConfigurefieldsBtn={true}
                    title='Designs'
                    fetchTableData={fetchConnectionsData}
                    rdtColValue={'id'}
                    createNewPath={'new/design'}
                  // redirectionPath={`/design/`}
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
export default AllDesigns    