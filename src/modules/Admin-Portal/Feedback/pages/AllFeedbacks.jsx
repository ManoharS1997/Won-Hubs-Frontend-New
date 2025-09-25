import { useState, useEffect } from "react";

//Component imports
import WonContext from "../../../../context/WonContext";
import TableComponent from "../../../TableComponent/pages/TableComponent";
import { getTableData, getTableColumnNames } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";
import {
  CustomContainer, CustomViewContainer, FormContent, SideNavNContentContainer, TableContainer,
} from './StyledComponents';
import { Feed } from "semantic-ui-react";

const AllFeedbacks = () => {
  const [FeedbacksData, setFeedbacksData] = useState([]) //state for table data 
  const [isLoading, setIsLoading] = useState(false);
  const [TableColumnNames, setTableColumnNames] = useState([])

  // <<<<API CALL
  useEffect(() => {
    fetchFeedBacksData()
  }, [])
  // API CALL >>>>>

  const fetchFeedBacksData = async () => {
    try {
      const data = await getTableData('feedback')
      console.log(data, "Data Here..,")
      const newColumnNames = await getTableColumnNames('feedback')
      // console.log(newColumnNames, "Here column names")

      setTableColumnNames(newColumnNames?.columns)
      setFeedbacksData(data?.feedback)

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
                  {isLoading ? <TableContainer >
                    <div className="newtons-cradle">
                      <div className="newtons-cradle__dot"></div>
                      <div className="newtons-cradle__dot"></div>
                      <div className="newtons-cradle__dot"></div>
                      <div className="newtons-cradle__dot"></div>
                    </div>
                  </TableContainer> : (<>
                    <TableComponent
                      tableData={FeedbacksData}
                      recordsPerPage={recordsPerPage}
                      tableName={'feedBack'}
                      TableColumnNames={TableColumnNames}
                      setTableColumnNames={setTableColumnNames}
                      id={'id'}
                      showConfigurefieldsBtn={true}
                      title='Feedback'
                      fetchTableData={fetchFeedBacksData}
                      rdtColValue={'id'}
                      createNewPath='feedback'
                    // redirectionPath={`/feedback/`}
                    />
                  </>)}
                </FormContent>
              </CustomContainer>
            </SideNavNContentContainer>
          </CustomViewContainer>
        )
      }}
    </WonContext.Consumer>
  )
}
export default AllFeedbacks      