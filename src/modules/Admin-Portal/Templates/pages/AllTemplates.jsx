import { useState, useEffect } from "react";
//Component imports
import WonContext from "../../../../context/WonContext";
import TableComponent from "../../../TableComponent/pages/TableComponent";
import { getTableColumnNames, getTableData } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";

import {
  CustomContainer, CustomViewContainer, FormContent, SideNavNContentContainer,
} from './StyledComponents'

const AllTemplates = () => {
  const [TemplatesData, setTemplatesData] = useState([])
  const [TableColumnNames, setTableColumnNames] = useState([])

  // <<<<API CALL
  useEffect(() => {
    fetchAllTemplatesData()
  }, [])
  // API CALL >>>>>

  const fetchAllTemplatesData = async () => {
    try {
      const data = await getTableData('templates')
      const newColumnNames = await getTableColumnNames('templates')
      if (data?.templates?.length === 0) {
        // setUsersData(ApprovalsDummyData)
      } else {
        setTemplatesData(data.templates)
      }
      setTableColumnNames(newColumnNames.columns)
    } catch {
      console.log('Error fetching Templates Data')
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
                    tableData={TemplatesData}
                    recordsPerPage={recordsPerPage}
                    tableName={'templates'}
                    TableColumnNames={TableColumnNames}
                    setTableColumnNames={setTableColumnNames}
                    id={'id'}
                    showConfigurefieldsBtn={true}
                    title='Templates'
                    fetchTableData={fetchAllTemplatesData}
                    rdtColValue={'id'}
                    createNewPath={'template'}
                  // redirectionPath={`/template/`}
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
export default AllTemplates        