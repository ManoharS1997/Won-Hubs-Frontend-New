import { useState, useEffect } from "react";

// COMPONENT IMPORTS
import WonContext from "../../../../../context/WonContext";
import TableComponent from "../../../../TableComponent/pages/TableComponent";
import { getTableColumnNames, getTableData } from "../../../../../utils/CheckAndExecuteFlows/CRUDoperations";

import {
  CustomContainer, CustomViewContainer, FormContent, SideNavNContentContainer,
} from '../components/StyledComponents'

const CMDBTable = () => {
  const [CMDBdata, setCMDBdata] = useState([])
  const [TableColumnNames, setTableColumnNames] = useState([])

  // <<<<API CALL
  useEffect(() => {
    fetchCMDBData()
  }, [])
  // API CALL >>>>>

  const fetchCMDBData = async () => {
    try {
      const data = await getTableData('cmdb')
      const newColumnNames = await getTableColumnNames('cmdb')
      if (data?.cmdb?.length === 0) {
        // setUsersData(ApprovalsDummyData)
      } else {
        setCMDBdata(data.cmdb)
      }
      setTableColumnNames(newColumnNames.columns)
    } catch {
      console.log('Error fetching CMDB Data')
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
                    tableData={CMDBdata}
                    recordsPerPage={recordsPerPage}
                    tableName={'cmdb'}
                    TableColumnNames={TableColumnNames}
                    setTableColumnNames={setTableColumnNames}
                    id={'id'}
                    showConfigurefieldsBtn={true}
                    title='CMDB'
                    fetchTableData={fetchCMDBData}
                    rdtColValue={'id'}
                    createNewPath={`choose/CIType`}
                    redirectionPath={'/relation-map/'}
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
export default CMDBTable  