import { useState, useEffect } from "react";

// COMPONENT IMPORTS
import WonContext from "../../../../../context/WonContext";
import TableComponent from "../../../../TableComponent/pages/TableComponent";
import { getTableColumnNames, getTableData } from "../../../../../utils/CheckAndExecuteFlows/CRUDoperations";

const CMDBRelTable = () => {
  const [CMDBdata, setCMDBdata] = useState([])
  const [TableColumnNames, setTableColumnNames] = useState([])

  // <<<<API CALL
  useEffect(() => {
    fetchCMDBData()
  }, [])
  // API CALL >>>>>

  const fetchCMDBData = async () => {
    try {
      const data = await getTableData('cmdb_rel')
      const newColumnNames = await getTableColumnNames('cmdb_rel')
      if (data?.cmdb?.length === 0) {
        // setUsersData(ApprovalsDummyData)
      } else {
        setCMDBdata(data.cmdb_rel)
      }
      setTableColumnNames(newColumnNames.columns)
    } catch {
      console.log('Error fetching CMDB_REL Data')
    }
  }

  return (
    <WonContext.Consumer>
      {value => {
        const { recordsPerPage } = value

        return (
          <div className="w-full h-full overflow-auto px-2 py-2">
            <TableComponent
              tableData={CMDBdata}
              recordsPerPage={recordsPerPage}
              tableName={"cmdb_rel"}
              TableColumnNames={TableColumnNames}
              setTableColumnNames={setTableColumnNames}
              id={"id"}
              showConfigurefieldsBtn={true}
              title="Relations"
              fetchTableData={fetchCMDBData}
              rdtColValue={"id"}
              createNewPath={`new-relation`}
            />
          </div>
        );
      }}
    </WonContext.Consumer>
  )
}
export default CMDBRelTable  