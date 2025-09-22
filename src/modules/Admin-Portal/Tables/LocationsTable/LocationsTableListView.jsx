import { useState, useEffect } from "react";

// COMPONENT IMPORTS
import WonContext from "../../../../context/WonContext";
import TableComponent from "../../../TableComponent/pages/TableComponent";
// import { DummyLocationsData as Data } from "../../../../DataFile/DefaultDataFile";
import { getTableColumnNames, getTableData } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";

import {
    CustomContainer, CustomViewContainer, FormContent, SideNavNContentContainer,
} from './StyledComponents';

const hostedUrl = import.meta.env.VITE_HOSTED_API_URL

const LocationsTableListView = () => {
    const [LocationsData, setLocationsData] = useState([])
    const [TableColumnNames, setTableColumnNames] = useState([])

    // <<<<API CALL
    useEffect(() => {
        fetchLocationsData()
    }, [])

    // API CALL >>>>>

    const fetchLocationsData = async () => {
        try {
            const data = await getTableData('location')
            const newColumnNames = await getTableColumnNames('location')
            if (data?.location?.length === 0) {
                // setUsersData(ApprovalsDummyData)
            } else {
                setLocationsData(data.location)
            }
            setTableColumnNames(newColumnNames.columns)
        } catch {
            console.log('Error fetching Locations Data')
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
                                        tableData={LocationsData}
                                        recordsPerPage={recordsPerPage}
                                        tableName={'location'}
                                        TableColumnNames={TableColumnNames}
                                        setTableColumnNames={setTableColumnNames}
                                        id={'id'}
                                        showConfigurefieldsBtn={true}
                                        title='Locations'
                                        fetchTableData={fetchLocationsData}
                                        rdtColValue={'id'}
                                        // redirectionPath={`/location/`}
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
export default LocationsTableListView   