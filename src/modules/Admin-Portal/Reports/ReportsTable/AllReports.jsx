import { useState, useEffect } from "react";

// COMPONENT IMPORTS
import WonContext from "../../../../context/WonContext";
import TableComponent from "../../../TableComponent/pages/TableComponent";
import { getTableData, getTableColumnNames } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";

import {
  CustomContainer, CustomViewContainer, FormContent, SideNavNContentContainer,
} from '../ReportsStyledComponents';

export default function AllReports() {
  const [reportsData, setReportsData] = useState([]) //state for table data 
  const [TableColumnNames, setTableColumnNames] = useState([])

  // <<<<API CALL
  useEffect(() => {
    fetchAllReportsData()
  }, [])
  // API CALL >>>>>

  const fetchAllReportsData = async () => {
    try {
      const data = await getTableData('reports')
      const newColumnNames = await getTableColumnNames('reports')
      if (data?.reports?.length === 0) {
        // setUsersData(ApprovalsDummyData)
      } else {
        setReportsData(data.reports)
      }
      setTableColumnNames(newColumnNames.columns)
    } catch {
      console.log('Error fetching Reports Data')
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
                    tableData={reportsData}
                    recordsPerPage={recordsPerPage}
                    tableName={'reports'}
                    TableColumnNames={TableColumnNames}
                    setTableColumnNames={setTableColumnNames}
                    id={'id'}
                    showConfigurefieldsBtn={true}
                    title='Reports'
                    fetchTableData={fetchAllReportsData}
                    rdtColValue={'id'}
                    createNewPath={'report'}
                  // redirectionPath={`/report/`}
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