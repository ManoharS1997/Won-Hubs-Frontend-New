import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import WonContext from "../../../../context/WonContext";
import TableComponent from "../../../TableComponent/pages/TableComponent";
// import { CompaniesDummyData } from "../../../../DataFile/DefaultDataFile";
import { FetchTableColumns , getTableData} from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";
import {
    CustomContainer, CustomViewContainer, FormContent, SideNavNContentContainer
} from './StyledComponents'


const CompaniesTable = () => {
    const navigate = useNavigate();
    const [CompaniesData, setCompaniesData] = useState([]) //state for table data 
    const [TableColumnNames, setTableColumnNames] = useState([])
    const [designerKeyWord, setDesignerKeyWord] = useState("Companies")
    useEffect(() => {
        fetchGroupsData()      
    }, [])
      const fetchGroupsData = async () => {
            try {
                const data = await getTableData(designerKeyWord)
                const newColumnNames = await FetchTableColumns(designerKeyWord)
                // console.log(newColumnNames, "column Names Hereee")
                // console.log(data,"data Hereeee")
                if (data) {
                    // setUsersData(ApprovalsDummyData)
                    setCompaniesData(data.Companies)
                }
                setTableColumnNames(newColumnNames)
            } catch (e) {
                console.log(e, "Error hereee")
                console.log('Error fetching Groups Data')
            }
        }
    return (
        <WonContext.Consumer>
            {value => {
                const { openSettings, recordsPerPage } = value
                return (
                    <CustomViewContainer>
                        <SideNavNContentContainer>
                            <CustomContainer>
                                <FormContent>
                                    <TableComponent
                                        tableData={CompaniesData}
                                        recordsPerPage={recordsPerPage}
                                        tableName={'Companies'}
                                        TableColumnNames={TableColumnNames}
                                        setTableColumnNames={setTableColumnNames}
                                        id={'id'}
                                        showConfigurefieldsBtn={true}
                                        title='Companies'
                                        fetchTableData={fetchGroupsData}
                                        rdtColValue={'id'}
                                        createNewPath={'company'}
                                        // redirectionPath={`/company/`}
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
export default CompaniesTable  