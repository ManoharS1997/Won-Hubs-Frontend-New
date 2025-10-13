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
      const url=`${import.meta.env.VITE_HOSTED_API_URL}/api/form-designer`
      const data=await fetch(url)
      // console.log(data,"It is response")
      const data2=await data.json()
      // console.log(data2,"Respon.json")
      const newColumnNames = await getTableColumnNames('designs')
      if (!(data2?.data.length>0)) {
        // setUsersData(ApprovalsDummyData)
      } else {
        const tableData=data2.data.map(Item=>{
          return {
            ...Item,
            ...Item.selectedDepartments,
            title:Item?.module,
            id:Item?._id
          }
        })
        console.log(tableData,"tableData")
        setDesignsData(tableData)
      }
      setTableColumnNames(newColumnNames.columns)
    } catch {
      console.log('Error fetching Design Data')
    }
  }
// console.log(TableColumnNames)
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