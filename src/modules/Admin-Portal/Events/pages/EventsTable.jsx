
import { useState, useEffect } from "react";
import TableComponent from "../../../TableComponent/pages/TableComponent";
import { getTableColumnNames } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";
import { MainContainer, TableContainer } from './EventsStyledComponents'
import Cookies from 'js-cookie'
import { getTableData } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";
const hostedUrl = import.meta.env.VITE_HOSTED_API_URL

export default function EventsTable() {
  const [eventsData, setEventsData] = useState([])
  const [TableColumnNames, setTableColumnNames] = useState([])

  // <<<<API CALL
  useEffect(() => {
    fetchEventsData()
  }, [])

  const fetchEventsData = async () => {
    try {
      const url = `${hostedUrl}/table/event_logs`
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      }

      const response = await getTableData('event_logs')
      // console.log(response,"response Heree")
      // const data = await response.json()
      const newColumnNames = await getTableColumnNames('event_logs')
      // console.log(newColumnNames,"NewColumn names Heree")
      if (response?.event_logs?.length === 0) {
        // setUsersData(ApprovalsDummyData)
      } else {
        setEventsData(response?.event_logs)
      }
      setTableColumnNames(newColumnNames.columns)
    } catch {
      console.log('Error fetching Event Logs Data')
    }
  }
  // API CALL >>>>>

  return (
    <MainContainer>
      <TableContainer>
        <TableComponent
          tableData={eventsData}
          recordsPerPage={50}
          tableName={'event_logs'}
          TableColumnNames={TableColumnNames}
          setTableColumnNames={setTableColumnNames}
          id={'id'}
          showConfigurefieldsBtn={true}
          title='Events'
          fetchTableData={fetchEventsData}
          allowDeleting={true}
          rdtColValue={'id'}
          createNewPath={'event/'}
        // redirectionPath={`/event/`}
        />
      </TableContainer>
    </MainContainer>
  )
}