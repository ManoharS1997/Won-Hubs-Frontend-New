import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

// ICON  IMPORTS

// COMPONENT IMPORTS
import WonContext from "../../../../context/WonContext";
import TableComponent from "../../../TableComponent/pages/TableComponent";
// import { CompaniesDummyData } from "../../../../DataFile/DefaultDataFile";
import { getTableColumnNames , getTableData} from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";

const hostedUrl = import.meta.env.VITE_HOSTED_API_URL

import {
    CustomContainer, CustomViewContainer, FormContent, SideNavNContentContainer
} from './StyledComponents'


const CompaniesTable = () => {
    const navigate = useNavigate();
    const [CompaniesData, setCompaniesData] = useState([]) //state for table data 
    const [TableColumnNames, setTableColumnNames] = useState([])

    // <<<<API CALL

    useEffect(() => {
        fetchCompaniesData()
    }, [])

    const fetchCompaniesData = async () => {
        try {
            const data = await getTableData('company')
            console.log(data,"data Hereeee")
            const newColumnNames = await getTableColumnNames('company')
            if (data?.company?.length === 0) {
                // setUsersData(ApprovalsDummyData)
            } else {
                setCompaniesData(data.company)
            }
            setTableColumnNames(newColumnNames.columns)
        } catch {
            console.log('Error fetching Companies Data')
        }
    }
    // API CALL >>>>>

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
                                        tableName={'company'}
                                        TableColumnNames={TableColumnNames}
                                        setTableColumnNames={setTableColumnNames}
                                        id={'id'}
                                        showConfigurefieldsBtn={true}
                                        title='Companies'
                                        fetchTableData={fetchCompaniesData}
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