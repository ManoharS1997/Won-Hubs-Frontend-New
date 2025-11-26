import { useState, useEffect } from "react";

// COMPONENT IMPORTS
import WonContext from "../../../../context/WonContext";
import TableComponent from "../../../TableComponent/pages/TableComponent";
// import { UsersDummyData as Data } from "../../../../DataFile/DefaultDataFile";
import { getTableColumnNames, getTableData } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";
import { getFormDetails } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";

import {
  CustomViewContainer, FormContent,
  SideNavNContentContainer
} from './StyledComponents'

const defaultColumnsInTable = ['first_name', 'last_name', 'user_id', 'title', 'department', 'active', 'email', 'phone_no',];



const UsersTable = () => {
  const [usersData, setUsersData] = useState([]) //state for table data 
  const [TableColumnNames, setTableColumnNames] = useState([])
  const [selectedColumns, setSelectedColumns] = useState(defaultColumnsInTable)
  const [formData, setFormData] = useState(null);
  const userData = localStorage.getItem("userObj") || null;

  // <<<<API CALL
  useEffect(() => {
    fetchUsersData();
    fetchFormData(JSON.parse(userData));
  }, []);

  const fetchUsersData = async () => {
    try {
      const data = await getTableData('users')
      const newColumnNames = await getTableColumnNames('users')
      if (data?.users?.length === 0) {
        // setUsersData(ApprovalsDummyData)
      } else {
        setUsersData(data.users)
      }
      setSelectedColumns(newColumnNames.columns)
      setTableColumnNames(newColumnNames.columns)
    } catch {
      console.log('Error fetching Users Data')
    }
  }

  const fetchFormData = async (data) => {
    // console.log(data, "data Here");
    try {
      const result = await getFormDetails({
        module: "Users",
        category: data.category,
        subcategory: data.subcategory,
        view: data.view,
        department: data.department,
      });
      if (result) {
        setFormData(result.data);
      }
    } catch {
      console.log("Error fetching Tickets Data");
    }
  };

  return (
    <WonContext.Consumer>
      {value => {
        const { recordsPerPage } = value

        return (
          <CustomViewContainer>
            <SideNavNContentContainer>
              <FormContent>
                <TableComponent
                  tableData={usersData}
                  recordsPerPage={recordsPerPage}
                  tableName={'users'}
                  TableColumnNames={TableColumnNames}
                  setTableColumnNames={setTableColumnNames}
                  id={'id'}
                  showConfigurefieldsBtn={true}
                  title='Users'
                  fetchTableData={fetchUsersData}
                  rdtColValue={'id'}
                  redirectionPath={`/user/`}
                  createNewPath={`new-user`}
                  formData={formData}
                />
              </FormContent>
            </SideNavNContentContainer>
          </CustomViewContainer>
        )
      }}
    </WonContext.Consumer>
  )
}
export default UsersTable