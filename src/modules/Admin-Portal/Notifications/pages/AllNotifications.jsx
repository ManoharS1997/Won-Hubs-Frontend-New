import { useState, useEffect } from "react";

// COMPONENT IMPORTS
import WonContext from "../../../../context/WonContext";
import TableComponent from "../../../TableComponent/pages/TableComponent";
import { getTableData, getTableColumnNames } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";

import {
  CustomContainer, CustomViewContainer, FormContent, SideNavNContentContainer,
} from '../AllNotifications/StyledComponents';


const AllNotifications = () => {
  const [NotificationsData, setNotificationsData] = useState([])
  const [TableColumnNames, setTableColumnNames] = useState([])

  // <<<<API CALL
  useEffect(() => {
    fetchNotificationsData()
  }, [])
  // API CALL >>>>>

  const fetchNotificationsData = async () => {
    try {
      const data = await getTableData('notifications')
      const newColumnNames = await getTableColumnNames('notifications')
      if (data?.notifications?.length === 0) {
        // setUsersData(ApprovalsDummyData)
      } else {
        setNotificationsData(data.notifications)
      }
      setTableColumnNames(newColumnNames.columns)
    } catch {
      console.log('Error fetching Notifications Data')
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
                    tableData={NotificationsData}
                    recordsPerPage={recordsPerPage}
                    tableName={'notifications'}
                    TableColumnNames={TableColumnNames}
                    setTableColumnNames={setTableColumnNames}
                    id={'id'}
                    showConfigurefieldsBtn={true}
                    title='Notifications'
                    fetchTableData={fetchNotificationsData}
                    rdtColValue={'id'}
                    createNewPath='notification'
                  // redirectionPath={`/notification/`}
                  />
                </FormContent>
              </CustomContainer>
              {/* {openSettings ? <Settings /> : null} */}
            </SideNavNContentContainer>
          </CustomViewContainer>
        )
      }}
    </WonContext.Consumer>
  )
}
export default AllNotifications    