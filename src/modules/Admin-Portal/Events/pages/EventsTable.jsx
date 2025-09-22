
import { useState, useEffect } from "react";
import TableComponent from "../../../TableComponent/pages/TableComponent";
import { getTableColumnNames } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";
import { MainContainer, TableContainer } from './EventsStyledComponents'
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
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }

      const response = await fetch(url, options)
      const data = await response.json()
      const newColumnNames = await getTableColumnNames('event_logs')
      if (data?.event_logs?.length === 0) {
        // setUsersData(ApprovalsDummyData)
      } else {
        setEventsData(data.event_logs)
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
        // redirectionPath={`/event/`}
        />
      </TableContainer>
    </MainContainer>
  )
}